import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Toggle from './Toggle';

// Mock the FontAwesomeIcon component
jest.mock('./FontAwesomeIcon', () => {
  return function MockFontAwesomeIcon({ icon, className, style }: { icon: string, className?: string, style?: React.CSSProperties }) {
    return <span data-testid={`icon-${icon}`} className={className} style={style}></span>;
  };
});

describe('Toggle Component', () => {
  test('renders with on state when value is true', () => {
    const handleChange = jest.fn();
    const { container } = render(<Toggle value={true} onChange={handleChange} />);
    
    const toggleContainer = container.firstChild;
    expect(toggleContainer).toHaveClass('figma-bg-primary');
    expect(toggleContainer).not.toHaveClass('figma-bg-secondary-gray');
    
    // Check that the check icon is displayed
    expect(screen.getByTestId('icon-circle-check')).toBeInTheDocument();
    expect(screen.queryByTestId('icon-circle-xmark')).not.toBeInTheDocument();
  });

  test('renders with off state when value is false', () => {
    const handleChange = jest.fn();
    const { container } = render(<Toggle value={false} onChange={handleChange} />);
    
    const toggleContainer = container.firstChild;
    expect(toggleContainer).toHaveClass('figma-bg-secondary-gray');
    expect(toggleContainer).not.toHaveClass('figma-bg-primary');
    
    // Check that the x icon is displayed
    expect(screen.getByTestId('icon-circle-xmark')).toBeInTheDocument();
    expect(screen.queryByTestId('icon-circle-check')).not.toBeInTheDocument();
  });

  test('calls onChange with opposite value when clicked', () => {
    const handleChange = jest.fn();
    const { container } = render(<Toggle value={false} onChange={handleChange} />);
    
    fireEvent.click(container.firstChild as Element);
    
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  test('applies custom className when provided', () => {
    const handleChange = jest.fn();
    const { container } = render(<Toggle value={true} onChange={handleChange} className="custom-class" />);
    
    const toggleContainer = container.firstChild;
    expect(toggleContainer).toHaveClass('custom-class');
  });

  test('applies custom size when provided', () => {
    const handleChange = jest.fn();
    const { container } = render(<Toggle value={true} onChange={handleChange} size={2} />);
    
    const toggleContainer = container.firstChild as HTMLElement;
    expect(toggleContainer).toHaveStyle('width: 6em');
    expect(toggleContainer).toHaveStyle('height: 3.75em');
    
    // Check that the icon has the correct size
    const icon = screen.getByTestId('icon-circle-check');
    expect(icon).toHaveStyle('font-size: 2em');
  });
});
