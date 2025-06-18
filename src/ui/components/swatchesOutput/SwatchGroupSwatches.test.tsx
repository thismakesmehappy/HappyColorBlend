import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import SwatchGroupSwatches from './SwatchGroupSwatches';

// Mock the child components
jest.mock('./SwatchColorChip', () => {
    return function MockSwatchColorChip({color, step}: { color: string, step: number }) {
        return (
            <div data-testid="mock-swatch-color-chip" data-color={color} data-step={step}>
                Mock SwatchColorChip
            </div>
        );
    };
});

jest.mock('./ChipOutput', () => {
    return function MockChipOutput({color}: { color: string }) {
        return <span data-testid="mock-chip-output" data-color={color}>Mock ChipOutput</span>;
    };
});

describe('SwatchGroupSwatches Component', () => {
    const defaultProps = {
        colorName: 'Primary Color',
        color: 'FF5733',
        swatches: [
            {color: 'FF5733', step: 500},
            {color: 'CC4422', step: 600},
            {color: '993311', step: 700}
        ]
    };

    test('renders with primary color information', () => {
        render(<SwatchGroupSwatches {...defaultProps} />);

        // Check that the component renders
        const swatchGroup = screen.getByTestId('swatch-group');
        expect(swatchGroup).toBeInTheDocument();

        // Check that the title contains the primary color info
        const primaryColorInfo = screen.getByTestId('primary-color-info');
        expect(primaryColorInfo).toHaveTextContent('#FF5733 | primary500');

        // Check that the ChipOutput is rendered for the primary color
        const chipOutputs = screen.getAllByTestId('mock-chip-output');
        expect(chipOutputs[0]).toHaveAttribute('data-color', 'FF5733');
    });

    test('renders secondary color information when provided', () => {
        render(
            <SwatchGroupSwatches
                {...defaultProps}
                secondColorName="Secondary Color"
                secondColor="3366FF"
            />
        );

        // Check that the secondary color info is rendered
        const secondaryColorInfo = screen.getByTestId('secondary-color-info');
        expect(secondaryColorInfo).toHaveTextContent('#3366FF | secondary500');

        // Check that the ChipOutput is rendered for the secondary color
        const chipOutputs = screen.getAllByTestId('mock-chip-output');
        expect(chipOutputs[1]).toHaveAttribute('data-color', '3366FF');
    });

    test('does not render secondary color information when not provided', () => {
        render(<SwatchGroupSwatches {...defaultProps} />);

        // Check that the secondary color info is not rendered
        expect(screen.queryByTestId('secondary-color-info')).not.toBeInTheDocument();
    });

    test('renders all swatches', () => {
        render(<SwatchGroupSwatches {...defaultProps} />);

        // Check that all swatches are rendered
        const swatchChips = screen.getAllByTestId('mock-swatch-color-chip');
        expect(swatchChips).toHaveLength(3);

        // Check that the swatches have the correct colors and steps
        expect(swatchChips[0]).toHaveAttribute('data-color', 'FF5733');
        expect(swatchChips[0]).toHaveAttribute('data-step', '500');

        expect(swatchChips[1]).toHaveAttribute('data-color', 'CC4422');
        expect(swatchChips[1]).toHaveAttribute('data-step', '600');

        expect(swatchChips[2]).toHaveAttribute('data-color', '993311');
        expect(swatchChips[2]).toHaveAttribute('data-step', '700');
    });

    test('renders empty swatches array', () => {
        render(
            <SwatchGroupSwatches
                {...defaultProps}
                swatches={[]}
            />
        );

        // Check that no swatches are rendered
        const swatchesContainer = screen.getByTestId('swatches-container');
        expect(swatchesContainer).toBeInTheDocument();
        expect(screen.queryAllByTestId('mock-swatch-color-chip')).toHaveLength(0);
    });
});
