import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import Steps from './Steps';

// Mock the scss import
jest.mock('../scss/column-layout.scss', () => ({}));

// Mock the Badge component
jest.mock('./helpers/Badge', () => {
    return function MockBadge({
                                  children,
                                  className,
                                  iconRight,
                                  onClick,
                                  type,
                                  'data-testid': dataTestId
                              }: {
        children: React.ReactNode,
        className?: string,
        iconRight?: string,
        onClick?: () => void,
        type?: string,
        'data-testid'?: string
    }) {
        return (
            <span
                className={className}
                onClick={onClick}
                data-testid={dataTestId || `equal-step-badge-${children}`}
            >
        {children}
                {iconRight && <span data-icon={iconRight}></span>}
      </span>
        );
    };
});

// Mock the FontAwesomeIcon component
jest.mock('./helpers/FontAwesomeIcon', () => {
    return function MockFontAwesomeIcon({
                                            icon,
                                            className
                                        }: {
        icon: string,
        className?: string
    }) {
        return <span data-icon={icon} className={className}></span>;
    };
});

// Mock the child components
jest.mock('./steps/EqualSteps', () => {
    return function MockEqualSteps({className}: { className?: string }) {
        return <div data-testid="mock-equal-steps">Mock EqualSteps</div>;
    };
});

jest.mock('./steps/IncludeShadeTint', () => {
    return {
        IncludeShadeTint: function MockIncludeShadeTint({className}: { className?: string }) {
            return <div data-testid="mock-include-shade-tint">Mock IncludeShadeTint</div>;
        }
    };
});

jest.mock('./steps/PadZeros', () => {
    return {
        PadZeros: function MockPadZeros({className}: { className?: string }) {
            return <div data-testid="mock-pad-zeros">Mock PadZeros</div>;
        }
    };
});

jest.mock('./steps/CustomSteps', () => {
    return function MockCustomSteps() {
        return <div data-testid="mock-custom-steps">Mock CustomSteps</div>;
    };
});

jest.mock('./helpers/ColumnDivider', () => {
    return function MockColumnDivider() {
        return <div data-testid="mock-column-divider">Mock ColumnDivider</div>;
    };
});

// Mock the Area and Section components
jest.mock('./helpers/Area', () => {
    return function MockArea({
                                 children,
                                 id,
                                 className,
                                 ref,
                                 style,
                                 'data-testid': dataTestId
                             }: {
        children: React.ReactNode,
        id?: string,
        className?: string,
        ref?: React.Ref<HTMLDivElement>,
        style?: React.CSSProperties,
        'data-testid'?: string
    }) {
        return (
            <div
                id={id}
                className={className}
                style={style}
                data-testid={dataTestId || 'steps-area'}
            >
                {children}
            </div>
        );
    };
});

jest.mock('./helpers/Section', () => {
    return function MockSection({
                                    children,
                                    id,
                                    ref,
                                    'data-testid': dataTestId
                                }: {
        children: React.ReactNode,
        id?: string,
        ref?: React.Ref<HTMLDivElement>,
        'data-testid'?: string
    }) {
        return (
            <div
                id={id}
                data-testid={dataTestId || `${id}-section`}
            >
                {children}
            </div>
        );
    };
});

// Mock the useSwatchStore hook
jest.mock('../store/useSwatchStore', () => ({
    __esModule: true,
    default: jest.fn().mockImplementation((selector) => {
        // Mock the store state and functions
        const state = {
            steps: [0, 250, 500, 750, 1000],
            customSteps: new Set([100, 300, 700]),
            removeCustomStep: jest.fn(),
            buildSwatches: jest.fn()
        };
        return selector(state);
    })
}));

describe('Steps Component', () => {
    test('renders the component with all sections', () => {
        render(<Steps />);

        // Check that the main container is rendered
        const stepsArea = screen.getByTestId('steps-area');
        expect(stepsArea).toBeInTheDocument();

        // Check that both sections are rendered
        const inputSection = screen.getByTestId('steps-input-section');
        const labelsSection = screen.getByTestId('step-labels-section');
        expect(inputSection).toBeInTheDocument();
        expect(labelsSection).toBeInTheDocument();

        // Check that the column divider is rendered
        const columnDivider = screen.getByTestId('mock-column-divider');
        expect(columnDivider).toBeInTheDocument();
    });

    test('renders all step input components', () => {
        render(<Steps />);

        // Check that all step input components are rendered
        const equalSteps = screen.getByTestId('mock-equal-steps');
        const includeShadeTint = screen.getByTestId('mock-include-shade-tint');
        const padZeros = screen.getByTestId('mock-pad-zeros');
        const customSteps = screen.getByTestId('mock-custom-steps');

        expect(equalSteps).toBeInTheDocument();
        expect(includeShadeTint).toBeInTheDocument();
        expect(padZeros).toBeInTheDocument();
        expect(customSteps).toBeInTheDocument();
    });

    test('renders equal steps badges', () => {
        render(<Steps />);

        // Since we're using a mock for the Badge component, we need to check for the container
        // that would contain the badges rather than the badges themselves
        const equalStepsBadges = screen.getByTestId('equal-steps-badges');
        expect(equalStepsBadges).toBeInTheDocument();

        // Check that the equal steps title is rendered
        expect(equalStepsBadges).toHaveTextContent('Equal Steps:');

        // Check that the step values are rendered
        expect(screen.getByTestId('equal-step-badge-0')).toBeInTheDocument();
        expect(screen.getByTestId('equal-step-badge-250')).toBeInTheDocument();
        expect(screen.getByTestId('equal-step-badge-500')).toBeInTheDocument();
        expect(screen.getByTestId('equal-step-badge-750')).toBeInTheDocument();
        expect(screen.getByTestId('equal-step-badge-1000')).toBeInTheDocument();
    });

    test('renders custom steps badges when customSteps is not empty', () => {
        render(<Steps />);

        // Check that the custom steps badges container is rendered
        const customStepsBadges = screen.getByTestId('custom-steps-badges');
        expect(customStepsBadges).toBeInTheDocument();

        // Check that the custom steps title is rendered
        expect(customStepsBadges).toHaveTextContent('Custom Steps:');

        // Check that the custom step values are rendered
        expect(screen.getByTestId('custom-step-badge-100')).toBeInTheDocument();
        expect(screen.getByTestId('custom-step-badge-300')).toBeInTheDocument();
        expect(screen.getByTestId('custom-step-badge-700')).toBeInTheDocument();
    });
});
