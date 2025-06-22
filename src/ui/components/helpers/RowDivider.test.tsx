import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import RowDivider from './RowDivider';

// Mock the scss import
jest.mock('../../scss/column-layout.scss', () => ({}));

describe('RowDivider Component', () => {
  test('renders with default class', () => {
    const { container } = render(<RowDivider />);
    
    const divider = container.firstChild;
    expect(divider).toBeInTheDocument();
    expect(divider).toHaveClass('row-divider');
  });

  test('applies additional className when provided', () => {
    const { container } = render(<RowDivider className="test-class" />);
    
    const divider = container.firstChild;
    expect(divider).toHaveClass('row-divider');
    expect(divider).toHaveClass('test-class');
  });

  test('renders as an empty div', () => {
    const { container } = render(<RowDivider />);
    
    const divider = container.firstChild;
    expect(divider).toBeEmptyDOMElement();
  });
});
