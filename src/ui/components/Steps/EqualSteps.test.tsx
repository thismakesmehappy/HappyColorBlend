import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import EqualSteps from './EqualSteps';

// Mock the useSwatchStore hook
const mockDecreaseSteps = jest.fn();
const mockIncreaseSteps = jest.fn();
const mockBuildSwatches = jest.fn();

jest.mock('../../store/useSwatchStore', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation((selector) => {
    // Mock the store state and functions
    const state = {
      numberOfSteps: 5,
      decreaseSteps: mockDecreaseSteps,
      increaseSteps: mockIncreaseSteps,
      buildSwatches: mockBuildSwatches,
      buildColorScale: jest.fn()
    };
    return selector(state);
  })
}));

// Mock the FontAwesomeIcon component
jest.mock('../helpers/FontAwesomeIcon', () => {
  return function MockFontAwesomeIcon({ icon }: { icon: string }) {
    return <span data-testid={`icon-${icon}`}></span>;
  };
});

describe('EqualSteps Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders with the correct number of steps', () => {
    render(<EqualSteps />);
    
    // Check that the component renders
    const equalSteps = screen.getByTestId('equal-steps');
    expect(equalSteps).toBeInTheDocument();
    
    // Check that the steps count is displayed
    const stepsCount = screen.getByTestId('steps-count');
    expect(stepsCount).toHaveTextContent('5');
  });

  test('calls decreaseSteps and buildSwatches when decrease button is clicked', () => {
    render(<EqualSteps />);
    
    // Find and click the decrease button
    const decreaseButton = screen.getByTestId('decrease-steps-button');
    fireEvent.click(decreaseButton);
    
    // Check that the functions were called
    expect(mockDecreaseSteps).toHaveBeenCalledTimes(1);
    expect(mockBuildSwatches).toHaveBeenCalledTimes(1);
  });

  test('calls increaseSteps and buildSwatches when increase button is clicked', () => {
    render(<EqualSteps />);
    
    // Find and click the increase button
    const increaseButton = screen.getByTestId('increase-steps-button');
    fireEvent.click(increaseButton);
    
    // Check that the functions were called
    expect(mockIncreaseSteps).toHaveBeenCalledTimes(1);
    expect(mockBuildSwatches).toHaveBeenCalledTimes(1);
  });
});
