import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import SwatchesOutput from './SwatchesOutput';

// Mock the scss import
jest.mock('../scss/column-layout.scss', () => ({}), { virtual: true });

// Mock the Section component
jest.mock('./helpers/Section', () => {
    return function MockSection({
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
                data-testid="mock-section"
                id={id}
                className={className}
                style={style}
            >
                {children}
            </div>
        );
    };
});

// Mock the SwatchGroupSwatches component
jest.mock('./swatchesOutput/SwatchGroupSwatches', () => {
    return function MockSwatchGroupSwatches({
                                                colorName,
                                                tokenName,
                                                color,
                                                secondColorName,
                                                secondTokenName,
                                                secondColor,
                                                swatches
                                            }: {
        colorName?: string;
        tokenName?: string;
        color?: string;
        secondColorName?: string;
        secondTokenName?: string;
        secondColor?: string;
        swatches: Array<{ color: string; step: number }>
    }) {
        return (
            <div data-testid={`mock-swatch-group-${colorName || 'White'}`}>
                <div data-testid={`mock-swatch-group-color-${colorName || 'White'}`}>{color}</div>
                {secondColor && (
                    <div data-testid={`mock-swatch-group-color-${secondColorName || 'Black'}`}>{secondColor}</div>
                )}
                <div data-testid={`mock-swatch-group-swatches-${colorName || 'White'}`}>
                    {swatches.length} swatches
                </div>
            </div>
        );
    };
});

// Mock the colorMethods helper
jest.mock('../helpers/colorMethods', () => ({
    blendColor: jest.fn((shade, tint, step) => {
        // Simple mock implementation that returns a blend based on step
        if (step === 0) return shade;
        if (step === 1000) return tint;
        return `blend-${shade}-${tint}-${step}`;
    })
}));

// Mock the useSwatchStore hook
jest.mock('../store/useSwatchStore', () => ({
    __esModule: true,
    default: jest.fn().mockImplementation((selector) => {
        const state = {
            getSwatches: () => [
                {
                    base: {id: 'color1', name: 'Red', color: 'FF0000', tokenName: 'red'},
                    swatches: [
                        {color: 'FF0000', step: 500},
                        {color: 'FF3333', step: 600},
                        {color: 'FF6666', step: 700}
                    ]
                },
                {
                    base: {id: 'color2', name: 'Blue', color: '0000FF', tokenName: 'blue'},
                    swatches: [
                        {color: '0000FF', step: 500},
                        {color: '3333FF', step: 600},
                        {color: '6666FF', step: 700}
                    ]
                }
            ],
            getTint: () => ({
                id: 'tint',
                name: 'White',
                color: 'FFFFFF',
                tokenName: 'white'
            }),
            getShade: () => ({
                id: 'shade',
                name: 'Black',
                color: '000000',
                tokenName: 'black'
            }),
            getCombinedSteps: () => new Set([0, 250, 500, 750, 1000]),
            getShadeTintRampName: () => 'Gray'
        };
        return selector(state);
    })
}));

// Mock the RightColumn buttons
jest.mock('./RightColumn', () => {
    return {
        __esModule: true,
        default: () => (
            <div>
                <button>Add Variables</button>
                <button>Add Styles</button>
                <button>Create Swatches in Page</button>
            </div>
        )
    };
});

describe('SwatchesOutput Component', () => {
    beforeEach(() => {
        // Clear console.log mock
        jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    test('renders with correct structure', () => {
        render(<SwatchesOutput />);

        // Check that the Section component is rendered with correct props
        const section = screen.getByTestId('mock-section');
        expect(section).toBeInTheDocument();

        // Check that the tint-shade swatch group is rendered (now using Gray as the key from getShadeTintRampName)
        const tintShadeGroup = screen.getByTestId('mock-swatch-group-Gray');
        expect(tintShadeGroup).toBeInTheDocument();

        // Check that the primary color swatch groups are rendered
        const redGroup = screen.getByTestId('mock-swatch-group-Red');
        const blueGroup = screen.getByTestId('mock-swatch-group-Blue');
        expect(redGroup).toBeInTheDocument();
        expect(blueGroup).toBeInTheDocument();

        // Check that the tint and shade colors are passed correctly
        expect(screen.getByTestId('mock-swatch-group-color-Gray')).toHaveTextContent('FFFFFF');
        expect(screen.getByTestId('mock-swatch-group-color-Black')).toHaveTextContent('000000');

        // Check that the primary colors are passed correctly
        expect(screen.getByTestId('mock-swatch-group-color-Red')).toHaveTextContent('FF0000');
        expect(screen.getByTestId('mock-swatch-group-color-Blue')).toHaveTextContent('0000FF');
    });

    test('creates tone ramp with blended colors', () => {
        render(<SwatchesOutput />);

        // Check that the tint-shade swatch group has the correct number of swatches (now using Gray as the key from getShadeTintRampName)
        const tintShadeSwatches = screen.getByTestId('mock-swatch-group-swatches-Gray');
        expect(tintShadeSwatches).toHaveTextContent('5 swatches');

        // Check that the blendColor function was called with the correct parameters
        const {blendColor} = require('../helpers/colorMethods');
        expect(blendColor).toHaveBeenCalledWith('000000', 'FFFFFF', 0);
        expect(blendColor).toHaveBeenCalledWith('000000', 'FFFFFF', 250);
        expect(blendColor).toHaveBeenCalledWith('000000', 'FFFFFF', 500);
        expect(blendColor).toHaveBeenCalledWith('000000', 'FFFFFF', 750);
        expect(blendColor).toHaveBeenCalledWith('000000', 'FFFFFF', 1000);
    });

    test('passes className to Section component', () => {
        render(<SwatchesOutput className="test-class" />);

        const section = screen.getByTestId('mock-section');
        expect(section).toHaveAttribute('class', 'test-class');
    });

    test('passes style to Section component', () => {
        const testStyle = {width: '300px'};
        render(<SwatchesOutput style={testStyle} />);

        // In our mock, we're passing style directly to the div
        const section = screen.getByTestId('mock-section');
        expect(section).toHaveStyle('width: 300px');
    });
});
