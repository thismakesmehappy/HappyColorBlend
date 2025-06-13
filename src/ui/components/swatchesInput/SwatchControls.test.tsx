import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SwatchControls from './SwatchControls';
import { act } from 'react-dom/test-utils';

// Mock the colorMethods module
jest.mock('../../helpers/colorMethods', () => ({
  isValidHexColor: (color) => /^[0-9A-Fa-f]{6}$/.test(color)
}));

// Mock the Toast component
jest.mock('../helpers/Toast', () => {
  return function MockToast({ message, isVisible }) {
    return isVisible ? <div data-testid="toast">{message}</div> : null;
  };
});

describe('SwatchControls Component', () => {
  const defaultProps = {
    isEditing: false,
    setIsEditing: jest.fn(),
    canDelete: false,
    swatchColor: 'FF5733',
    setSwatchColor: jest.fn(),
    swatchName: 'Test Color',
    setSwatchName: jest.fn(),
    tempSwatchColor: 'FF5733',
    setTempSwatchColor: jest.fn(),
    tempSwatchName: 'Test Color',
    setTempSwatchName: jest.fn(),
    onDelete: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders edit button in display mode', () => {
    render(<SwatchControls {...defaultProps} />);
    
    // Check that the edit button is displayed
    const editButton = screen.getByTestId('edit-button');
    expect(editButton).toBeInTheDocument();
  });

  test('renders delete button when canDelete is true', () => {
    render(<SwatchControls {...defaultProps} canDelete={true} />);
    
    // Check that the delete button is displayed
    const deleteButton = screen.getByTestId('delete-button');
    expect(deleteButton).toBeInTheDocument();
  });

  test('does not render delete button when canDelete is false', () => {
    render(<SwatchControls {...defaultProps} canDelete={false} />);
    
    // Check that the delete button is not displayed
    expect(screen.queryByTestId('delete-button')).not.toBeInTheDocument();
  });

  test('calls setIsEditing when edit button is clicked', () => {
    render(<SwatchControls {...defaultProps} />);
    
    // Find and click the edit button
    const editButton = screen.getByTestId('edit-button');
    fireEvent.click(editButton);
    
    // Check that setIsEditing was called with true
    expect(defaultProps.setIsEditing).toHaveBeenCalledWith(true);
  });

  test('calls onDelete when delete button is clicked', () => {
    render(<SwatchControls {...defaultProps} canDelete={true} />);
    
    // Find and click the delete button
    const deleteButton = screen.getByTestId('delete-button');
    fireEvent.click(deleteButton);
    
    // Check that onDelete was called
    expect(defaultProps.onDelete).toHaveBeenCalled();
  });

  test('renders cancel and save buttons in edit mode', () => {
    render(<SwatchControls {...defaultProps} isEditing={true} />);
    
    // Check that the cancel and save buttons are displayed
    const cancelButton = screen.getByTestId('cancel-button');
    const saveButton = screen.getByTestId('save-button');
    
    expect(cancelButton).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
  });

  test('calls reset functions when cancel button is clicked', () => {
    render(<SwatchControls {...defaultProps} isEditing={true} />);
    
    // Find and click the cancel button
    const cancelButton = screen.getByTestId('cancel-button');
    fireEvent.click(cancelButton);
    
    // Check that the temp values are reset and editing mode is exited
    expect(defaultProps.setTempSwatchColor).toHaveBeenCalledWith('FF5733');
    expect(defaultProps.setTempSwatchName).toHaveBeenCalledWith('Test Color');
    expect(defaultProps.setIsEditing).toHaveBeenCalledWith(false);
  });

  test('updates values and exits edit mode when save button is clicked with valid color', () => {
    render(
      <SwatchControls 
        {...defaultProps} 
        isEditing={true} 
        tempSwatchColor="00FF00" 
        tempSwatchName="New Name" 
      />
    );
    
    // Find and click the save button
    const saveButton = screen.getByTestId('save-button');
    fireEvent.click(saveButton);
    
    // Check that the values are updated and editing mode is exited
    expect(defaultProps.setSwatchName).toHaveBeenCalledWith('New Name');
    expect(defaultProps.setSwatchColor).toHaveBeenCalledWith('00FF00');
    expect(defaultProps.setIsEditing).toHaveBeenCalledWith(false);
  });

  test('shows toast and stays in edit mode when save button is clicked with invalid color', async () => {
    render(
      <SwatchControls 
        {...defaultProps} 
        isEditing={true} 
        tempSwatchColor="INVALID" 
      />
    );
    
    // Find and click the save button
    const saveButton = screen.getByTestId('save-button');
    fireEvent.click(saveButton);
    
    // Check that the values are not updated and editing mode is not exited
    expect(defaultProps.setSwatchName).not.toHaveBeenCalled();
    expect(defaultProps.setSwatchColor).not.toHaveBeenCalled();
    expect(defaultProps.setIsEditing).not.toHaveBeenCalled();
    
    // Check that the toast is displayed
    await waitFor(() => {
      expect(screen.getByTestId('toast')).toBeInTheDocument();
    });
  });

  test('save button is disabled (visually) when color is invalid', () => {
    render(
      <SwatchControls 
        {...defaultProps} 
        isEditing={true} 
        tempSwatchColor="INVALID" 
      />
    );
    
    // Check that the save button has the disabled class
    const saveButton = screen.getByTestId('save-button').firstChild;
    expect(saveButton).toHaveClass('figma-text-disabled');
    expect(saveButton).not.toHaveClass('figma-text-primary');
  });

  test('save button is enabled (visually) when color is valid', () => {
    render(
      <SwatchControls 
        {...defaultProps} 
        isEditing={true} 
        tempSwatchColor="00FF00" 
      />
    );
    
    // Check that the save button has the primary class
    const saveButton = screen.getByTestId('save-button').firstChild;
    expect(saveButton).toHaveClass('figma-text-primary');
    expect(saveButton).not.toHaveClass('figma-text-disabled');
  });
});
