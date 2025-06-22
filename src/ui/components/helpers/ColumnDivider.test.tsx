import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ColumnDivider from './ColumnDivider';

// Mock the scss import
jest.mock('../../scss/column-layout.scss', () => ({}));

describe('ColumnDivider Component', () => {
  test('renders with default class', () => {
    const { container } = render(<ColumnDivider />);
    
    const divider = container.firstChild;
    expect(divider).toBeInTheDocument();
    expect(divider).toHaveClass('column-divider');
  });

  test('applies additional className when provided', () => {
    const { container } = render(<ColumnDivider className="test-class" />);
    
    const divider = container.firstChild;
    expect(divider).toHaveClass('column-divider');
    expect(divider).toHaveClass('test-class');
  });

  test('renders as an empty div', () => {
    const { container } = render(<ColumnDivider />);
    
    const divider = container.firstChild;
    expect(divider).toBeEmptyDOMElement();
  });
});
