import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SwatchColorChip from './SwatchColorChip';

// Mock the useSwatchStore hook
jest.mock('../../store/useSwatchStore', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation((selector) => {
    // Mock the getShouldPadZeros selector
    if (selector.name === 'selector') {
      return selector({ getShouldPadZeros: () => true });
    }
    return selector({ getShouldPadZeros: () => true });
  })
}));

// Mock the wcag-contrast module
jest.mock('wcag-contrast', () => ({
  hex: jest.fn().mockImplementation((color1, color2) => {
    // Return different contrast ratios for testing
    if (color1 === '#FFF' && color2 === '#000000') {
      return 21; // High contrast - should use white text
    } else if (color1 === '#FFF' && color2 === '#FFFFFF') {
      return 1; // Low contrast - should use black text
    }
    return 4; // Default contrast
  })
}));

describe('SwatchColorChip Component', () => {
  test('renders with the correct background color', () => {
    render(<SwatchColorChip color="FF5733" step={500} />);
    
    const chipElement = screen.getByTestId('swatch-color-chip');
    expect(chipElement).toBeInTheDocument();
    expect(chipElement).toHaveStyle('background-color: #FF5733');
    expect(chipElement).toHaveAttribute('data-color', 'FF5733');
    expect(chipElement).toHaveAttribute('data-step', '500');
  });

  test('displays step number with padding when shouldPadZeros is true', () => {
    render(<SwatchColorChip color="FF5733" step={50} />);
    
    const chipElement = screen.getByTestId('swatch-color-chip');
    expect(chipElement).toHaveTextContent('050');
  });

  test('uses white text for dark background colors', () => {
    // Mock the hex function to return a high contrast value
    require('wcag-contrast').hex.mockReturnValueOnce(4.5);
    
    render(<SwatchColorChip color="000000" step={500} />);
    
    const chipElement = screen.getByTestId('swatch-color-chip');
    expect(chipElement).toHaveStyle('color: #FFFFFF');
  });

  test('uses black text for light background colors', () => {
    // Mock the hex function to return a low contrast value
    require('wcag-contrast').hex.mockReturnValueOnce(2.5);
    
    render(<SwatchColorChip color="FFFFFF" step={500} />);
    
    const chipElement = screen.getByTestId('swatch-color-chip');
    expect(chipElement).toHaveStyle('color: #000000');
  });

  test('displays the color hex value', () => {
    render(<SwatchColorChip color="FF5733" step={500} />);
    
    const chipElement = screen.getByTestId('swatch-color-chip');
    expect(chipElement).toHaveTextContent('#FF5733');
  });
});