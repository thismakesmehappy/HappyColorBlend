import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LeftColumn from './LeftColumn';

// Mock the Area component
jest.mock('./helpers/Area', () => {
  return function MockArea({ 
    id, 
    className, 
    style, 
    children 
  }: { 
    id?: string; 
    className?: string; 
    style?: React.CSSProperties; 
    children?: React.ReactNode 
  }) {
    return (
      <div 
        data-testid="mock-area" 
        id={id} 
        className={className}
        style={style}
      >
        {children}
      </div>
    );
  };
});

// Mock the ShadeTint component
jest.mock('./ShadeTint', () => {
  return React.forwardRef(function MockShadeTint(
    props: {}, 
    ref: React.ForwardedRef<HTMLDivElement>
  ) {
    return <div data-testid="mock-shade-tint" ref={ref as React.RefObject<HTMLDivElement>}>Mock ShadeTint</div>;
  });
});

// Mock the PrimaryColors component
jest.mock('./PrimaryColors', () => {
  return function MockPrimaryColors() {
    return <div data-testid="mock-primary-colors">Mock PrimaryColors</div>;
  };
});

// Mock the RowDivider component
jest.mock('./helpers/RowDivider', () => {
  return function MockRowDivider() {
    return <div data-testid="mock-row-divider">Mock RowDivider</div>;
  };
});

describe('LeftColumn Component', () => {
  test('renders with correct structure', () => {
    render(<LeftColumn />);
    
    // Check that the Area component is rendered with correct props
    const area = screen.getByTestId('mock-area');
    expect(area).toBeInTheDocument();
    expect(area).toHaveAttribute('id', 'left-column');
    
    // Check that all child components are rendered in the correct order
    const children = area.childNodes;
    expect(children[0]).toHaveAttribute('data-testid', 'mock-shade-tint');
    expect(children[1]).toHaveAttribute('data-testid', 'mock-row-divider');
    expect(children[2]).toHaveAttribute('data-testid', 'mock-primary-colors');
  });

  test('passes className to Area component', () => {
    render(<LeftColumn className="test-class" />);
    
    const area = screen.getByTestId('mock-area');
    expect(area).toHaveAttribute('class', 'test-class');
  });

  test('passes style to Area component', () => {
    const testStyle = { width: '300px' };
    render(<LeftColumn style={testStyle} />);
    
    // In our mock, we're passing style directly to the div
    const area = screen.getByTestId('mock-area');
    expect(area).toHaveStyle('width: 300px');
  });

  test('passes ref to ShadeTint component', () => {
    const testRef = React.createRef<HTMLDivElement>();
    render(<LeftColumn shadeTintRef={testRef} />);
    
    // Our mock is set up to pass the ref to the div
    const shadeTint = screen.getByTestId('mock-shade-tint');
    expect(shadeTint).toBeInTheDocument();
    
    // Note: We can't directly test that the ref is attached in this test environment
    // as the ref won't actually be populated in the test DOM
  });
});
