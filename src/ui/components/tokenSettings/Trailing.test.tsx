import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Trailing from './Trailing';

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

// Mock the NumberToggle component
jest.mock('../helpers/NumberToggle', () => {
  return function MockNumberToggle({ 
    decreaseFunction, 
    increaseFunction, 
    value 
  }: { 
    decreaseFunction: () => void; 
    increaseFunction: () => void; 
    value: number;
    minValue?: number;
  }) {
    return (
      <div data-testid="mock-number-toggle">
        <button data-testid="decrease-button" onClick={decreaseFunction}>-</button>
        <span data-testid="value">{value}</span>
        <button data-testid="increase-button" onClick={increaseFunction}>+</button>
      </div>
    );
  };
});

// Mock the useTokenNameStore hook
jest.mock('../../store/useTokenNameStore', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation((selector: any) => {
    const state = {
      trailingCharsCount: 0,
      trailingCharType: 'dash',
      incrementTrailingChars: jest.fn(),
      decrementTrailingChars: jest.fn(),
      setTrailingCharType: jest.fn()
    };
    return selector(state);
  })
}));

describe('Trailing Component', () => {
  let mockIncrementTrailingChars: jest.Mock;
  let mockDecrementTrailingChars: jest.Mock;
  let mockSetTrailingCharType: jest.Mock;
  
  beforeEach(() => {
    // Reset the mock functions before each test
    mockIncrementTrailingChars = jest.fn();
    mockDecrementTrailingChars = jest.fn();
    mockSetTrailingCharType = jest.fn();
    
    require('../../store/useTokenNameStore').default.mockImplementation((selector: any) => {
      const state = {
        trailingCharsCount: 0,
        trailingCharType: 'dash',
        incrementTrailingChars: mockIncrementTrailingChars,
        decrementTrailingChars: mockDecrementTrailingChars,
        setTrailingCharType: mockSetTrailingCharType
      };
      return selector(state);
    });
  });
  
  test('renders with the correct components', () => {
    render(<Trailing />);
    
    // Check that the NumberToggle component is rendered
    expect(screen.getByTestId('mock-number-toggle')).toBeInTheDocument();
    
    // Check that the radio buttons are rendered
    expect(screen.getByLabelText('Dash (-)')).toBeInTheDocument();
    expect(screen.getByLabelText('Underscore (_)')).toBeInTheDocument();
    
    // Check that the label is rendered
    expect(screen.getByText('Trailing Character:')).toBeInTheDocument();
  });
  
  test('calls incrementTrailingChars when increase button is clicked', () => {
    render(<Trailing />);
    
    // Click the increase button
    fireEvent.click(screen.getByTestId('increase-button'));
    
    // Check that incrementTrailingChars was called
    expect(mockIncrementTrailingChars).toHaveBeenCalled();
  });
  
  test('calls decrementTrailingChars when decrease button is clicked', () => {
    render(<Trailing />);
    
    // Click the decrease button
    fireEvent.click(screen.getByTestId('decrease-button'));
    
    // Check that decrementTrailingChars was called
    expect(mockDecrementTrailingChars).toHaveBeenCalled();
  });
  
  test('calls setTrailingCharType when a radio option is selected', () => {
    render(<Trailing />);
    
    // Click on the 'underscore' option
    fireEvent.click(screen.getByLabelText('Underscore (_)'));
    
    // Check that setTrailingCharType was called with 'underscore'
    expect(mockSetTrailingCharType).toHaveBeenCalledWith('underscore');
  });
});
