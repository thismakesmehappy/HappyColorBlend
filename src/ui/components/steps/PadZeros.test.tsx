import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PadZeros } from './PadZeros';

// Mock the useSwatchStore hook
const mockFlipShouldPadZeros = jest.fn();
const mockBuildSwatches = jest.fn();

jest.mock('../../store/useSwatchStore', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation((selector) => {
    // Mock the store state and functions
    const state = {
      shouldPadZeros: true,
      flipShouldPadZeros: mockFlipShouldPadZeros,
      buildSwatches: mockBuildSwatches
    };
    return selector(state);
  })
}));

// Mock the Toggle component
jest.mock('../helpers/Toggle', () => {
  return function MockToggle({ value, onChange }: { value: boolean, onChange: () => void }) {
    return (
      <button 
        data-testid="toggle-button" 
        data-value={value.toString()} 
        onClick={onChange}
      >
        Toggle
      </button>
    );
  };
});

describe('PadZeros Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders with the correct label', () => {
    render(<PadZeros />);
    
    // Check that the component renders
    const padZeros = screen.getByTestId('pad-zeros');
    expect(padZeros).toBeInTheDocument();
    
    // Check that the label is displayed
    const label = screen.getByTestId('pad-zeros-label');
    expect(label).toHaveTextContent('Pad step numbers with 0');
  });

  test('renders Toggle with correct value from store', () => {
    render(<PadZeros />);
    
    // Check that the toggle is rendered with the correct value
    const toggle = screen.getByTestId('toggle-button');
    expect(toggle).toHaveAttribute('data-value', 'true');
  });

  test('calls flipShouldPadZeros and buildSwatches when toggle is clicked', () => {
    render(<PadZeros />);
    
    // Find and click the toggle
    const toggle = screen.getByTestId('toggle-button');
    fireEvent.click(toggle);
    
    // Check that the functions were called
    expect(mockFlipShouldPadZeros).toHaveBeenCalledTimes(1);
    expect(mockBuildSwatches).toHaveBeenCalledTimes(1);
  });
});
