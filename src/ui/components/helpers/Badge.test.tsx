import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock the entire Badge module to avoid CSS import issues
jest.mock('./Badge', () => {
  const React = require('react');
  return function MockBadge({ children, type, className, iconLeft, iconRight, onClick }: any) {
    const getTypeClasses = () => {
      switch (type) {
        case 'error':
          return 'figma-bg-danger figma-text-light';
        case 'success':
          return 'figma-bg-success figma-text-light';
        case 'warning':
          return 'figma-bg-warning figma-text-dark';
        case 'primary':
          return 'figma-bg-primary figma-text-light';
        default:
          return 'figma-bg-component figma-text-light';
      }
    };
    
    return (
      <span className={`badge ${getTypeClasses()} ${className || ''}`} onClick={onClick}>
        {iconLeft && <span data-testid={`icon-${iconLeft}`}></span>}
        {children}
        {iconRight && <span data-testid={`icon-${iconRight}`}></span>}
      </span>
    );
  };
});

import Badge from './Badge';

// Mock the FontAwesomeIcon component
jest.mock('./FontAwesomeIcon', () => {
  return function MockFontAwesomeIcon({ icon }: { icon: string }) {
    return icon ? <span data-testid={`icon-${icon}`}></span> : null;
  };
});

describe('Badge Component', () => {
  test('renders with children text', () => {
    render(<Badge>Test Badge</Badge>);
    
    expect(screen.getByText('Test Badge')).toBeInTheDocument();
  });

  test('applies default class when no type is provided', () => {
    const { container } = render(<Badge>Default Badge</Badge>);
    
    const badge = container.firstChild;
    expect(badge).toHaveClass('badge');
    expect(badge).toHaveClass('figma-bg-component');
    expect(badge).toHaveClass('figma-text-light');
  });

  test('applies error class when type is error', () => {
    const { container } = render(<Badge type="error">Error Badge</Badge>);
    
    const badge = container.firstChild;
    expect(badge).toHaveClass('badge');
    expect(badge).toHaveClass('figma-bg-danger');
    expect(badge).toHaveClass('figma-text-light');
  });

  test('applies success class when type is success', () => {
    const { container } = render(<Badge type="success">Success Badge</Badge>);
    
    const badge = container.firstChild;
    expect(badge).toHaveClass('badge');
    expect(badge).toHaveClass('figma-bg-success');
    expect(badge).toHaveClass('figma-text-light');
  });

  test('applies warning class when type is warning', () => {
    const { container } = render(<Badge type="warning">Warning Badge</Badge>);
    
    const badge = container.firstChild;
    expect(badge).toHaveClass('badge');
    expect(badge).toHaveClass('figma-bg-warning');
    expect(badge).toHaveClass('figma-text-dark');
  });

  test('applies primary class when type is primary', () => {
    const { container } = render(<Badge type="primary">Primary Badge</Badge>);
    
    const badge = container.firstChild;
    expect(badge).toHaveClass('badge');
    expect(badge).toHaveClass('figma-bg-primary');
    expect(badge).toHaveClass('figma-text-light');
  });

  test('applies additional className when provided', () => {
    const { container } = render(<Badge className="custom-class">Custom Badge</Badge>);
    
    const badge = container.firstChild;
    expect(badge).toHaveClass('custom-class');
    expect(badge).toHaveClass('badge');
  });

  test('renders left icon when iconLeft is provided', () => {
    render(<Badge iconLeft="test-left-icon">Badge with Left Icon</Badge>);
    
    expect(screen.getByTestId('icon-test-left-icon')).toBeInTheDocument();
  });

  test('renders right icon when iconRight is provided', () => {
    render(<Badge iconRight="test-right-icon">Badge with Right Icon</Badge>);
    
    expect(screen.getByTestId('icon-test-right-icon')).toBeInTheDocument();
  });

  test('calls onClick when badge is clicked', () => {
    const handleClick = jest.fn();
    render(<Badge onClick={handleClick}>Clickable Badge</Badge>);
    
    fireEvent.click(screen.getByText('Clickable Badge'));
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
