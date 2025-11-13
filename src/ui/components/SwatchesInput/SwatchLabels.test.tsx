import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import SwatchLabels from './SwatchLabels';

describe('SwatchLabels Component', () => {
    const defaultProps = {
        swatchColor: 'FF5733',
        swatchName: 'Test Color'
    };

    test('renders display mode correctly', () => {
        render(<SwatchLabels {...defaultProps} />);

        // Check that the display container is rendered
        const displayContainer = screen.getByTestId('swatch-labels-display');
        expect(displayContainer).toBeInTheDocument();

        // Check that the name and color are displayed correctly
        const nameDisplay = screen.getByTestId('swatch-name-display');
        const colorDisplay = screen.getByTestId('swatch-color-display');

        expect(nameDisplay).toHaveTextContent('Test Color');
        expect(colorDisplay).toHaveTextContent('#FF5733');
    });

    test('applies custom className when provided', () => {
        render(<SwatchLabels {...defaultProps} className="custom-class" />);

        const displayContainer = screen.getByTestId('swatch-labels-display');
        expect(displayContainer).toHaveClass('vstack', 'custom-class');
    });

    test('applies correct CSS classes', () => {
        render(<SwatchLabels {...defaultProps} />);

        const displayContainer = screen.getByTestId('swatch-labels-display');
        const nameDisplay = screen.getByTestId('swatch-name-display');
        const colorDisplay = screen.getByTestId('swatch-color-display');

        expect(displayContainer).toHaveClass('vstack');
        expect(nameDisplay).toHaveClass('container-fluid', 'fw-bold', 'mb-0', 'selectable-text');
        expect(colorDisplay).toHaveClass('container-fluid', 'selectable-text');
    });

    test('formats color with hash prefix', () => {
        render(<SwatchLabels {...defaultProps} swatchColor="00FF00" />);

        const colorDisplay = screen.getByTestId('swatch-color-display');
        expect(colorDisplay).toHaveTextContent('#00FF00');
    });

    test('handles different color and name values', () => {
        render(<SwatchLabels swatchColor="123ABC" swatchName="Custom Name" />);

        const nameDisplay = screen.getByTestId('swatch-name-display');
        const colorDisplay = screen.getByTestId('swatch-color-display');

        expect(nameDisplay).toHaveTextContent('Custom Name');
        expect(colorDisplay).toHaveTextContent('#123ABC');
    });
});
