import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Case from './Case';


// Mock the useTokenNameStore hook
jest.mock('../../store/useTokenNameStore', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation((selector: any) => {
    const state = {
      caseTreatment: 'keep',
      setCaseTreatment: jest.fn()
    };
    return selector(state);
  })
}));

describe('Case Component', () => {
  let mockSetCaseTreatment: jest.Mock;
  
  beforeEach(() => {
    // Reset the mock function before each test
    mockSetCaseTreatment = jest.fn();
    require('../../store/useTokenNameStore').default.mockImplementation((selector: any) => {
      const state = {
        caseTreatment: 'keep',
        setCaseTreatment: mockSetCaseTreatment
      };
      return selector(state);
    });
  });
  
  test('renders with the correct radio options', () => {
    render(<Case />);
    
    // Check that all radio options are rendered
    expect(screen.getByText('Keep')).toBeInTheDocument();
    expect(screen.getByText('Lower')).toBeInTheDocument();
    expect(screen.getByText('Upper')).toBeInTheDocument();
    expect(screen.getByText('Title')).toBeInTheDocument();
    
    // Check that the 'keep' option is selected by default
    const keepRadio = screen.getByRole('radio', { name: 'Keep' });
    expect(keepRadio).toBeChecked();
  });
  
  test('calls setCaseTreatment when a radio option is selected', () => {
    render(<Case />);
    
    // Click on the 'upper' option
    fireEvent.click(screen.getByRole('radio', { name: 'Upper' }));
    
    // Check that setCaseTreatment was called with 'upper'
    expect(mockSetCaseTreatment).toHaveBeenCalledWith('upper');
  });
});