import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Settings from './Settings';

// Mock the Area component
jest.mock('./helpers/Area', () => {
  return function MockArea({ id, className, children }: { id?: string; className?: string; children?: React.ReactNode }) {
    return (
      <div data-testid="mock-area" id={id} className={className}>
        {children}
      </div>
    );
  };
});

// Mock the ColumnDivider component
jest.mock('./helpers/ColumnDivider', () => {
  return function MockColumnDivider() {
    return <div data-testid="mock-column-divider">Column Divider</div>;
  };
});

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
    
    // Check that the component renders
    const area = screen.getByTestId('mock-area');
    expect(area).toBeInTheDocument();
    expect(area).toHaveAttribute('id', 'settings');
    
    // Check that the child components are rendered
    expect(screen.getByTestId('mock-case')).toBeInTheDocument();
    expect(screen.getByTestId('mock-spaces')).toBeInTheDocument();
    expect(screen.getByTestId('mock-leading')).toBeInTheDocument();
    expect(screen.getByTestId('mock-trailing')).toBeInTheDocument();
    
    // Check that the column dividers are rendered
    const dividers = screen.getAllByTestId('mock-column-divider');
    expect(dividers).toHaveLength(3); // There should be 3 column dividers
    
    // Check that the title is rendered
    expect(screen.getByText('Token Name Options')).toBeInTheDocument();
  });
  
  test('passes className to Area component', () => {
    render(<Settings className="test-class" />);
    
    const area = screen.getByTestId('mock-area');
    expect(area.className).toContain('test-class');
  });
});
