import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import RightColumn from './RightColumn';

// Mock the Area component
jest.mock('./helpers/Area', () => {
    return function MockArea({
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
                data-testid="mock-area"
                id={id}
                className={className}
                style={style}
            >
                {children}
            </div>
        );
    };
});

// Mock the Steps component
jest.mock('./Steps', () => {
    return React.forwardRef(function MockSteps(
        {equalStepsRef}: { equalStepsRef?: React.RefObject<HTMLDivElement> },
        ref: React.ForwardedRef<HTMLDivElement>
    ) {
        return (
            <div
                data-testid="mock-steps"
                ref={ref as React.RefObject<HTMLDivElement>}
            >
                Mock Steps
                {equalStepsRef && <div data-testid="mock-equal-steps-ref">Equal Steps Ref</div>}
            </div>
        );
    });
});

// Mock the SwatchesOutput component
jest.mock('./SwatchesOutput', () => {
    return function MockSwatchesOutput() {
        return <div data-testid="mock-swatches-output">Mock SwatchesOutput</div>;
    };
});

// Mock the RowDivider component
jest.mock('./helpers/RowDivider', () => {
    return function MockRowDivider() {
        return <div data-testid="mock-row-divider">Mock RowDivider</div>;
    };
});

describe('RightColumn Component', () => {
    test('renders with correct structure', () => {
        render(<RightColumn />);

        // Check that the Area component is rendered with correct props
        const area = screen.getByTestId('mock-area');
        expect(area).toBeInTheDocument();
        expect(area).toHaveAttribute('id', 'right-column');

        // Check that all child components are rendered in the correct order
        const children = area.childNodes;
        expect(children[0]).toHaveAttribute('data-testid', 'mock-steps');
        expect(children[1]).toHaveAttribute('data-testid', 'mock-row-divider');
        expect(children[2]).toHaveAttribute('data-testid', 'mock-swatches-output');
    });

    test('passes className to Area component', () => {
        render(<RightColumn className="test-class" />);

        const area = screen.getByTestId('mock-area');
        expect(area).toHaveAttribute('class', 'test-class');
    });

    test('passes style to Area component', () => {
        const testStyle = {width: '300px'};
        render(<RightColumn style={testStyle} />);

        // In our mock, we're passing style directly to the div
        const area = screen.getByTestId('mock-area');
        expect(area).toHaveStyle('width: 300px');
    });
});
