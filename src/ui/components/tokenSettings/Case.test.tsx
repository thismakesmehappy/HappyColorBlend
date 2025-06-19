import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Case from './Case';

// Mock the Section component
jest.mock('../helpers/Section', () => {
  return function MockSection({ id, children }: { id?: string; children?: React.ReactNode }) {
    return (
      <div data-testid="mock-section" id={id}>
        {children}
      </div>
    );
  };
});

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
    expect(screen.getByLabelText('Keep')).toBeInTheDocument();
    expect(screen.getByLabelText('Lower')).toBeInTheDocument();
    expect(screen.getByLabelText('Upper')).toBeInTheDocument();
    expect(screen.getByLabelText('Title')).toBeInTheDocument();
    
    // Check that the 'keep' option is selected by default
    expect(screen.getByLabelText('Keep')).toBeChecked();
  });
  
  test('calls setCaseTreatment when a radio option is selected', () => {
    render(<Case />);
    
    // Click on the 'upper' option
    fireEvent.click(screen.getByLabelText('Upper'));
    
    // Check that setCaseTreatment was called with 'upper'
    expect(mockSetCaseTreatment).toHaveBeenCalledWith('upper');
  });
});
