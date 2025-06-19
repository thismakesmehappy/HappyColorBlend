import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Leading from './Leading';

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
      leadingCharsCount: 0,
      leadingCharType: 'dash',
      incrementLeadingChars: jest.fn(),
      decrementLeadingChars: jest.fn(),
      setLeadingCharType: jest.fn()
    };
    return selector(state);
  })
}));

describe('Leading Component', () => {
  let mockIncrementLeadingChars: jest.Mock;
  let mockDecrementLeadingChars: jest.Mock;
  let mockSetLeadingCharType: jest.Mock;
  
  beforeEach(() => {
    // Reset the mock functions before each test
    mockIncrementLeadingChars = jest.fn();
    mockDecrementLeadingChars = jest.fn();
    mockSetLeadingCharType = jest.fn();
    
    require('../../store/useTokenNameStore').default.mockImplementation((selector: any) => {
      const state = {
        leadingCharsCount: 0,
        leadingCharType: 'dash',
        incrementLeadingChars: mockIncrementLeadingChars,
        decrementLeadingChars: mockDecrementLeadingChars,
        setLeadingCharType: mockSetLeadingCharType
      };
      return selector(state);
    });
  });
  
  test('renders with the correct components', () => {
    render(<Leading />);
    
    // Check that the NumberToggle component is rendered
    expect(screen.getByTestId('mock-number-toggle')).toBeInTheDocument();
    
    // Check that the radio buttons are rendered
    expect(screen.getByLabelText('Dash (-)')).toBeInTheDocument();
    expect(screen.getByLabelText('Underscore (_)')).toBeInTheDocument();
    
    // Check that the label is rendered
    expect(screen.getByText('Leading Character:')).toBeInTheDocument();
  });
  
  test('calls incrementLeadingChars when increase button is clicked', () => {
    render(<Leading />);
    
    // Click the increase button
    fireEvent.click(screen.getByTestId('increase-button'));
    
    // Check that incrementLeadingChars was called
    expect(mockIncrementLeadingChars).toHaveBeenCalled();
  });
  
  test('calls decrementLeadingChars when decrease button is clicked', () => {
    render(<Leading />);
    
    // Click the decrease button
    fireEvent.click(screen.getByTestId('decrease-button'));
    
    // Check that decrementLeadingChars was called
    expect(mockDecrementLeadingChars).toHaveBeenCalled();
  });
  
  test('calls setLeadingCharType when a radio option is selected', () => {
    render(<Leading />);
    
    // Click on the 'underscore' option
    fireEvent.click(screen.getByLabelText('Underscore (_)'));
    
    // Check that setLeadingCharType was called with 'underscore'
    expect(mockSetLeadingCharType).toHaveBeenCalledWith('underscore');
  });
});
