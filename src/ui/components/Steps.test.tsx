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
jest.mock('./steps/EqualStepsInput', () => {
    return function MockEqualSteps({className}: { className?: string }) {
        return <div data-testid="mock-equal-steps">Mock EqualSteps</div>;
    };
});

jest.mock('./steps/CustomStepsInput', () => {
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
    return React.forwardRef<HTMLDivElement, {
        children: React.ReactNode,
        id?: string,
        className?: string,
        style?: React.CSSProperties,
        'data-testid'?: string
    }>(function MockArea({
                             children,
                             id,
                             className,
                             style,
                             'data-testid': dataTestId
                         }, ref) {
        return (
            <div
                ref={ref}
                id={id}
                className={className}
                style={style}
                data-testid={dataTestId || 'steps-area'}
            >
                {children}
            </div>
        );
    });
});

jest.mock('./helpers/Section', () => {
    return React.forwardRef<HTMLDivElement, {
        children: React.ReactNode,
        id?: string,
        'data-testid'?: string
    }>(function MockSection({
                                children,
                                id,
                                'data-testid': dataTestId
                            }, ref) {
        return (
            <div
                ref={ref}
                id={id}
                data-testid={dataTestId || `${id}-section`}
            >
                {children}
            </div>
        );
    });
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

        // Check that the column spacer is rendered
        const columnSpacer = document.querySelector('.column-spacer');
        expect(columnSpacer).toBeInTheDocument();
    });

    test('renders all step input components', () => {
        render(<Steps />);

        // Check that all step input components are rendered
        const equalSteps = screen.getByTestId('mock-equal-steps');
        const customSteps = screen.getByTestId('mock-custom-steps');

        expect(equalSteps).toBeInTheDocument();
        expect(customSteps).toBeInTheDocument();
    });

    test('renders equal steps badges', () => {
        render(<Steps />);

        // Since we're using a mock for the Badge component, we need to check for the container
        // that would contain the badges rather than the badges themselves
        const equalStepsBadges = screen.getByTestId('step-badges');
        expect(equalStepsBadges).toBeInTheDocument();

        // Check that the equal steps title is rendered
        expect(equalStepsBadges).toHaveTextContent('Equal Steps:');

        // Check that the step values are rendered
        expect(screen.getByTestId('equal-steps-badge-0')).toBeInTheDocument();
        expect(screen.getByTestId('equal-steps-badge-250')).toBeInTheDocument();
        expect(screen.getByTestId('equal-steps-badge-500')).toBeInTheDocument();
        expect(screen.getByTestId('equal-steps-badge-750')).toBeInTheDocument();
        expect(screen.getByTestId('equal-steps-badge-1000')).toBeInTheDocument();
    });

    test('renders custom steps badges when customSteps is not empty', () => {
        render(<Steps />);

        // Check that the custom steps badges container is rendered
        const customStepsBadges = screen.getByTestId('custom-steps-section');
        expect(customStepsBadges).toBeInTheDocument();

        // Check that the custom steps title is rendered
        expect(customStepsBadges).toHaveTextContent('Custom Steps:');

        // Check that the custom step values are rendered
        expect(screen.getByTestId('custom-steps-badge-100')).toBeInTheDocument();
        expect(screen.getByTestId('custom-steps-badge-300')).toBeInTheDocument();
        expect(screen.getByTestId('custom-steps-badge-700')).toBeInTheDocument();
    });
});
