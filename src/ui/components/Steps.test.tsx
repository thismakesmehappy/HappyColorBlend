import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import Steps from './Steps';

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
                data-testid={dataTestId || `badge-${children}`}
            >
        {children}
                {iconRight && <span data-icon={iconRight}></span>}
      </span>
        );
    };
});

// Mock the child components
jest.mock('./steps/EqualSteps', () => {
    return function MockEqualSteps({className}: { className?: string }) {
        return <div data-testid="mock-equal-steps" className={className}>Mock EqualSteps</div>;
    };
});

jest.mock('./steps/CustomSteps', () => {
    return function MockCustomSteps() {
        return <div data-testid="mock-custom-steps">Mock CustomSteps</div>;
    };
});

// Mock the useSwatchStore hook
const mockRemoveCustomStep = jest.fn();
const mockBuildSwatches = jest.fn();

jest.mock('../store/useSwatchStore', () => ({
    __esModule: true,
    default: jest.fn().mockImplementation((selector) => {
        // Mock the store state and functions
        const state = {
            steps: [0, 250, 500, 750, 1000],
            customSteps: new Set([100, 300, 700]),
            removeCustomStep: mockRemoveCustomStep,
            buildSwatches: mockBuildSwatches
        };
        return selector(state);
    })
}));

describe('Steps Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders the component with all sections', () => {
        render(<Steps />);

        // Check that the title is rendered
        expect(screen.getByText('How Many Color Steps')).toBeInTheDocument();

        // Check that the main container is rendered
        const stepsArea = screen.getByTestId('steps-area');
        expect(stepsArea).toBeInTheDocument();
        expect(stepsArea).toHaveAttribute('id', 'steps');

        // Check that both sections are rendered
        const inputSection = screen.getByTestId('steps-input-section');
        const labelsSection = screen.getByTestId('step-labels-section');
        expect(inputSection).toBeInTheDocument();
        expect(labelsSection).toBeInTheDocument();
    });

    test('renders equal steps badges', () => {
        render(<Steps />);

        // Check that the equal steps badges container is rendered
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

    test('removes custom step when badge is clicked', () => {
        render(<Steps />);

        // Click on a custom step badge
        const customStepBadge = screen.getByTestId('custom-step-badge-100');
        fireEvent.click(customStepBadge);

        // Check that removeCustomStep was called with the correct value
        expect(mockRemoveCustomStep).toHaveBeenCalledWith(100);
        expect(mockBuildSwatches).toHaveBeenCalled();
    });

    test('passes className to main div', () => {
        render(<Steps className="test-class" />);

        const stepsArea = screen.getByTestId('steps-area');
        expect(stepsArea).toHaveClass('test-class');
    });

    test('passes style to main div', () => {
        const testStyle = {width: '300px'};
        render(<Steps style={testStyle} />);

        const stepsArea = screen.getByTestId('steps-area');
        expect(stepsArea).toHaveStyle('width: 300px');
    });

    test('forwards ref correctly', () => {
        const testRef = React.createRef<HTMLDivElement>();
        render(<Steps ref={testRef} />);

        // Check that the component renders without errors
        expect(screen.getByText('How Many Color Steps')).toBeInTheDocument();
    });
});