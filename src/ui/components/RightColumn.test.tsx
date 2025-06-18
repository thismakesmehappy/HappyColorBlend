import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import RightColumn from './RightColumn';

// Mock the Area component
jest.mock('./helpers/Area', () => {
    return function MockArea({
                                 id,
                                 className,
                                 children
                             }: {
        id?: string;
        className?: string;
        children?: React.ReactNode
    }) {
        return (
            <div
                data-testid="mock-area"
                id={id}
                className={className}
            >
                {children}
            </div>
        );
    };
});

// Mock the Steps component
jest.mock('./Steps', () => {
    return function MockSteps() {
        return <div data-testid="mock-steps">Mock Steps</div>;
    };
});

// Mock the Settings component
jest.mock('./Settings', () => {
    return function MockSettings() {
        return <div data-testid="mock-settings">Mock Settings</div>;
    };
});

// Mock the SwatchesOutput component
jest.mock('./SwatchesOutput', () => {
    return function MockSwatchesOutput({ className }: { className?: string }) {
        return <div data-testid="mock-swatches-output" className={className}>Mock SwatchesOutput</div>;
    };
});

// Mock the RowDivider component
jest.mock('./helpers/RowDivider', () => {
    return function MockRowDivider() {
        return <div data-testid="mock-row-divider">Mock RowDivider</div>;
    };
});

// Mock the SCSS imports
jest.mock('../../scss/column-layout.scss', () => ({}), { virtual: true });

describe('RightColumn Component', () => {
    test('renders with correct structure', () => {
        render(<RightColumn />);

        // Check that the Area component is rendered with correct props
        const area = screen.getByTestId('mock-area');
        expect(area).toBeInTheDocument();
        expect(area).toHaveAttribute('id', 'right-column');

        // Check that the Steps component is rendered
        expect(screen.getByTestId('mock-steps')).toBeInTheDocument();
        
        // Check that the Settings component is rendered
        expect(screen.getByTestId('mock-settings')).toBeInTheDocument();
        
        // Check that the SwatchesOutput component is rendered
        expect(screen.getByTestId('mock-swatches-output')).toBeInTheDocument();
        
        // Check that the RowDivider components are rendered
        const rowDividers = screen.getAllByTestId('mock-row-divider');
        expect(rowDividers).toHaveLength(2);
        
        // Check that the buttons are rendered
        expect(screen.getByText('Add Variables')).toBeInTheDocument();
        expect(screen.getByText('Add Styles')).toBeInTheDocument();
        expect(screen.getByText('Create Swatches in Page')).toBeInTheDocument();
    });
});
