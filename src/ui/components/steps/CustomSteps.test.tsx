import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomSteps from './CustomSteps';
import { 
  INVALID_CUSTOM_STEP_NON_NUMERIC, 
  INVALID_CUSTOM_STEP_OUT_OF_RANGE,
  INVALID_CUSTOM_STEP_RESERVED,
  INVALID_CUSTOM_STEP_DUPLICATED
} from '../../../constants/uiConstants';

// Mock the useSwatchStore hook
const mockAddCustomStep = jest.fn();
const mockBuildSwatches = jest.fn();
let mockCustomSteps = new Set();

jest.mock('../../store/useSwatchStore', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation((selector) => {
    // Mock the store state and functions
    const state = {
      customSteps: mockCustomSteps,
      addCustomStep: mockAddCustomStep,
      buildSwatches: mockBuildSwatches
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

// Mock the Toast component
jest.mock('../helpers/Toast', () => {
  return function MockToast({ 
    message, 
    isVisible, 
    onClose 
  }: { 
    message: string, 
    isVisible: boolean, 
    onClose: () => void 
  }) {
    return isVisible ? (
      <div data-testid="toast" onClick={onClose}>
        {message}
      </div>
    ) : null;
  };
});

describe('CustomSteps Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockCustomSteps = new Set();
  });

  test('renders with the correct label and input', () => {
    render(<CustomSteps />);
    
    // Check that the component renders
    const customSteps = screen.getByTestId('custom-steps');
    expect(customSteps).toBeInTheDocument();
    
    // Check that the input is displayed
    const input = screen.getByTestId('custom-step-input');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('');
  });

  test('updates input value when typing', () => {
    render(<CustomSteps />);
    
    // Find the input and type in it
    const input = screen.getByTestId('custom-step-input');
    fireEvent.change(input, { target: { value: '123' } });
    
    // Check that the input value is updated
    expect(input).toHaveValue('123');
  });

  test('adds valid custom step when add button is clicked', () => {
    render(<CustomSteps />);
    
    // Find the input and type a valid value
    const input = screen.getByTestId('custom-step-input');
    fireEvent.change(input, { target: { value: '123' } });
    
    // Find and click the add button
    const addButton = screen.getByTestId('add-custom-step-button');
    fireEvent.click(addButton);
    
    // Check that the functions were called with the correct value
    expect(mockAddCustomStep).toHaveBeenCalledWith(123);
    expect(mockBuildSwatches).toHaveBeenCalledTimes(1);
    
    // Check that the input is cleared
    expect(input).toHaveValue('');
  });

  test('shows error toast for non-numeric input', async () => {
    render(<CustomSteps />);
    
    // Find the input and type a non-numeric value
    const input = screen.getByTestId('custom-step-input');
    fireEvent.change(input, { target: { value: 'abc' } });
    
    // Find and click the add button
    const addButton = screen.getByTestId('add-custom-step-button');
    fireEvent.click(addButton);
    
    // Check that the toast is displayed with the correct message
    await waitFor(() => {
      const toast = screen.getByTestId('toast');
      expect(toast).toBeInTheDocument();
      expect(toast).toHaveTextContent(INVALID_CUSTOM_STEP_NON_NUMERIC);
    });
    
    // Check that the functions were not called
    expect(mockAddCustomStep).not.toHaveBeenCalled();
    expect(mockBuildSwatches).not.toHaveBeenCalled();
  });

  test('shows error toast for out of range input', async () => {
    render(<CustomSteps />);
    
    // Find the input and type a value that's out of range
    const input = screen.getByTestId('custom-step-input');
    fireEvent.change(input, { target: { value: '1001' } });
    
    // Find and click the add button
    const addButton = screen.getByTestId('add-custom-step-button');
    fireEvent.click(addButton);
    
    // Check that the toast is displayed with the correct message
    await waitFor(() => {
      const toast = screen.getByTestId('toast');
      expect(toast).toBeInTheDocument();
      expect(toast).toHaveTextContent(INVALID_CUSTOM_STEP_OUT_OF_RANGE);
    });
  });

  test('shows error toast for reserved values', async () => {
    render(<CustomSteps />);
    
    // Find the input and type a reserved value
    const input = screen.getByTestId('custom-step-input');
    fireEvent.change(input, { target: { value: '500' } });
    
    // Find and click the add button
    const addButton = screen.getByTestId('add-custom-step-button');
    fireEvent.click(addButton);
    
    // Check that the toast is displayed with the correct message
    await waitFor(() => {
      const toast = screen.getByTestId('toast');
      expect(toast).toBeInTheDocument();
      expect(toast).toHaveTextContent(INVALID_CUSTOM_STEP_RESERVED);
    });
  });

  test('shows error toast for duplicate values', async () => {
    // Add a custom step to the mock set
    mockCustomSteps.add(123);
    
    render(<CustomSteps />);
    
    // Find the input and type a value that's already in the set
    const input = screen.getByTestId('custom-step-input');
    fireEvent.change(input, { target: { value: '123' } });
    
    // Find and click the add button
    const addButton = screen.getByTestId('add-custom-step-button');
    fireEvent.click(addButton);
    
    // Check that the toast is displayed with the correct message
    await waitFor(() => {
      const toast = screen.getByTestId('toast');
      expect(toast).toBeInTheDocument();
      expect(toast).toHaveTextContent(INVALID_CUSTOM_STEP_DUPLICATED);
    });
  });

  test('hides toast when clicked', async () => {
    render(<CustomSteps />);
    
    // Find the input and type a non-numeric value
    const input = screen.getByTestId('custom-step-input');
    fireEvent.change(input, { target: { value: 'abc' } });
    
    // Find and click the add button
    const addButton = screen.getByTestId('add-custom-step-button');
    fireEvent.click(addButton);
    
    // Check that the toast is displayed
    await waitFor(() => {
      const toast = screen.getByTestId('toast');
      expect(toast).toBeInTheDocument();
      
      // Click the toast to hide it
      fireEvent.click(toast);
    });
    
    // Check that the toast is hidden
    expect(screen.queryByTestId('toast')).not.toBeInTheDocument();
  });
});
