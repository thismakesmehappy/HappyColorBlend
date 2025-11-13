import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import Leading from './Leading';


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
        value: boolean,
        onChange: () => void,
        className?: string
    }) {
        return (
            <div data-testid="mock-toggle" className={className}>
                <button
                    data-testid="toggle-button"
                    onClick={() => onChange()}
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
            leadingCharsCount: 0,
            leadingCharType: 'dash',
            incrementLeadingChars: jest.fn(),
            decrementLeadingChars: jest.fn(),
            setLeadingCharType: jest.fn()
        };
        return selector(state);
    })
}));

describe('Leading Component', () => {
    let mockIncrementLeadingChars: jest.Mock;
    let mockDecrementLeadingChars: jest.Mock;
    let mockSetLeadingCharType: jest.Mock;
    let mockToggleKeepCSSClean: jest.Mock;
    let mockKeepCSSClean: boolean;

    beforeEach(() => {
        // Reset the mock functions before each test
        mockIncrementLeadingChars = jest.fn();
        mockDecrementLeadingChars = jest.fn();
        mockSetLeadingCharType = jest.fn();
        mockToggleKeepCSSClean = jest.fn();
        mockKeepCSSClean = true;

        require('../../store/useTokenNameStore').default.mockImplementation((selector: any) => {
            const state = {
                leadingCharsCount: 0,
                leadingCharType: 'dash',
                keepCSSClean: mockKeepCSSClean,
                incrementLeadingChars: mockIncrementLeadingChars,
                decrementLeadingChars: mockDecrementLeadingChars,
                setLeadingCharType: mockSetLeadingCharType,
                toggleKeepCSSClean: mockToggleKeepCSSClean
            };
            return selector(state);
        });
    });

    test('renders with the correct components', () => {
        render(<Leading />);

        // Check that the NumberToggle component is rendered
        expect(screen.getByTestId('mock-number-toggle')).toBeInTheDocument();

        // Check that the radio buttons are rendered
        expect(screen.getByText('Dash (-)')).toBeInTheDocument();
        expect(screen.getByText('Under (_)')).toBeInTheDocument();

        // Check that the label is rendered
        expect(screen.getByText('Lead:')).toBeInTheDocument();
    });

    test('calls incrementLeadingChars when increase button is clicked', () => {
        render(<Leading />);

        // Click the increase button
        fireEvent.click(screen.getByTestId('increase-button'));

        // Check that incrementLeadingChars was called
        expect(mockIncrementLeadingChars).toHaveBeenCalled();
    });

    test('calls decrementLeadingChars when decrease button is clicked', () => {
        render(<Leading />);

        // Click the decrease button
        fireEvent.click(screen.getByTestId('decrease-button'));

        // Check that decrementLeadingChars was called
        expect(mockDecrementLeadingChars).toHaveBeenCalled();
    });

    test('calls setLeadingCharType when a radio option is selected', () => {
        render(<Leading />);

        // Click on the 'underscore' option
        fireEvent.click(screen.getByRole('radio', {name: 'Under (_)'}));

        // Check that setLeadingCharType was called with 'underscore'
        expect(mockSetLeadingCharType).toHaveBeenCalledWith('underscore');
    });

});