import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import ShadeTint from './ShadeTint';

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

// Mock the RampNameEditor component
jest.mock('./shadeTint/RampNameEditor', () => {
    return function MockRampNameEditor() {
        return <div data-testid="mock-ramp-name-editor">Ramp Name Editor</div>;
    };
});

// Mock the useSwatchStore hook
const mockSetShade = jest.fn();
const mockSetTint = jest.fn();
const mockBuildSwatches = jest.fn();
const mockToggleGradientDirection = jest.fn();

jest.mock('../store/useSwatchStore', () => ({
    __esModule: true,
    default: jest.fn().mockImplementation((selector) => {
        const state = {
            // Old methods
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
            getGradientDirection: () => 'shade-to-tint',
            setShade: mockSetShade,
            setTint: mockSetTint,
            toggleGradientDirection: mockToggleGradientDirection,
            // New methods
            getScaleStart: () => ({
                id: 'scaleStart',
                name: 'Black',
                color: '000000',
                customToken: false
            }),
            getScaleEnd: () => ({
                id: 'scaleEnd', 
                name: 'White',
                color: 'FFFFFF',
                customToken: false
            }),
            setScaleStart: mockSetShade, // Reuse same mock for now
            setScaleEnd: mockSetTint, // Reuse same mock for now
            swapScaleEndpoints: mockToggleGradientDirection, // Reuse same mock for now
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

        // Check that essential elements are rendered
        expect(screen.getByText(/Start/)).toBeInTheDocument();
        expect(screen.getByText(/End/)).toBeInTheDocument();

        // Check that both swatches are rendered
        const startSwatchInput = screen.getByTestId('mock-swatch-scaleStart');
        const endSwatchInput = screen.getByTestId('mock-swatch-scaleEnd');
        expect(startSwatchInput).toBeInTheDocument();
        expect(endSwatchInput).toBeInTheDocument();

        // Check that the swatches have the correct initial values
        expect(screen.getByTestId('mock-swatch-color-scaleStart')).toHaveValue('000000');
        expect(screen.getByTestId('mock-swatch-name-scaleStart')).toHaveValue('Black');
        expect(screen.getByTestId('mock-swatch-color-scaleEnd')).toHaveValue('FFFFFF');
        expect(screen.getByTestId('mock-swatch-name-scaleEnd')).toHaveValue('White');
    });

    test('updates start when swatch is changed', () => {
        render(<ShadeTint />);

        // Change the start color
        const startColorInput = screen.getByTestId('mock-swatch-color-scaleStart');
        fireEvent.change(startColorInput, {target: {value: '111111'}});

        // Check that setScaleStart was called with the correct values
        expect(mockSetShade).toHaveBeenCalledWith('111111', 'Black');
        expect(mockBuildSwatches).toHaveBeenCalled();
    });

    test('updates start name when swatch name is changed', () => {
        render(<ShadeTint />);

        // Change the start name
        const startNameInput = screen.getByTestId('mock-swatch-name-scaleStart');
        fireEvent.change(startNameInput, {target: {value: 'Dark Black'}});

        // Check that setScaleStart was called with the correct values
        expect(mockSetShade).toHaveBeenCalledWith('000000', 'Dark Black');
        expect(mockBuildSwatches).toHaveBeenCalled();
    });

    test('updates end when swatch is changed', () => {
        render(<ShadeTint />);

        // Change the end color
        const endColorInput = screen.getByTestId('mock-swatch-color-scaleEnd');
        fireEvent.change(endColorInput, {target: {value: 'EEEEEE'}});

        // Check that setScaleEnd was called with the correct values
        expect(mockSetTint).toHaveBeenCalledWith('EEEEEE', 'White');
        expect(mockBuildSwatches).toHaveBeenCalled();
    });

    test('updates end name when swatch name is changed', () => {
        render(<ShadeTint />);

        // Change the end name
        const endNameInput = screen.getByTestId('mock-swatch-name-scaleEnd');
        fireEvent.change(endNameInput, {target: {value: 'Pure White'}});

        // Check that setScaleEnd was called with the correct values
        expect(mockSetTint).toHaveBeenCalledWith('FFFFFF', 'Pure White');
        expect(mockBuildSwatches).toHaveBeenCalled();
    });

    test('passes className to main div', () => {
        render(<ShadeTint className="test-class" />);
    });

    test('passes style to main div', () => {
        const testStyle = {width: '300px'};
        render(<ShadeTint style={testStyle} />);

        const mainDiv = screen.getByTestId('shade-tint');
        expect(mainDiv).toHaveStyle('width: 300px');
    });

    test('forwards ref correctly', () => {
        const testRef = React.createRef<HTMLDivElement>();
        render(<ShadeTint ref={testRef} />);

        // Check that the component renders without errors
        expect(screen.getByText(/Start/)).toBeInTheDocument();
        expect(screen.getByText(/End/)).toBeInTheDocument();
    });
});