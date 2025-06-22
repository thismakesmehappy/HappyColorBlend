import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NumberToggle from './NumberToggle';

// Mock the FontAwesomeIcon component
jest.mock('./FontAwesomeIcon', () => {
  return function MockFontAwesomeIcon({ icon, className }: { icon: string, className: string }) {
    return <span data-testid={`icon-${icon}`} className={className}>{icon}</span>;
  };
});

describe('NumberToggle Component', () => {
  // Test props
  const defaultProps = {
    decreaseFunction: jest.fn(),
    increaseFunction: jest.fn(),
    value: 5
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders with default props', () => {
    render(<NumberToggle {...defaultProps} />);

    // Check if all elements are rendered
    expect(screen.getByTestId('decrease-steps-button')).toBeInTheDocument();
    expect(screen.getByTestId('steps-count')).toBeInTheDocument();
    expect(screen.getByTestId('increase-steps-button')).toBeInTheDocument();
    
    // Check if the value is displayed correctly
    expect(screen.getByTestId('steps-count')).toHaveTextContent('5');
    
    // Check if icons are rendered with correct classes
    expect(screen.getByTestId('icon-circle-minus')).toHaveClass('figma-text-primary');
    expect(screen.getByTestId('icon-circle-plus')).toHaveClass('figma-text-primary');
  });

  test('calls increaseFunction when increase button is clicked', () => {
    render(<NumberToggle {...defaultProps} />);
    
    fireEvent.click(screen.getByTestId('increase-steps-button'));
    
    expect(defaultProps.increaseFunction).toHaveBeenCalledTimes(1);
    expect(defaultProps.decreaseFunction).not.toHaveBeenCalled();
  });

  test('calls decreaseFunction when decrease button is clicked', () => {
    render(<NumberToggle {...defaultProps} />);
    
    fireEvent.click(screen.getByTestId('decrease-steps-button'));
    
    expect(defaultProps.decreaseFunction).toHaveBeenCalledTimes(1);
    expect(defaultProps.increaseFunction).not.toHaveBeenCalled();
  });

  test('disables increase button when value equals maxValue', () => {
    render(<NumberToggle {...defaultProps} maxValue={5} />);
    
    // Check if the increase button is disabled (has secondary class)
    expect(screen.getByTestId('icon-circle-plus')).toHaveClass('figma-text-secondary');
    
    // Click should not trigger the function
    fireEvent.click(screen.getByTestId('increase-steps-button'));
    expect(defaultProps.increaseFunction).not.toHaveBeenCalled();
  });

  test('disables decrease button when value equals minValue', () => {
    render(<NumberToggle {...defaultProps} value={3} minValue={3} />);
    
    // Check if the decrease button is disabled (has secondary class)
    expect(screen.getByTestId('icon-circle-minus')).toHaveClass('figma-text-secondary');
    
    // Click should not trigger the function
    fireEvent.click(screen.getByTestId('decrease-steps-button'));
    expect(defaultProps.decreaseFunction).not.toHaveBeenCalled();
  });

  test('enables both buttons when value is between minValue and maxValue', () => {
    render(<NumberToggle {...defaultProps} value={5} minValue={1} maxValue={10} />);
    
    expect(screen.getByTestId('icon-circle-minus')).toHaveClass('figma-text-primary');
    expect(screen.getByTestId('icon-circle-plus')).toHaveClass('figma-text-primary');
    
    fireEvent.click(screen.getByTestId('decrease-steps-button'));
    expect(defaultProps.decreaseFunction).toHaveBeenCalledTimes(1);
    
    fireEvent.click(screen.getByTestId('increase-steps-button'));
    expect(defaultProps.increaseFunction).toHaveBeenCalledTimes(1);
  });

  test('updates button states when props change', () => {
    const { rerender } = render(<NumberToggle {...defaultProps} value={5} minValue={1} maxValue={10} />);
    
    // Initially both buttons should be enabled
    expect(screen.getByTestId('icon-circle-minus')).toHaveClass('figma-text-primary');
    expect(screen.getByTestId('icon-circle-plus')).toHaveClass('figma-text-primary');
    
    // Update to reach maxValue
    rerender(<NumberToggle {...defaultProps} value={10} minValue={1} maxValue={10} />);
    expect(screen.getByTestId('icon-circle-minus')).toHaveClass('figma-text-primary');
    expect(screen.getByTestId('icon-circle-plus')).toHaveClass('figma-text-secondary');
    
    // Update to reach minValue
    rerender(<NumberToggle {...defaultProps} value={1} minValue={1} maxValue={10} />);
    expect(screen.getByTestId('icon-circle-minus')).toHaveClass('figma-text-secondary');
    expect(screen.getByTestId('icon-circle-plus')).toHaveClass('figma-text-primary');
  });

  test('displays the correct value when it changes', () => {
    const { rerender } = render(<NumberToggle {...defaultProps} value={5} />);
    expect(screen.getByTestId('steps-count')).toHaveTextContent('5');
    
    rerender(<NumberToggle {...defaultProps} value={8} />);
    expect(screen.getByTestId('steps-count')).toHaveTextContent('8');
  });

  test('applies non-selectable text style to all elements', () => {
    render(<NumberToggle {...defaultProps} />);
    
    const decreaseButton = screen.getByTestId('decrease-steps-button');
    const valueDisplay = screen.getByTestId('steps-count');
    const increaseButton = screen.getByTestId('increase-steps-button');
    
    // Check if all elements have the non-selectable style
    [decreaseButton, valueDisplay, increaseButton].forEach(element => {
      const style = window.getComputedStyle(element);
      expect(style.userSelect).toBe('none');
    });
  });
});
