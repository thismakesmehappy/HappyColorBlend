import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SampleToken from './SampleToken';

// Mock the useTokenNameStore hook
jest.mock('../../store/useTokenNameStore', () => ({
  __esModule: true,
  default: jest.fn((selector) => {
    const state = {
      caseTreatment: 'keep',
      spaceTreatment: 'dash',
      leadingCharsCount: 0,
      trailingCharsCount: 0,
      leadingCharType: 'dash',
      trailingCharType: 'dash'
    };
    return selector(state);
  })
}));

// Mock the computeTokenName function
jest.mock('../../helpers/computeTokenName', () => ({
  computeTokenName: jest.fn(() => '--this-is-an-example')
}));

describe('SampleToken Component', () => {
  test('renders with the correct sample token name', () => {
    render(<SampleToken />);
    
    // Check that the sample token name is rendered
    expect(screen.getByText('--this-is-an-example')).toBeInTheDocument();
    
    // Check that the computeTokenName function was called with the correct parameters
    expect(require('../../helpers/computeTokenName').computeTokenName).toHaveBeenCalledWith(
      "This is AN eXAmple",
      'keep',
      'dash',
      0,
      0,
      'dash',
      'dash'
    );
  });
});