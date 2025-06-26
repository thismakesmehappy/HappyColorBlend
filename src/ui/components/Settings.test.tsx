import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Settings from './Settings';

// Mock the tokenSettings components
jest.mock('./tokenSettings/Case', () => {
  return function MockCase() {
    return <div data-testid="mock-case">Case Component</div>;
  };
});

jest.mock('./tokenSettings/Spaces', () => {
  return function MockSpaces() {
    return <div data-testid="mock-spaces">Spaces Component</div>;
  };
});

jest.mock('./tokenSettings/Leading', () => {
  return function MockLeading() {
    return <div data-testid="mock-leading">Leading Component</div>;
  };
});

jest.mock('./tokenSettings/Trailing', () => {
  return function MockTrailing() {
    return <div data-testid="mock-trailing">Trailing Component</div>;
  };
});

describe('Settings Component', () => {
  test('renders with correct structure', () => {
    render(<Settings />);

    // Check that the main div is rendered with correct id
    const settingsDiv = screen.getByText('Token Name Options').nextElementSibling;
    expect(settingsDiv).toBeInTheDocument();
    expect(settingsDiv).toHaveAttribute('id', 'settings');

    // Check that the child components are rendered
    expect(screen.getByTestId('mock-case')).toBeInTheDocument();
    expect(screen.getByTestId('mock-spaces')).toBeInTheDocument();
    expect(screen.getByTestId('mock-leading')).toBeInTheDocument();
    expect(screen.getByTestId('mock-trailing')).toBeInTheDocument();

    // Check that the title is rendered
    expect(screen.getByText('Token Name Options')).toBeInTheDocument();
  });

  test('passes className to main div', () => {
    render(<Settings className="test-class" />);

    const settingsDiv = screen.getByText('Token Name Options').nextElementSibling;
    expect(settingsDiv).toHaveClass('test-class');
    expect(settingsDiv).toHaveClass('figma-text');
  });

  test('passes style to main div', () => {
    const testStyle = { width: '300px' };
    render(<Settings style={testStyle} />);

    const settingsDiv = screen.getByText('Token Name Options').nextElementSibling;
    expect(settingsDiv).toHaveStyle('width: 300px');
  });
});