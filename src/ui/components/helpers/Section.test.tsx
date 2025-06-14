import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Section from './Section';

describe('Section Component', () => {
  test('renders children correctly', () => {
    render(
      <Section>
        <div data-testid="test-child">Test Child</div>
      </Section>
    );
    
    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByTestId('test-child')).toHaveTextContent('Test Child');
  });

  test('applies id when provided', () => {
    render(
      <Section id="test-id">
        <div>Test Content</div>
      </Section>
    );
    
    const section = screen.getByText('Test Content').parentElement;
    expect(section).toHaveAttribute('id', 'test-id');
  });

  test('applies className when provided', () => {
    render(
      <Section className="test-class">
        <div>Test Content</div>
      </Section>
    );
    
    const section = screen.getByText('Test Content').parentElement;
    expect(section).toHaveClass('test-class');
    expect(section).toHaveClass('section'); // Always has 'section' class
  });

  test('applies default section class when no className is provided', () => {
    render(
      <Section>
        <div>Test Content</div>
      </Section>
    );
    
    const section = screen.getByText('Test Content').parentElement;
    expect(section).toHaveClass('section');
  });

  test('applies style when provided', () => {
    const testStyle = { backgroundColor: 'blue', margin: '20px' };
    
    render(
      <Section style={testStyle}>
        <div>Test Content</div>
      </Section>
    );
    
    const section = screen.getByText('Test Content').parentElement;
    expect(section).toHaveStyle('background-color: blue');
    expect(section).toHaveStyle('margin: 20px');
  });

  test('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    
    render(
      <Section ref={ref}>
        <div>Test Content</div>
      </Section>
    );
    
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('DIV');
    expect(ref.current?.textContent).toBe('Test Content');
    expect(ref.current?.className).toContain('section');
  });
});
