import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import AllStepBadges from './AllStepBadges';

// Prevent font‑awesome SVG rendering issues in tests.
jest.mock('../helpers/FontAwesomeIcon', () => {
    return function MockFontAwesomeIcon({icon}: { icon: string }) {
        return <span data-testid={`icon-${icon}`} />;
    };
});

// Mock the useSwatchStore hook
const mockRemoveCustomStep = jest.fn();
const mockBuildSwatches = jest.fn();
const mockSteps = [100, 500, 800];
// `mockCustomSteps` will be reassigned in individual tests.
let mockCustomSteps: Set<number> = new Set([150, 950]);

jest.mock('../../store/useSwatchStore', () => ({
    __esModule: true,
    default: jest.fn().mockImplementation((selector: any) =>
        selector({
            steps: mockSteps,
            customSteps: mockCustomSteps,
            removeCustomStep: mockRemoveCustomStep,
            buildSwatches: mockBuildSwatches,
        }),
    ),
}));

describe('AllStepBadges', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });


    test('renders with correct structure', async () => {
        render(<AllStepBadges />);
        // Equal steps
        const equalStepsSection = screen.getByTestId('equal-steps-section');
        expect(equalStepsSection).toBeInTheDocument();

        const equalStepsItems = await screen.findAllByTestId(/^equal-steps-badge/);
        expect(equalStepsItems).toHaveLength(3);

        // Custom steps
        const customStepsSection = screen.getByTestId('custom-steps-section');
        expect(customStepsSection).toBeInTheDocument();

        const customStepItems = await screen.findAllByTestId(/^custom-steps-badge/);
        expect(customStepItems).toHaveLength(2);
    });

    test('handles click to remove custom step', async () => {
        render(<AllStepBadges />);

        // Custom steps calls the functions
        const equalStep = screen.getByTestId('equal-steps-badge-500');
        fireEvent.click(equalStep);
        expect(mockRemoveCustomStep).toHaveBeenCalledTimes(0);
        expect(mockBuildSwatches).toHaveBeenCalledTimes(0);

        // Custom steps calls the functions
        const customStep = screen.getByTestId('custom-steps-badge-150');
        fireEvent.click(customStep);
        expect(mockRemoveCustomStep).toHaveBeenCalledWith(150);
        expect(mockBuildSwatches).toHaveBeenCalledTimes(1);
    });

    test('does not render custom steps when set is empty', async () => {
        mockCustomSteps.clear();

        render(<AllStepBadges />);
        // Equal steps
        const equalStepsSection = screen.getByTestId('equal-steps-section');
        expect(equalStepsSection).toBeInTheDocument();

        const equalStepsItems = await screen.findAllByTestId(/^equal-steps-badge/);
        expect(equalStepsItems).toHaveLength(3);

        // Custom steps
        const customStepsSection = screen.queryByTestId('custom-steps-section');
        expect(customStepsSection).not.toBeInTheDocument();
    });


});