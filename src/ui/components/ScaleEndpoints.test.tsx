import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import ScaleEndpoints from './ScaleEndpoints';

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
jest.mock('./scaleEndpoints/RampNameEditor', () => {
    return function MockRampNameEditor() {
        return <div data-testid="mock-ramp-name-editor">Ramp Name Editor</div>;
    };
});

// Mock the useSwatchStore hook
const mockSetScaleStart = jest.fn();
const mockSetScaleEnd = jest.fn();
const mockBuildSwatches = jest.fn();
const mockSwapScaleEndpoints = jest.fn();

jest.mock('../store/useSwatchStore', () => ({
    __esModule: true,
    default: jest.fn().mockImplementation((selector) => {
        const state = {
            getScaleStart: () => ({
                id: 'scaleStart',
                name: 'Black',
                color: '000000'
            }),
            getScaleEnd: () => ({
                id: 'scaleEnd', 
                name: 'White',
                color: 'FFFFFF'
            }),
            setScaleStart: mockSetScaleStart,
            setScaleEnd: mockSetScaleEnd,
            buildSwatches: mockBuildSwatches,
            swapScaleEndpoints: mockSwapScaleEndpoints
        };
        return selector(state);
    })
}));

describe('ScaleEndpoints Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders with correct structure', () => {
        render(<ScaleEndpoints />);

        // Check that the main container is rendered
        const container = screen.getByTestId('scale-endpoints');
        expect(container).toBeInTheDocument();

        // Check that both swatches are rendered
        expect(screen.getByTestId('mock-swatch-scaleStart')).toBeInTheDocument();
        expect(screen.getByTestId('mock-swatch-scaleEnd')).toBeInTheDocument();

        // Check that labels are displayed (they contain additional help icon)
        expect(screen.getByText('Start', {exact: false})).toBeInTheDocument();
        expect(screen.getByText('End', {exact: false})).toBeInTheDocument();
        
        // Check that swap button exists
        expect(screen.getByTestId('swap-scale-button')).toBeInTheDocument();
    });

    test('displays correct initial colors and names', () => {
        render(<ScaleEndpoints />);

        const scaleStartColorInput = screen.getByTestId('mock-swatch-color-scaleStart');
        const scaleStartNameInput = screen.getByTestId('mock-swatch-name-scaleStart');
        const scaleEndColorInput = screen.getByTestId('mock-swatch-color-scaleEnd');
        const scaleEndNameInput = screen.getByTestId('mock-swatch-name-scaleEnd');

        expect(scaleStartColorInput).toHaveValue('000000');
        expect(scaleStartNameInput).toHaveValue('Black');
        expect(scaleEndColorInput).toHaveValue('FFFFFF');
        expect(scaleEndNameInput).toHaveValue('White');
    });

    test('calls setScaleStart when start color is updated', () => {
        render(<ScaleEndpoints />);

        const scaleStartColorInput = screen.getByTestId('mock-swatch-color-scaleStart');
        fireEvent.change(scaleStartColorInput, {target: {value: 'FF0000'}});

        expect(mockSetScaleStart).toHaveBeenCalledWith('FF0000', 'Black');
        expect(mockBuildSwatches).toHaveBeenCalled();
    });

    test('calls setScaleEnd when end color is updated', () => {
        render(<ScaleEndpoints />);

        const scaleEndColorInput = screen.getByTestId('mock-swatch-color-scaleEnd');
        fireEvent.change(scaleEndColorInput, {target: {value: '00FF00'}});

        expect(mockSetScaleEnd).toHaveBeenCalledWith('00FF00', 'White');
        expect(mockBuildSwatches).toHaveBeenCalled();
    });

    test('calls swapScaleEndpoints when swap button is clicked', () => {
        render(<ScaleEndpoints />);

        const swapButton = screen.getByTestId('swap-scale-button');
        fireEvent.click(swapButton);

        expect(mockSwapScaleEndpoints).toHaveBeenCalled();
    });

    test('renders with custom className and style', () => {
        const customStyle = {backgroundColor: 'red'};
        render(<ScaleEndpoints className="custom-class" style={customStyle} />);

        const container = screen.getByTestId('scale-endpoints');
        expect(container).toHaveClass('custom-class');
        expect(container).toHaveStyle('background-color: red');
    });
});