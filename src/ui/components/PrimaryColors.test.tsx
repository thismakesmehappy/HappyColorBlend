import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import PrimaryColors from './PrimaryColors';

// Mock uuid
jest.mock('uuid', () => ({
    v4: jest.fn(() => 'mock-uuid')
}));

// Mock color-namer
jest.mock('color-namer', () => {
    return jest.fn().mockImplementation(() => ({
        ntc: [{name: 'Mock Color Name'}]
    }));
});

// Mock the Swatch component
jest.mock('./swatchesInput/Swatch', () => {
    return function MockSwatch({
                                   color,
                                   name,
                                   updateSwatch,
                                   onDelete,
                                   id,
                                   canDelete,
                                   className
                               }: {
        color: string;
        name: string;
        updateSwatch: (color: string, name: string, id?: string) => void;
        onDelete?: (id: string) => void;
        id?: string;
        canDelete?: boolean;
        className?: string
    }) {
        return (
            <div data-testid={`mock-swatch-${id}`} className={className}>
                <input
                    data-testid={`mock-swatch-color-${id}`}
                    value={color}
                    onChange={(e) => updateSwatch(e.target.value, name, id)}
                />
                <input
                    data-testid={`mock-swatch-name-${id}`}
                    value={name}
                    onChange={(e) => updateSwatch(color, e.target.value, id)}
                />
                {canDelete && onDelete && id && (
                    <button
                        data-testid={`mock-swatch-delete-${id}`}
                        onClick={() => onDelete(id)}
                    >
                        Delete
                    </button>
                )}
            </div>
        );
    };
});

// Mock the FontAwesomeIcon component
jest.mock('./helpers/FontAwesomeIcon', () => {
    return function MockFontAwesomeIcon({
                                            icon,
                                            className
                                        }: {
        icon: string;
        className?: string
    }) {
        return <span data-testid={`icon-${icon}`} className={className}></span>;
    };
});

// Mock the UI_CHANNEL and PLUGIN
const mockUIChannelRequest = jest.fn();
jest.mock('@ui/app.network', () => ({
    UI_CHANNEL: {
        request: jest.fn()
    }
}));

jest.mock('@common/networkSides', () => ({
    PLUGIN: 'mock-plugin-side'
}));

// Mock the useSwatchStore hook
const mockUpdatePrimaryColor = jest.fn();
const mockAddPrimaryColor = jest.fn();
const mockRemovePrimaryColor = jest.fn();
const mockBuildSwatches = jest.fn();

jest.mock('../store/useSwatchStore', () => ({
    __esModule: true,
    default: jest.fn().mockImplementation((selector) => {
        const state = {
            primaryColors: [
                {id: 'color1', name: 'Red', color: 'FF0000'},
                {id: 'color2', name: 'Blue', color: '0000FF'}
            ],
            updatePrimaryColor: mockUpdatePrimaryColor,
            addPrimaryColor: mockAddPrimaryColor,
            removePrimaryColor: mockRemovePrimaryColor,
            buildSwatches: mockBuildSwatches
        };
        return selector(state);
    })
}));

describe('PrimaryColors Component', () => {
    let mockUIChannelRequest: jest.Mock;

    beforeEach(() => {
        jest.clearAllMocks();
        // Get the mocked UI_CHANNEL.request function
        const { UI_CHANNEL } = require('@ui/app.network');
        mockUIChannelRequest = UI_CHANNEL.request as jest.Mock;
    });

    test('renders with correct structure', () => {
        render(<PrimaryColors />);

        // Check that the main div is rendered with correct props
        const primaryColorsDiv = screen.getByText('Primary Colors').closest('div');
        expect(primaryColorsDiv).toBeInTheDocument();
        expect(primaryColorsDiv).toHaveAttribute('id', 'primary-colors');

        // Check that the title is rendered
        expect(screen.getByText('Primary Colors')).toBeInTheDocument();

        // Check that the add button is rendered
        expect(screen.getByTestId('icon-circle-plus')).toBeInTheDocument();

        // Check that the eye-dropper button is rendered
        expect(screen.getByTestId('icon-eye-dropper')).toBeInTheDocument();

        // Check that both swatches are rendered
        const redSwatch = screen.getByTestId('mock-swatch-color1');
        const blueSwatch = screen.getByTestId('mock-swatch-color2');
        expect(redSwatch).toBeInTheDocument();
        expect(blueSwatch).toBeInTheDocument();

        // Check that the swatches have the correct initial values
        expect(screen.getByTestId('mock-swatch-color-color1')).toHaveValue('FF0000');
        expect(screen.getByTestId('mock-swatch-name-color1')).toHaveValue('Red');
        expect(screen.getByTestId('mock-swatch-color-color2')).toHaveValue('0000FF');
        expect(screen.getByTestId('mock-swatch-name-color2')).toHaveValue('Blue');
    });

    test('updates primary color when swatch is changed', () => {
        render(<PrimaryColors />);

        // Change the color
        const colorInput = screen.getByTestId('mock-swatch-color-color1');
        fireEvent.change(colorInput, {target: {value: 'FF5500'}});

        // Check that updatePrimaryColor was called with the correct values
        expect(mockUpdatePrimaryColor).toHaveBeenCalledWith('color1', 'FF5500', 'Red');
        expect(mockBuildSwatches).toHaveBeenCalled();
    });

    test('updates primary color name when swatch name is changed', () => {
        render(<PrimaryColors />);

        // Change the name
        const nameInput = screen.getByTestId('mock-swatch-name-color1');
        fireEvent.change(nameInput, {target: {value: 'Bright Red'}});

        // Check that updatePrimaryColor was called with the correct values
        expect(mockUpdatePrimaryColor).toHaveBeenCalledWith('color1', 'FF0000', 'Bright Red');
        expect(mockBuildSwatches).toHaveBeenCalled();
    });

    test('removes primary color when delete button is clicked', () => {
        render(<PrimaryColors />);

        // Click the delete button
        const deleteButton = screen.getByTestId('mock-swatch-delete-color1');
        fireEvent.click(deleteButton);

        // Check that removePrimaryColor was called with the correct id
        expect(mockRemovePrimaryColor).toHaveBeenCalledWith('color1');
        expect(mockBuildSwatches).toHaveBeenCalled();
    });

    test('adds random primary color when add button is clicked', () => {
        // Mock Math.random to return a predictable value
        const mockRandom = jest.spyOn(Math, 'random').mockReturnValue(0.5);

        render(<PrimaryColors />);

        // Click the add button (the span containing the icon)
        const addIcon = screen.getByTestId('icon-circle-plus');
        const addButton = addIcon.parentElement;
        if (addButton) {
            fireEvent.click(addButton);
        }

        // Check that addPrimaryColor was called with a new color
        expect(mockAddPrimaryColor).toHaveBeenCalledWith({
            color: '7FFFFF', // Result of Math.floor(0.5 * 16777215).toString(16).padStart(6, '0').toUpperCase()
            name: 'Mock Color Name',
            id: 'mock-uuid',
        });
        expect(mockBuildSwatches).toHaveBeenCalled();

        // Restore Math.random
        mockRandom.mockRestore();
    });

    test('passes className to main div', () => {
        render(<PrimaryColors className="test-class" />);

        const primaryColorsDiv = screen.getByText('Primary Colors').closest('div');
        expect(primaryColorsDiv).toHaveAttribute('class', 'test-class');
    });

    test('passes style to main div', () => {
        const testStyle = {width: '300px'};
        render(<PrimaryColors style={testStyle} />);

        const primaryColorsDiv = screen.getByTestId('primary-colors');
        expect(primaryColorsDiv).toHaveStyle('width: 300px');
    });

    describe('Eye-dropper functionality', () => {
        test('extracts colors from selection when eye-dropper is clicked', async () => {
            const mockExtractedColors = [
                { color: 'FF5500', name: 'FF5500' },
                { color: '00AAFF', name: '00AAFF' }
            ];

            mockUIChannelRequest.mockResolvedValue(mockExtractedColors);

            render(<PrimaryColors />);

            // Click the eye-dropper button
            const eyeDropperIcon = screen.getByTestId('icon-eye-dropper');
            const eyeDropperButton = eyeDropperIcon.parentElement;
            
            await fireEvent.click(eyeDropperButton!);

            // Check that the plugin was called to extract colors
            expect(mockUIChannelRequest).toHaveBeenCalledWith('mock-plugin-side', 'extractColorsFromSelection', []);

            // Check that primary colors were added with proper naming
            expect(mockAddPrimaryColor).toHaveBeenCalledTimes(2);
            expect(mockAddPrimaryColor).toHaveBeenNthCalledWith(1, {
                color: 'FF5500',
                name: 'Mock Color Name',
                id: 'mock-uuid',
            });
            expect(mockAddPrimaryColor).toHaveBeenNthCalledWith(2, {
                color: '00AAFF',
                name: 'Mock Color Name',
                id: 'mock-uuid',
            });

            // Check that swatches were built
            expect(mockBuildSwatches).toHaveBeenCalled();
        });

        test('handles no selection error gracefully', async () => {
            const mockError = new Error('No objects selected. Please select some objects to extract colors from.');
            mockUIChannelRequest.mockRejectedValue(mockError);

            // Mock window.alert
            const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});
            const mockConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

            render(<PrimaryColors />);

            const eyeDropperIcon = screen.getByTestId('icon-eye-dropper');
            const eyeDropperButton = eyeDropperIcon.parentElement;
            
            await fireEvent.click(eyeDropperButton!);

            // Check that error was handled
            expect(mockConsoleError).toHaveBeenCalledWith('Failed to extract colors from selection:', mockError);
            expect(mockAlert).toHaveBeenCalledWith('No objects selected. Please select some objects to extract colors from.');

            // Check that no colors were added
            expect(mockAddPrimaryColor).not.toHaveBeenCalled();
            expect(mockBuildSwatches).not.toHaveBeenCalled();

            // Restore mocks
            mockAlert.mockRestore();
            mockConsoleError.mockRestore();
        });

        test('handles no colors found error gracefully', async () => {
            const mockError = new Error('No solid colors found in selected objects.');
            mockUIChannelRequest.mockRejectedValue(mockError);

            // Mock window.alert
            const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});
            const mockConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

            render(<PrimaryColors />);

            const eyeDropperIcon = screen.getByTestId('icon-eye-dropper');
            const eyeDropperButton = eyeDropperIcon.parentElement;
            
            await fireEvent.click(eyeDropperButton!);

            // Check that error was handled
            expect(mockConsoleError).toHaveBeenCalledWith('Failed to extract colors from selection:', mockError);
            expect(mockAlert).toHaveBeenCalledWith('No solid colors found in selected objects.');

            // Check that no colors were added
            expect(mockAddPrimaryColor).not.toHaveBeenCalled();
            expect(mockBuildSwatches).not.toHaveBeenCalled();

            // Restore mocks
            mockAlert.mockRestore();
            mockConsoleError.mockRestore();
        });

        test('handles generic extraction errors gracefully', async () => {
            const mockError = new Error('Plugin communication failed');
            mockUIChannelRequest.mockRejectedValue(mockError);

            // Mock window.alert
            const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});
            const mockConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

            render(<PrimaryColors />);

            const eyeDropperIcon = screen.getByTestId('icon-eye-dropper');
            const eyeDropperButton = eyeDropperIcon.parentElement;
            
            await fireEvent.click(eyeDropperButton!);

            // Check that error was handled
            expect(mockConsoleError).toHaveBeenCalledWith('Failed to extract colors from selection:', mockError);
            expect(mockAlert).toHaveBeenCalledWith('Plugin communication failed');

            // Check that no colors were added
            expect(mockAddPrimaryColor).not.toHaveBeenCalled();
            expect(mockBuildSwatches).not.toHaveBeenCalled();

            // Restore mocks
            mockAlert.mockRestore();
            mockConsoleError.mockRestore();
        });

        test('handles empty color array gracefully', async () => {
            mockUIChannelRequest.mockResolvedValue([]);

            render(<PrimaryColors />);

            const eyeDropperIcon = screen.getByTestId('icon-eye-dropper');
            const eyeDropperButton = eyeDropperIcon.parentElement;
            
            await fireEvent.click(eyeDropperButton!);

            // Check that the plugin was called
            expect(mockUIChannelRequest).toHaveBeenCalled();

            // Check that no colors were added since array is empty
            expect(mockAddPrimaryColor).not.toHaveBeenCalled();

            // Check that swatches were still built (for consistency)
            expect(mockBuildSwatches).toHaveBeenCalled();
        });

        test('correctly uses ColorNamer for extracted colors', async () => {
            const mockExtractedColors = [
                { color: 'FF0000', name: 'FF0000' }
            ];

            mockUIChannelRequest.mockResolvedValue(mockExtractedColors);

            render(<PrimaryColors />);

            const eyeDropperIcon = screen.getByTestId('icon-eye-dropper');
            const eyeDropperButton = eyeDropperIcon.parentElement;
            
            await fireEvent.click(eyeDropperButton!);

            // Check that ColorNamer was used with the correct format (with #)
            const ColorNamer = require('color-namer');
            expect(ColorNamer).toHaveBeenCalledWith('#FF0000');

            // Check that the mocked name was used
            expect(mockAddPrimaryColor).toHaveBeenCalledWith({
                color: 'FF0000',
                name: 'Mock Color Name',
                id: 'mock-uuid',
            });
        });
    });
});