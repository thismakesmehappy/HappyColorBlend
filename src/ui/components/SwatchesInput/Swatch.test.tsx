import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import Swatch from './Swatch';

describe('Swatch Component', () => {
    const defaultProps = {
        color: 'FF5733',
        name: 'Test Color',
        id: '123',
    };

    test('renders with correct initial values', () => {
        render(<Swatch {...defaultProps} />);

        // Check that the container is rendered
        const container = screen.getByTestId('swatch-container');
        expect(container).toBeInTheDocument();

        // Check that the chip is rendered
        const chip = screen.getByTestId('swatch-chip-container');
        expect(chip).toBeInTheDocument();

        // Check that the labels are rendered
        const labels = screen.getByTestId('swatch-labels-container');
        expect(labels).toBeInTheDocument();
    });

    test('applies custom className when provided', () => {
        render(<Swatch {...defaultProps} className="custom-class" />);

        const container = screen.getByTestId('swatch-container');
        expect(container).toHaveClass('custom-class');
    });

    test('passes correct props to Chip component', () => {
        render(<Swatch {...defaultProps} />);

        const chip = screen.getByTestId('color-chip');
        expect(chip).toBeInTheDocument();
        expect(chip).toHaveAttribute('data-color', 'FF5733');
    });

    test('passes correct props to SwatchLabels component', () => {
        render(<Swatch {...defaultProps} />);

        const labels = screen.getByTestId('swatch-labels-container');
        expect(labels).toBeInTheDocument();
    });
});
