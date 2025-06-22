import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TextAndInput from './TextAndInput';

// Mock the FontAwesomeIcon component
jest.mock('../helpers/FontAwesomeIcon', () => {
  return function MockFontAwesomeIcon({ icon }: { icon: string }) {
    return <span data-testid={`icon-${icon}`}>{icon}</span>;
  };
});

// Mock the Toast component
jest.mock('../helpers/Toast', () => {
  return function MockToast({ message, isVisible }: { message: string, isVisible: boolean }) {
    return isVisible ? <div data-testid="mock-toast">{message}</div> : null;
  };
});

describe('TextAndInput Component', () => {
  const mockSetInputText = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  test('renders with the provided input text', () => {
    render(<TextAndInput inputText="Test Input" setInputText={mockSetInputText} />);
    
    // Check that the text is displayed
    expect(screen.getByText('Test Input')).toBeInTheDocument();
    
    // Check that the edit button is rendered
    expect(screen.getByTestId('edit-button')).toBeInTheDocument();
  });
  
  test('switches to edit mode when edit button is clicked', () => {
    render(<TextAndInput inputText="Test Input" setInputText={mockSetInputText} />);
    
    // Click the edit button
    fireEvent.click(screen.getByTestId('edit-button'));
    
    // Check that the input field is rendered
    expect(screen.getByTestId('swatch-name-input')).toBeInTheDocument();
    expect(screen.getByTestId('swatch-name-input')).toHaveValue('Test Input');
    
    // Check that the save and cancel buttons are rendered
    expect(screen.getByTestId('save-button')).toBeInTheDocument();
    expect(screen.getByTestId('cancel-button')).toBeInTheDocument();
  });
  
  test('updates input value when typing', () => {
    render(<TextAndInput inputText="Test Input" setInputText={mockSetInputText} />);
    
    // Click the edit button to enter edit mode
    fireEvent.click(screen.getByTestId('edit-button'));
    
    // Type in the input field
    fireEvent.change(screen.getByTestId('swatch-name-input'), { target: { value: 'New Value' } });
    
    // Check that the input value is updated
    expect(screen.getByTestId('swatch-name-input')).toHaveValue('New Value');
  });
  
  test('calls setInputText when save button is clicked', () => {
    render(<TextAndInput inputText="Test Input" setInputText={mockSetInputText} />);
    
    // Click the edit button to enter edit mode
    fireEvent.click(screen.getByTestId('edit-button'));
    
    // Type in the input field
    fireEvent.change(screen.getByTestId('swatch-name-input'), { target: { value: 'New Value' } });
    
    // Click the save button
    fireEvent.click(screen.getByTestId('save-button'));
    
    // Check that setInputText was called with the new value
    expect(mockSetInputText).toHaveBeenCalledWith('New Value');
  });
  
  test('reverts to original value when cancel button is clicked', () => {
    render(<TextAndInput inputText="Test Input" setInputText={mockSetInputText} />);
    
    // Click the edit button to enter edit mode
    fireEvent.click(screen.getByTestId('edit-button'));
    
    // Type in the input field
    fireEvent.change(screen.getByTestId('swatch-name-input'), { target: { value: 'New Value' } });
    
    // Click the cancel button
    fireEvent.click(screen.getByTestId('cancel-button'));
    
    // Check that we're back in display mode with the original text
    expect(screen.getByText('Test Input')).toBeInTheDocument();
    expect(screen.queryByTestId('swatch-name-input')).not.toBeInTheDocument();
  });
  
  test('shows error toast when trying to save an empty value', () => {
    render(<TextAndInput inputText="Test Input" setInputText={mockSetInputText} />);
    
    // Click the edit button to enter edit mode
    fireEvent.click(screen.getByTestId('edit-button'));
    
    // Clear the input field
    fireEvent.change(screen.getByTestId('swatch-name-input'), { target: { value: '' } });
    
    // Click the save button
    fireEvent.click(screen.getByTestId('save-button'));
    
    // Check that the toast is shown with the error message
    expect(screen.getByTestId('mock-toast')).toBeInTheDocument();
    
    // Check that setInputText was not called
    expect(mockSetInputText).not.toHaveBeenCalled();
  });
  
  test('renders with custom className', () => {
    render(<TextAndInput inputText="Test Input" setInputText={mockSetInputText} className="custom-class" />);
    
    // Check that the container has the custom class
    const container = screen.getByText('Test Input').parentElement;
    expect(container).toHaveClass('custom-class');
  });
});
