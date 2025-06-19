import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Spaces from './Spaces';

// Mock the Section component
jest.mock('../helpers/Section', () => {
  return function MockSection({ id, children }: { id?: string; children?: React.ReactNode }) {
    return (
      <div data-testid="mock-section" id={id}>
        {children}
      </div>
    );
  };
});

// Mock the useTokenNameStore hook
jest.mock('../../store/useTokenNameStore', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation((selector: any) => {
    const state = {
      spaceTreatment: 'dash',
      setSpaceTreatment: jest.fn()
    };
    return selector(state);
  })
}));

describe('Spaces Component', () => {
  let mockSetSpaceTreatment: jest.Mock;
  
  beforeEach(() => {
    // Reset the mock function before each test
    mockSetSpaceTreatment = jest.fn();
    require('../../store/useTokenNameStore').default.mockImplementation((selector: any) => {
      const state = {
        spaceTreatment: 'dash',
        setSpaceTreatment: mockSetSpaceTreatment
      };
      return selector(state);
    });
  });
  
  test('renders with the correct radio options', () => {
    render(<Spaces />);
    
    // Check that all radio options are rendered
    expect(screen.getByLabelText('Keep')).toBeInTheDocument();
    expect(screen.getByLabelText('Dash')).toBeInTheDocument();
    expect(screen.getByLabelText('Underscore')).toBeInTheDocument();
    expect(screen.getByLabelText('Remove')).toBeInTheDocument();
    
    // Check that the 'dash' option is selected by default
    expect(screen.getByLabelText('Dash')).toBeChecked();
  });
  
  test('calls setSpaceTreatment when a radio option is selected', () => {
    render(<Spaces />);
    
    // Click on the 'underscore' option
    fireEvent.click(screen.getByLabelText('Underscore'));
    
    // Check that setSpaceTreatment was called with 'underscore'
    expect(mockSetSpaceTreatment).toHaveBeenCalledWith('underscore');
  });
});
