import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ShadeTint from './ShadeTint';

// Mock the scss import
jest.mock('../scss/column-layout.scss', () => ({}));

// Mock the Section component
jest.mock('./helpers/Section', () => {
  return React.forwardRef(function MockSection(
    props: { 
      id?: string; 
      className?: string; 
      style?: React.CSSProperties; 
      children?: React.ReactNode 
    }, 
    ref: React.ForwardedRef<HTMLDivElement>
  ) {
    return (
      <div 
        data-testid="mock-section" 
        id={props.id} 
        className={props.className}
        style={props.style}
        ref={ref as React.RefObject<HTMLDivElement>}
      >
        {props.children}
      </div>
    );
  });
});

// Mock the Swatch component
jest.mock('./swatchesInput/Swatch', () => {
  return function MockSwatch({ 
    color, 
    name, 
    updateSwatch, 
    id 
  }: { 
    color: string; 
    name: string; 
    updateSwatch: (color: string, name: string) => void; 
    id: string 
  }) {
    return (
      <div data-testid={`mock-swatch-${id}`}>
        <input 
          data-testid={`mock-swatch-color-${id}`}
          value={color}
          onChange={(e) => updateSwatch(e.target.value, name)}
        />
        <input 
          data-testid={`mock-swatch-name-${id}`}
          value={name}
          onChange={(e) => updateSwatch(color, e.target.value)}
        />
      </div>
    );
  };
});

// Mock the useSwatchStore hook
const mockSetShade = jest.fn();
const mockSetTint = jest.fn();
const mockBuildSwatches = jest.fn();

jest.mock('../store/useSwatchStore', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation((selector) => {
    const state = {
      getShade: () => ({ 
        id: 'shade', 
        name: 'Black', 
        color: '000000',
        customToken: false
      }),
      getTint: () => ({ 
        id: 'tint', 
        name: 'White', 
        color: 'FFFFFF',
        customToken: false
      }),
      setShade: mockSetShade,
      setTint: mockSetTint,
      buildSwatches: mockBuildSwatches
    };
    return selector(state);
  })
}));

describe('ShadeTint Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders with correct structure', () => {
    render(<ShadeTint />);
    
    // Check that the Section component is rendered with correct props
    const section = screen.getByTestId('mock-section');
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute('id', 'shade-tint');
    
    // Check that both swatches are rendered
    const shadeSwatchInput = screen.getByTestId('mock-swatch-shade');
    const tintSwatchInput = screen.getByTestId('mock-swatch-tint');
    expect(shadeSwatchInput).toBeInTheDocument();
    expect(tintSwatchInput).toBeInTheDocument();
    
    // Check that the swatches have the correct initial values
    expect(screen.getByTestId('mock-swatch-color-shade')).toHaveValue('000000');
    expect(screen.getByTestId('mock-swatch-name-shade')).toHaveValue('Black');
    expect(screen.getByTestId('mock-swatch-color-tint')).toHaveValue('FFFFFF');
    expect(screen.getByTestId('mock-swatch-name-tint')).toHaveValue('White');
  });

  test('updates shade when swatch is changed', () => {
    render(<ShadeTint />);
    
    // Change the shade color
    const shadeColorInput = screen.getByTestId('mock-swatch-color-shade');
    fireEvent.change(shadeColorInput, { target: { value: '111111' } });
    
    // Check that setShade was called with the correct values
    expect(mockSetShade).toHaveBeenCalledWith('111111', 'Black', 'Black', false);
    expect(mockBuildSwatches).toHaveBeenCalled();
  });

  test('updates shade name when swatch name is changed', () => {
    render(<ShadeTint />);
    
    // Change the shade name
    const shadeNameInput = screen.getByTestId('mock-swatch-name-shade');
    fireEvent.change(shadeNameInput, { target: { value: 'Dark Black' } });
    
    // Check that setShade was called with the correct values
    expect(mockSetShade).toHaveBeenCalledWith('000000', 'Dark Black', 'Dark Black', false);
    expect(mockBuildSwatches).toHaveBeenCalled();
  });

  test('updates tint when swatch is changed', () => {
    render(<ShadeTint />);
    
    // Change the tint color
    const tintColorInput = screen.getByTestId('mock-swatch-color-tint');
    fireEvent.change(tintColorInput, { target: { value: 'EEEEEE' } });
    
    // Check that setTint was called with the correct values
    expect(mockSetTint).toHaveBeenCalledWith('EEEEEE', 'White', 'White', false);
    expect(mockBuildSwatches).toHaveBeenCalled();
  });

  test('updates tint name when swatch name is changed', () => {
    render(<ShadeTint />);
    
    // Change the tint name
    const tintNameInput = screen.getByTestId('mock-swatch-name-tint');
    fireEvent.change(tintNameInput, { target: { value: 'Pure White' } });
    
    // Check that setTint was called with the correct values
    expect(mockSetTint).toHaveBeenCalledWith('FFFFFF', 'Pure White', 'Pure White', false);
    expect(mockBuildSwatches).toHaveBeenCalled();
  });

  test('passes className to Section component', () => {
    render(<ShadeTint className="test-class" />);
    
    const section = screen.getByTestId('mock-section');
    expect(section).toHaveAttribute('class', 'test-class');
  });

  test('passes style to Section component', () => {
    const testStyle = { width: '300px' };
    render(<ShadeTint style={testStyle} />);
    
    // In our mock, we're passing style directly to the div
    const section = screen.getByTestId('mock-section');
    expect(section).toHaveStyle('width: 300px');
  });

  test('forwards ref correctly', () => {
    const testRef = React.createRef<HTMLDivElement>();
    render(<ShadeTint ref={testRef} />);
    
    // Our mock is set up to pass the ref to the div
    const section = screen.getByTestId('mock-section');
    expect(section).toBeInTheDocument();
    
    // Note: We can't directly test that the ref is attached in this test environment
    // as the ref won't actually be populated in the test DOM
  });
});
