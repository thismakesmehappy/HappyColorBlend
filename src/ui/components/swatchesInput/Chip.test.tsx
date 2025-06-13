import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Chip from './Chip';

describe('Chip Component', () => {
  test('renders with default props', () => {
    render(<Chip color="FF5733" />);
    
    const chipElement = screen.getByTestId('color-chip');
    expect(chipElement).toBeInTheDocument();
    expect(chipElement).toHaveStyle('background-color: #FF5733');
    expect(chipElement).toHaveStyle('width: 50px');
    expect(chipElement).toHaveStyle('height: 50px');
    expect(chipElement).toHaveAttribute('data-color', 'FF5733');
  });

  test('renders with custom dimensions', () => {
    render(<Chip color="FF5733" width="100px" height="75px" />);
    
    const chipElement = screen.getByTestId('color-chip');
    expect(chipElement).toHaveStyle('width: 100px');
    expect(chipElement).toHaveStyle('height: 75px');
  });

  test('renders with numeric dimensions', () => {
    render(<Chip color="FF5733" width={100} height={75} />);
    
    const chipElement = screen.getByTestId('color-chip');
    expect(chipElement).toHaveStyle('width: 100px');
    expect(chipElement).toHaveStyle('height: 75px');
  });

  test('applies custom className', () => {
    render(<Chip color="FF5733" className="custom-class" />);
    
    const chipElement = screen.getByTestId('color-chip');
    expect(chipElement).toHaveClass('custom-class');
    expect(chipElement).toHaveClass('chip');
  });

  test('applies custom style', () => {
    const customStyle = { borderRadius: '50%', margin: '10px' };
    render(<Chip color="FF5733" style={customStyle} />);
    
    const chipElement = screen.getByTestId('color-chip');
    expect(chipElement).toHaveStyle('border-radius: 50%');
    expect(chipElement).toHaveStyle('margin: 10px');
  });

  test('handles different color formats correctly', () => {
    // Test lowercase
    const { rerender } = render(<Chip color="ff5733" />);
    expect(screen.getByTestId('color-chip')).toHaveStyle('background-color: #ff5733');
    expect(screen.getByTestId('color-chip')).toHaveAttribute('data-color', 'ff5733');
    
    // Test uppercase
    rerender(<Chip color="FF5733" />);
    expect(screen.getByTestId('color-chip')).toHaveStyle('background-color: #FF5733');
    expect(screen.getByTestId('color-chip')).toHaveAttribute('data-color', 'FF5733');
    
    // Test with leading hash (should be handled by the component)
    rerender(<Chip color="#FF5733" />);
    expect(screen.getByTestId('color-chip')).toHaveStyle('background-color: ##FF5733');
    expect(screen.getByTestId('color-chip')).toHaveAttribute('data-color', '#FF5733');
  });
});
