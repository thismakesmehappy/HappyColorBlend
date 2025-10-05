import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import Separator from './Separator';


// Mock the NumberToggle component
jest.mock('../helpers/NumberToggle', () => {
    return function MockNumberToggle({
                                         decreaseFunction,
                                         increaseFunction,
                                         value
                                     }: {
        decreaseFunction: () => void;
        increaseFunction: () => void;
        value: number;
        minValue?: number;
    }) {
        return (
            <div data-testid="mock-number-toggle">
                <button data-testid="decrease-button" onClick={decreaseFunction}>-</button>
                <span data-testid="value">{value}</span>
                <button data-testid="increase-button" onClick={increaseFunction}>+</button>
            </div>
        );
    };
});

// Mock the Toggle component
jest.mock('../helpers/Toggle', () => {
    return function MockToggle({
                                   value,
                                   onChange,
                                   className
                               }: {
        value: boolean;
        onChange: (value: boolean) => void;
        className?: string;
    }) {
        return (
            <div data-testid="mock-toggle" className={className}>
                <button
                    data-testid="toggle-button"
                    onClick={() => onChange(!value)}
                >
                    {value ? 'ON' : 'OFF'}
                </button>
            </div>
        );
    };
});

// Mock the useTokenNameStore hook
jest.mock('../../store/useTokenNameStore', () => ({
    __esModule: true,
    default: jest.fn().mockImplementation((selector: any) => {
        const state = {
            separatorCharsCount: 0,
            separatorCharType: 'dash',
            appendSeparatorToPrimitive: false,
            incrementSeparatorChars: jest.fn(),
            decrementSeparatorChars: jest.fn(),
            setSeparatorCharType: jest.fn(),
            toggleAppendSeparatorToPrimitive: jest.fn()
        };
        return selector(state);
    })
}));

describe('Separator Component', () => {
    let mockIncrementSeparatorChars: jest.Mock;
    let mockDecrementSeparatorChars: jest.Mock;
    let mockSetSeparatorCharType: jest.Mock;
    let mockToggleAppendSeparatorToPrimitive: jest.Mock;

    beforeEach(() => {
        // Reset the mock functions before each test
        mockIncrementSeparatorChars = jest.fn();
        mockDecrementSeparatorChars = jest.fn();
        mockSetSeparatorCharType = jest.fn();
        mockToggleAppendSeparatorToPrimitive = jest.fn();

        require('../../store/useTokenNameStore').default.mockImplementation((selector: any) => {
            const state = {
                separatorCharsCount: 0,
                separatorCharType: 'dash',
                appendSeparatorToPrimitive: false,
                incrementSeparatorChars: mockIncrementSeparatorChars,
                decrementSeparatorChars: mockDecrementSeparatorChars,
                setSeparatorCharType: mockSetSeparatorCharType,
                toggleAppendSeparatorToPrimitive: mockToggleAppendSeparatorToPrimitive
            };
            return selector(state);
        });
    });

    test('renders with the correct components', () => {
        render(<Separator />);

        // Check that the NumberToggle component is rendered
        expect(screen.getByTestId('mock-number-toggle')).toBeInTheDocument();

        // Check that the radio buttons are rendered
        expect(screen.getByText('Dash (-)')).toBeInTheDocument();
        expect(screen.getByText('Under (_)')).toBeInTheDocument();

        // Check that the labels are rendered
        expect(screen.getByText('Separator Character:')).toBeInTheDocument();
        expect(screen.getByText('Append' +
            ' to primitives')).toBeInTheDocument();

        // Check that the toggle component is rendered
        expect(screen.getByTestId('mock-toggle')).toBeInTheDocument();
    });

    test('calls incrementSeparatorChars when increase button is clicked', () => {
        render(<Separator />);

        // Click the increase button
        fireEvent.click(screen.getByTestId('increase-button'));

        // Check that incrementSeparatorChars was called
        expect(mockIncrementSeparatorChars).toHaveBeenCalled();
    });

    test('calls decrementSeparatorChars when decrease button is clicked', () => {
        render(<Separator />);

        // Click the decrease button
        fireEvent.click(screen.getByTestId('decrease-button'));

        // Check that decrementSeparatorChars was called
        expect(mockDecrementSeparatorChars).toHaveBeenCalled();
    });

    test('calls setSeparatorCharType when a radio option is selected', () => {
        render(<Separator />);

        // Click on the 'underscore' option
        fireEvent.click(screen.getByRole('radio', {name: 'Under (_)'}));

        // Check that setSeparatorCharType was called with 'underscore'
        expect(mockSetSeparatorCharType).toHaveBeenCalledWith('underscore');
    });

    test('calls toggleAppendSeparatorToPrimitive when toggle button is clicked', () => {
        render(<Separator />);

        // Click the toggle button
        fireEvent.click(screen.getByTestId('toggle-button'));

        // Check that toggleAppendSeparatorToPrimitive was called
        expect(mockToggleAppendSeparatorToPrimitive).toHaveBeenCalled();
    });
});