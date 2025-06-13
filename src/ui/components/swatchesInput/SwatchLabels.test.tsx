import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SwatchLabels from './SwatchLabels';

// Mock the colorMethods module
jest.mock('../../helpers/colorMethods', () => ({
  isValidHexColor: (color) => /^[0-9A-Fa-f]{6}$/.test(color)
}));

describe('SwatchLabels Component', () => {
  const defaultProps = {
    isEditing: false,
    swatchColor: 'FF5733',
    swatchName: 'Test Color',
    tempSwatchColor: 'FF5733',
    setTempSwatchColor: jest.fn(),
    tempSwatchName: 'Test Color',
    setTempSwatchName: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders display mode correctly', () => {
    render(<SwatchLabels {...defaultProps} />);
    
    // Check that the display container is rendered
    const displayContainer = screen.getByTestId('swatch-labels-display');
    expect(displayContainer).toBeInTheDocument();
    
    // Check that the name and color are displayed correctly
    const nameDisplay = screen.getByTestId('swatch-name-display');
    const colorDisplay = screen.getByTestId('swatch-color-display');
    
    expect(nameDisplay).toHaveTextContent('Test Color');
    expect(colorDisplay).toHaveTextContent('#FF5733');
  });

  test('renders edit mode correctly', () => {
    render(<SwatchLabels {...defaultProps} isEditing={true} />);
    
    // Check that the edit container is rendered
    const editContainer = screen.getByTestId('swatch-labels-edit');
    expect(editContainer).toBeInTheDocument();
    
    // Check that input fields are displayed
    const nameInput = screen.getByTestId('swatch-name-input');
    const colorInput = screen.getByTestId('swatch-color-input');
    
    expect(nameInput).toBeInTheDocument();
    expect(colorInput).toBeInTheDocument();
    
    // Check that the input fields have the correct values
    expect(nameInput).toHaveValue('Test Color');
    expect(colorInput).toHaveValue('FF5733');
  });

  test('calls setTempSwatchName when name input changes', () => {
    render(<SwatchLabels {...defaultProps} isEditing={true} />);
    
    // Get the name input field
    const nameInput = screen.getByTestId('swatch-name-input');
    
    // Change the name
    fireEvent.change(nameInput, { target: { value: 'New Name' } });
    
    // Check that setTempSwatchName was called with the new value
    expect(defaultProps.setTempSwatchName).toHaveBeenCalledWith('New Name');
  });

  test('calls setTempSwatchColor when color input changes', () => {
    render(<SwatchLabels {...defaultProps} isEditing={true} />);
    
    // Get the color input field
    const colorInput = screen.getByTestId('swatch-color-input');
    
    // Change the color
    fireEvent.change(colorInput, { target: { value: '00FF00' } });
    
    // Check that setTempSwatchColor was called with the new value
    expect(defaultProps.setTempSwatchColor).toHaveBeenCalledWith('00FF00');
  });

  test('shows error styling for invalid hex color', () => {
    render(
      <SwatchLabels 
        {...defaultProps} 
        isEditing={true} 
        tempSwatchColor="INVALID" 
      />
    );
    
    // Get the color input field
    const colorInput = screen.getByTestId('swatch-color-input');
    
    // Check that the input has the error class
    expect(colorInput).toHaveClass('border-danger');
  });

  test('does not show error styling for valid hex color', () => {
    render(
      <SwatchLabels 
        {...defaultProps} 
        isEditing={true} 
        tempSwatchColor="00FF00" 
      />
    );
    
    // Get the color input field
    const colorInput = screen.getByTestId('swatch-color-input');
    
    // Check that the input does not have the error class
    expect(colorInput).not.toHaveClass('border-danger');
  });

  test('updates validation state when tempSwatchColor changes', () => {
    const { rerender } = render(
      <SwatchLabels 
        {...defaultProps} 
        isEditing={true} 
        tempSwatchColor="FF5733" 
      />
    );
    
    // Get the color input field
    let colorInput = screen.getByTestId('swatch-color-input');
    
    // Initially the input should not have the error class
    expect(colorInput).not.toHaveClass('border-danger');
    
    // Rerender with invalid color
    rerender(
      <SwatchLabels 
        {...defaultProps} 
        isEditing={true} 
        tempSwatchColor="INVALID" 
      />
    );
    
    // Get the updated color input field
    colorInput = screen.getByTestId('swatch-color-input');
    
    // Now the input should have the error class
    expect(colorInput).toHaveClass('border-danger');
  });
});
