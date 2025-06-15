import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import PrimaryColors from './PrimaryColors';

// Mock the scss import
jest.mock('../scss/column-layout.scss', () => ({}));

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

// Mock the Section component
jest.mock('./helpers/Section', () => {
    return function MockSection({
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
                data-testid="mock-section"
                id={id}
                className={className}
                style={style}
            >
                {children}
            </div>
        );
    };
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
    }),
    createTokenName: jest.fn((name) => name.toLowerCase().replace(/\s/g, '-'))
}));

describe('PrimaryColors Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders with correct structure', () => {
        render(<PrimaryColors />);

        // Check that the Section component is rendered with correct props
        const section = screen.getByTestId('mock-section');
        expect(section).toBeInTheDocument();
        expect(section).toHaveAttribute('id', 'primary-colors');

        // Check that the title is rendered
        expect(section).toHaveTextContent('Primary Colors');

        // Check that the add button is rendered
        expect(screen.getByTestId('icon-circle-plus')).toBeInTheDocument();

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
        expect(mockUpdatePrimaryColor).toHaveBeenCalledWith('color1', 'FF5500', 'Red', 'Red');
        expect(mockBuildSwatches).toHaveBeenCalled();
    });

    test('updates primary color name when swatch name is changed', () => {
        render(<PrimaryColors />);

        // Change the name
        const nameInput = screen.getByTestId('mock-swatch-name-color1');
        fireEvent.change(nameInput, {target: {value: 'Bright Red'}});

        // Check that updatePrimaryColor was called with the correct values
        expect(mockUpdatePrimaryColor).toHaveBeenCalledWith('color1', 'FF0000', 'Bright Red', 'Bright Red');
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

        // Click the add button (the parent element of the icon)
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
            tokenName: 'mock-color-name',
        });
        expect(mockBuildSwatches).toHaveBeenCalled();

        // Restore Math.random
        mockRandom.mockRestore();
    });

    test('passes className to Section component', () => {
        render(<PrimaryColors className="test-class" />);

        const section = screen.getByTestId('mock-section');
        expect(section).toHaveAttribute('class', 'test-class');
    });

    test('passes style to Section component', () => {
        const testStyle = {width: '300px'};
        render(<PrimaryColors style={testStyle} />);

        // In our mock, we're passing style directly to the div
        const section = screen.getByTestId('mock-section');
        expect(section).toHaveStyle('width: 300px');
    });
});
