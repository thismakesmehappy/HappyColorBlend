import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ChipOutput from './ChipOutput';

// Mock the wcag-contrast module
jest.mock('wcag-contrast', () => ({
  hex: jest.fn().mockImplementation((color1, color2) => {
    // Return different contrast ratios for testing
    if (color1 === '#FFFFFF' || color2 === '#FFFFFF') {
      if (color1 === '#000000' || color2 === '#000000') {
        return 21; // High contrast
      } else if (color1 === '#FFFF00' || color2 === '#FFFF00') {
        return 1.1; // Low contrast
      }
    }
    return 4; // Default contrast
  })
}));

describe('ChipOutput Component', () => {
  test('renders with the correct background color', () => {
    render(<ChipOutput color="FF5733" />);
    
    const chipElement = screen.getByTestId('chip-output');
    expect(chipElement).toBeInTheDocument();
    expect(chipElement).toHaveStyle('background-color: #FF5733');
  });

  test('applies border class for low contrast colors', () => {
    // Mock the hex function to return a low contrast value
    require('wcag-contrast').hex.mockReturnValueOnce(2.5);
    
    render(<ChipOutput color="FFFF00" />);
    
    const chipElement = screen.getByTestId('chip-output');
    expect(chipElement).toHaveClass('figma-border');
  });

  test('does not apply border class for high contrast colors', () => {
    // Mock the hex function to return a high contrast value
    require('wcag-contrast').hex.mockReturnValueOnce(4.5);
    
    render(<ChipOutput color="000000" />);
    
    const chipElement = screen.getByTestId('chip-output');
    expect(chipElement).not.toHaveClass('figma-border');
  });

  test('has correct dimensions and display properties', () => {
    render(<ChipOutput color="FF5733" />);
    
    const chipElement = screen.getByTestId('chip-output');
    expect(chipElement).toHaveStyle({
      width: '1em',
      height: '.75em',
      display: 'inline-block'
    });
  });
});
