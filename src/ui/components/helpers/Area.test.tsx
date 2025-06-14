import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Area from './Area';

describe('Area Component', () => {
  test('renders children correctly', () => {
    render(
      <Area>
        <div data-testid="test-child">Test Child</div>
      </Area>
    );
    
    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByTestId('test-child')).toHaveTextContent('Test Child');
  });

  test('applies id when provided', () => {
    render(
      <Area id="test-id">
        <div>Test Content</div>
      </Area>
    );
    
    const area = screen.getByText('Test Content').parentElement;
    expect(area).toHaveAttribute('id', 'test-id');
  });

  test('applies className when provided', () => {
    render(
      <Area className="test-class">
        <div>Test Content</div>
      </Area>
    );
    
    const area = screen.getByText('Test Content').parentElement;
    expect(area).toHaveClass('test-class');
  });

  test('applies style when provided', () => {
    const testStyle = { backgroundColor: 'red', padding: '10px' };
    
    render(
      <Area style={testStyle}>
        <div>Test Content</div>
      </Area>
    );
    
    const area = screen.getByText('Test Content').parentElement;
    expect(area).toHaveStyle('background-color: red');
    expect(area).toHaveStyle('padding: 10px');
  });

  test('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    
    render(
      <Area ref={ref}>
        <div>Test Content</div>
      </Area>
    );
    
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('DIV');
    expect(ref.current?.textContent).toBe('Test Content');
  });
});
