import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomSteps from './CustomSteps';
import {
    INVALID_CUSTOM_STEP_NON_NUMERIC,
    INVALID_CUSTOM_STEP_OUT_OF_RANGE,
    INVALID_CUSTOM_STEP_RESERVED,
    INVALID_CUSTOM_STEP_DUPLICATED
} from '../../../constants/uiConstants';

// Mock createPortal to render in place instead of document.body
jest.mock('react-dom', () => ({
    ...jest.requireActual('react-dom'),
    createPortal: (node: React.ReactNode) => node,
}));

// Mock the useSwatchStore hook
const mockAddCustomStep = jest.fn();
const mockBuildSwatches = jest.fn();
let mockCustomSteps = new Set();

jest.mock('../../store/useSwatchStore', () => ({
    __esModule: true,
    default: jest.fn().mockImplementation((selector) => {
        // Mock the store state and functions
        const state = {
            customSteps: mockCustomSteps,
            addCustomStep: mockAddCustomStep,
            buildSwatches: mockBuildSwatches,
            buildColorScale: jest.fn()
        };
        return selector(state);
    })
}));

// Mock the FontAwesomeIcon component
jest.mock('../helpers/FontAwesomeIcon', () => {
    return function MockFontAwesomeIcon({icon}: { icon: string }) {
        return <span data-testid={`icon-${icon}`}></span>;
    };
});

// Mock the Toast component
jest.mock('../helpers/Toast', () => {
    return function MockToast({
                                  message,
                                  isVisible,
                                  onClose
                              }: {
        message: string,
        isVisible: boolean,
        onClose: () => void
    }) {
        return isVisible ? (
            <div data-testid="toast" onClick={onClose}>
                {message}
            </div>
        ) : null;
    };
});

describe('CustomSteps Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockCustomSteps = new Set();
    });

    test('renders with the correct label and input', () => {
        render(<CustomSteps />);

        // Check that the component renders
        const customSteps = screen.getByTestId('custom-steps');
        expect(customSteps).toBeInTheDocument();

        // Check that the input is displayed
        const input = screen.getByTestId('custom-step-input');
        expect(input).toBeInTheDocument();
        expect(input).toHaveValue('');
    });

    test('updates input value when typing', () => {
        render(<CustomSteps />);

        // Find the input and type in it
        const input = screen.getByTestId('custom-step-input');
        fireEvent.change(input, {target: {value: '123'}});

        // Check that the input value is updated
        expect(input).toHaveValue('123');
    });

    test('adds valid custom step when add button is clicked', () => {
        render(<CustomSteps />);

        // Find the input and type a valid value
        const input = screen.getByTestId('custom-step-input');
        fireEvent.change(input, {target: {value: '123'}});

        // Find and click the add button
        const addButton = screen.getByTestId('add-custom-step-button');
        fireEvent.click(addButton);

        // Check that the functions were called with the correct value
        expect(mockAddCustomStep).toHaveBeenCalledWith(123);
        expect(mockBuildSwatches).toHaveBeenCalledTimes(1);

        // Check that the input is cleared
        expect(input).toHaveValue('');
    });

    test('ignores non-numeric input', () => {
        render(<CustomSteps />);

        const input = screen.getByTestId('custom-step-input');

        // Try to enter non-numeric characters
        fireEvent.change(input, {target: {value: 'abc'}});

        // Input value should remain empty
        expect(input).toHaveValue('');
    });

    test('ignores zero input', () => {
        render(<CustomSteps />);

        const input = screen.getByTestId('custom-step-input');

        // Try to enter non-numeric characters
        fireEvent.change(input, {target: {value: '0'}});

        // Input value should remain empty
        expect(input).toHaveValue('');
    });

    test('ignores input larger than 1000', () => {
        render(<CustomSteps />);

        const input = screen.getByTestId('custom-step-input');

        // Try to enter non-numeric characters
        fireEvent.change(input, {target: {value: '9'}});
        fireEvent.change(input, {target: {value: '99'}});
        fireEvent.change(input, {target: {value: '999'}});
        fireEvent.change(input, {target: {value: '9999'}});

        // Input value should remain empty
        expect(input).toHaveValue('999');
    });

    test('disables add button for out of range input', () => {
        render(<CustomSteps />);

        // Find the input and type a value that's out of range
        const input = screen.getByTestId('custom-step-input');
        fireEvent.change(input, {target: {value: '1001'}});

        // Check that the add button is disabled
        const addButton = screen.getByTestId('add-custom-step-button');
        expect(addButton).toBeDisabled();
    });

    test('shows error toast for duplicate values', async () => {
        // Set up mock with duplicate value
        mockCustomSteps = new Set([123]);

        render(<CustomSteps />);

        // Find the input and type a value that's already in the set
        const input = screen.getByTestId('custom-step-input');
        fireEvent.change(input, {target: {value: '123'}});

        // Find and click the add button
        const addButton = screen.getByTestId('add-custom-step-button');
        fireEvent.click(addButton);

        // Check that the toast is displayed with the correct message
        await waitFor(() => {
            const toast = screen.getByTestId('toast');
            expect(toast).toBeInTheDocument();
            expect(toast).toHaveTextContent(INVALID_CUSTOM_STEP_DUPLICATED);
        });
    });

    test('adds custom step when Enter key is pressed', () => {
        render(<CustomSteps />);

        // Find the input and type a valid value
        const input = screen.getByTestId('custom-step-input');
        fireEvent.change(input, {target: {value: '123'}});

        // Press Enter key
        fireEvent.keyDown(input, {key: 'Enter', code: 'Enter'});

        // Check that the functions were called with the correct value
        expect(mockAddCustomStep).toHaveBeenCalledWith(123);
        expect(mockBuildSwatches).toHaveBeenCalledTimes(1);

        // Check that the input is cleared
        expect(input).toHaveValue('');
    });

    test('clears input when Escape key is pressed', () => {
        render(<CustomSteps />);

        // Find the input and type a value
        const input = screen.getByTestId('custom-step-input');
        fireEvent.change(input, {target: {value: '123'}});

        // Press Escape key
        fireEvent.keyDown(input, {key: 'Escape', code: 'Escape'});

        // Check that the input is cleared
        expect(input).toHaveValue('');

        // Check that the functions were not called
        expect(mockAddCustomStep).not.toHaveBeenCalled();
        expect(mockBuildSwatches).not.toHaveBeenCalled();
    });

    test('shows error toast when Enter is pressed on invalid value', async () => {
        render(<CustomSteps />);

        // Find the input and type an invalid value
        const input = screen.getByTestId('custom-step-input');
        fireEvent.change(input, {target: {value: 'abc'}});

        // Press Enter key
        fireEvent.keyDown(input, {key: 'Enter', code: 'Enter'});

        // Check that the toast is displayed with the correct message
        await waitFor(() => {
            const toast = screen.getByTestId('toast');
            expect(toast).toBeInTheDocument();
            expect(toast).toHaveTextContent(INVALID_CUSTOM_STEP_NON_NUMERIC);
        });

        // Check that the functions were not called
        expect(mockAddCustomStep).not.toHaveBeenCalled();
        expect(mockBuildSwatches).not.toHaveBeenCalled();
    });
});
