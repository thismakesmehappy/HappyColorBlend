import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import SwatchesOutput from './SwatchesOutput';

// Mock the SwatchGroupSwatches component
jest.mock('../SwatchesOutput/SwatchGroupSwatches', () => {
    return function MockSwatchGroupSwatches({
                                                colorName,
                                                color,
                                                secondColor,
                                                swatches
                                            }: {
        colorName?: string;
        color?: string;
        secondColor?: string;
        swatches: Array<{ color: string; step: number }>
    }) {
        return (
            <div data-testid={`mock-swatch-group-${colorName || 'White'}`}>
                <div data-testid={`mock-swatch-group-color-${colorName || 'White'}`}>{color}</div>
                {secondColor && (
                    <div data-testid={`mock-swatch-group-second-color-${colorName || 'White'}`}>{secondColor}</div>
                )}
                <div data-testid={`mock-swatch-group-swatches-${colorName || 'White'}`}>
                    {swatches.length} swatches
                </div>
            </div>
        );
    };
});

// Mock the OutputButtons component
jest.mock('../OutputButtonsFooter/OutputButtonsFooter', () => {
    return function MockOutputButtons() {
        return <div data-testid="mock-output-buttons">Output Buttons</div>;
    };
});

// Mock the SwatchPrimitives component
jest.mock('../SwatchesOutput/SwatchPrimitives', () => {
    return function MockSwatchPrimitives() {
        return <div data-testid="mock-swatch-primitives">Swatch Primitives</div>;
    };
});

// Mock the useTokenNameStore hook
jest.mock('../../store/useTokenNameStore', () => ({
    __esModule: true,
    default: jest.fn().mockImplementation((selector) => {
        const state = {
            caseTreatment: 'lowercase',
            spaceTreatment: 'dash',
            leadingCharsCount: 0,
            separatorCharsCount: 0,
            leadingCharType: 'none',
            separatorCharType: 'none'
        };
        return selector(state);
    })
}));

// Mock the colorMethods helper
jest.mock('../../helpers/colorMethods', () => ({
    blendColor: jest.fn((shade, tint, step) => {
        // Simple mock implementation that returns a blend based on step
        if (step === 0) return shade;
        if (step === 1000) return tint;
        return `blend-${shade}-${tint}-${step}`;
    })
}));

// Mock the useSwatchStore hook
jest.mock('../../store/useSwatchStore', () => ({
    __esModule: true,
    default: jest.fn().mockImplementation((selector) => {
        const state = {
            swatches: [
                {
                    base: {id: 'color1', name: 'Red', color: 'FF0000'},
                    swatches: [
                        {color: 'FF0000', step: 500},
                        {color: 'FF3333', step: 600},
                        {color: 'FF6666', step: 700}
                    ]
                },
                {
                    base: {id: 'color2', name: 'Blue', color: '0000FF'},
                    swatches: [
                        {color: '0000FF', step: 500},
                        {color: '3333FF', step: 600},
                        {color: '6666FF', step: 700}
                    ]
                }
            ],
            primaryColors: [],
            getCombinedSteps: () => new Set([0, 250, 500, 750, 1000]),
            scaleStart: {
                id: 'scaleStart',
                name: 'Black',
                color: '000000'
            },
            scaleEnd: {
                id: 'scaleEnd',
                name: 'White',
                color: 'FFFFFF'
            },
            neutralScaleName: 'Neutral',
            colorScale: [
                {color: 'blend-000000-FFFFFF-0', step: 0},
                {color: 'blend-000000-FFFFFF-250', step: 250},
                {color: 'blend-000000-FFFFFF-500', step: 500},
                {color: 'blend-000000-FFFFFF-750', step: 750},
                {color: 'blend-000000-FFFFFF-1000', step: 1000}
            ],
            buildColorScale: () => [
                {color: 'blend-000000-FFFFFF-0', step: 0},
                {color: 'blend-000000-FFFFFF-250', step: 250},
                {color: 'blend-000000-FFFFFF-500', step: 500},
                {color: 'blend-000000-FFFFFF-750', step: 750},
                {color: 'blend-000000-FFFFFF-1000', step: 1000}
            ]
        };
        return selector(state);
    })
}));

describe('SwatchesOutput Component', () => {
    beforeEach(() => {
        // Clear console.log mock
        jest.spyOn(console, 'log').mockImplementation(() => {
        });
        jest.clearAllMocks();
    });

    test('renders with correct structure', () => {
        render(<SwatchesOutput />);

        // Check that the main div is rendered with correct id
        const outputDiv = screen.getByTestId('swatches-output');
        expect(outputDiv).toHaveAttribute('id', 'swatches-output');

        // Check that the neutral scale swatch group is rendered (using Neutral as the key from getNeutralScaleName)
        const neutralScaleGroup = screen.getByTestId('mock-swatch-group-Neutral');
        expect(neutralScaleGroup).toBeInTheDocument();

        // Check that the primary color swatch groups are rendered
        const redGroup = screen.getByTestId('mock-swatch-group-Red');
        const blueGroup = screen.getByTestId('mock-swatch-group-Blue');
        expect(redGroup).toBeInTheDocument();
        expect(blueGroup).toBeInTheDocument();

        // Check that the scale end and start colors are passed correctly
        expect(screen.getByTestId('mock-swatch-group-color-Neutral')).toHaveTextContent('000000');
        expect(screen.getByTestId('mock-swatch-group-second-color-Neutral')).toHaveTextContent('FFFFFF');

        // Check that the primary colors are passed correctly
        expect(screen.getByTestId('mock-swatch-group-color-Red')).toHaveTextContent('FF0000');
        expect(screen.getByTestId('mock-swatch-group-color-Blue')).toHaveTextContent('0000FF');
    });

    test('creates tone ramp with blended colors', () => {
        render(<SwatchesOutput />);

        // Check that the neutral scale swatch group has the correct number of swatches
        const neutralScaleSwatches = screen.getByTestId('mock-swatch-group-swatches-Neutral');
        const neutralScaleSwatche = screen.getByTestId('mock-swatch-group-swatches-Neutral');
        expect(neutralScaleSwatches).toHaveTextContent('5 swatches');

        // The color scale is now generated by the store's buildColorScale method
        // which is mocked to return pre-computed values, so we verify the component 
        // renders the correct structure rather than checking blendColor calls
        const neutralGroup = screen.getByTestId('mock-swatch-group-Neutral');
        expect(neutralGroup).toBeInTheDocument();
    });

    test('renders primary color swatches correctly', () => {
        render(<SwatchesOutput />);

        // Check that primary color swatch groups have the correct number of swatches
        const redSwatches = screen.getByTestId('mock-swatch-group-swatches-Red');
        const blueSwatches = screen.getByTestId('mock-swatch-group-swatches-Blue');
        expect(redSwatches).toHaveTextContent('3 swatches');
        expect(blueSwatches).toHaveTextContent('3 swatches');
    });

    test('passes className to main div', () => {
        render(<SwatchesOutput className="test-class" />);

        const outputDiv = screen.getByTestId('swatches-output');
        expect(outputDiv).toHaveClass('test-class');
    });

    test('passes style to main div', () => {
        const testStyle = {width: '300px'};
        render(<SwatchesOutput style={testStyle} />);

        const outputDiv = screen.getByTestId('swatches-output');
        expect(outputDiv).toHaveStyle('width: 300px');
    });
});