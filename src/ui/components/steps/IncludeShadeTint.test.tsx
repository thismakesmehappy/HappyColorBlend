import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IncludeShadeTint } from './IncludeShadeTint';

// Mock the useSwatchStore hook
const mockFlipIncludeShadeTint = jest.fn();
const mockBuildSwatches = jest.fn();

jest.mock('../../store/useSwatchStore', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation((selector) => {
    // Mock the store state and functions
    const state = {
      includeShadeTint: true,
      flipIncludeShadeTint: mockFlipIncludeShadeTint,
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

describe('IncludeShadeTint Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders with the correct label', () => {
    render(<IncludeShadeTint />);
    
    // Check that the component renders
    const includeShadeTint = screen.getByTestId('include-shade-tint');
    expect(includeShadeTint).toBeInTheDocument();
    
    // Check that the label is displayed
    const label = screen.getByTestId('include-shade-tint-label');
    expect(label).toHaveTextContent('Include tint and shade');
  });

  test('renders Toggle with correct value from store', () => {
    render(<IncludeShadeTint />);
    
    // Check that the toggle is rendered with the correct value
    const toggle = screen.getByTestId('toggle-button');
    expect(toggle).toHaveAttribute('data-value', 'true');
  });

  test('calls flipIncludeShadeTint and buildSwatches when toggle is clicked', () => {
    render(<IncludeShadeTint />);
    
    // Find and click the toggle
    const toggle = screen.getByTestId('toggle-button');
    fireEvent.click(toggle);
    
    // Check that the functions were called
    expect(mockFlipIncludeShadeTint).toHaveBeenCalledTimes(1);
    expect(mockBuildSwatches).toHaveBeenCalledTimes(1);
  });
});
