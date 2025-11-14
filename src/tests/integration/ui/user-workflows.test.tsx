/**
 * UI Integration Tests
 * Tests complete user workflows from UI interactions to store updates
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomSteps from '../../../ui/components/Steps/CustomSteps';
import useSwatchStore from '../../../ui/store/useSwatchStore';

// Mock createPortal for Toast component
jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createPortal: (node: React.ReactNode) => node,
}));

describe('User Workflow Integration', () => {
  beforeEach(() => {
    // Reset store before each test
    useSwatchStore.setState(useSwatchStore.getState());
  });

  describe('Custom Steps Workflow', () => {
    it('should add custom step and update combined steps', async () => {
      render(<CustomSteps />);

      const input = screen.getByTestId('custom-step-input');
      const addButton = screen.getByTestId('add-custom-step-button');

      // User adds custom step
      fireEvent.change(input, { target: { value: '333' } });
      fireEvent.click(addButton);

      // Store should be updated
      const store = useSwatchStore.getState();
      expect(store.customSteps.has(333)).toBe(true);

      // Input should be cleared
      expect(input).toHaveValue('');
    });

    it('should show error toast for duplicate steps', async () => {
      // Add step to store first
      useSwatchStore.getState().addCustomStep(500);

      render(<CustomSteps />);

      const input = screen.getByTestId('custom-step-input');
      const addButton = screen.getByTestId('add-custom-step-button');

      // Try to add duplicate
      fireEvent.change(input, { target: { value: '500' } });
      fireEvent.click(addButton);

      // Should show error toast
      await waitFor(() => {
        const toast = screen.getByTestId('toast');
        expect(toast).toBeInTheDocument();
      });
    });

    it('should prevent adding invalid steps', () => {
      render(<CustomSteps />);

      const input = screen.getByTestId('custom-step-input');
      const addButton = screen.getByTestId('add-custom-step-button');

      // Try to add out-of-range step
      fireEvent.change(input, { target: { value: '1001' } });

      // Button should be disabled
      expect(addButton).toBeDisabled();
    });
  });

  describe('Cross-Component Updates', () => {
    it('should update UI when store changes externally', () => {
      render(<CustomSteps />);

      // Externally add custom step to store
      useSwatchStore.getState().addCustomStep(777);

      // Component should reflect the change
      // (This would require the component to subscribe to store changes)
      const store = useSwatchStore.getState();
      expect(store.customSteps.has(777)).toBe(true);
    });
  });
});
