import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import Swatch from './Swatch';
import {act} from 'react-dom/test-utils';

// Mock console.log to avoid cluttering test output
console.log = jest.fn();

describe('Swatch Component', () => {
    const mockUpdateSwatch = jest.fn();
    const mockOnDelete = jest.fn();

    const defaultProps = {
        color: 'FF5733',
        name: 'Test Color',
        id: '123',
        updateSwatch: mockUpdateSwatch,
        onDelete: mockOnDelete,
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders with correct initial values', () => {
        render(<Swatch {...defaultProps} />);

        // Check that the container is rendered
        const container = screen.getByTestId('swatch-container');
        expect(container).toBeInTheDocument();

        // Check that the chip is rendered
        const chip = screen.getByTestId('swatch-chip-container');
        expect(chip).toBeInTheDocument();

        // Check that the labels are rendered
        const labels = screen.getByTestId('swatch-labels-container');
        expect(labels).toBeInTheDocument();

        // Check that the name and color are displayed
        expect(screen.getByTestId('swatch-name-display')).toHaveTextContent('Test Color');
        expect(screen.getByTestId('swatch-color-display')).toHaveTextContent('FF5733');
    });

    test('applies custom className when provided', () => {
        render(<Swatch {...defaultProps} className="custom-class" />);

        const container = screen.getByTestId('swatch-container');
        expect(container).toHaveClass('custom-class');
    });


    test('enters edit mode when edit button is clicked', async () => {
        render(<Swatch {...defaultProps} />);

        // Find and click the edit button
        const editButton = screen.getByTestId('edit-button');
        fireEvent.click(editButton);

        // Check that we're in edit mode (input fields are visible)
        expect(screen.getByTestId('swatch-labels-edit')).toBeInTheDocument();
        expect(screen.getByTestId('swatch-color-input')).toBeInTheDocument();

        // Check that the input fields have the correct initial values
        expect(screen.getByTestId('swatch-name-input')).toHaveValue('Test Color');
        expect(screen.getByTestId('swatch-color-input')).toHaveValue('FF5733');
    });

    test('updates color and name when editing and saving', async () => {
        render(<Swatch {...defaultProps} />);

        // Enter edit mode
        const editButton = screen.getByTestId('edit-button');
        fireEvent.click(editButton);

        // Get input fields
        const nameInput = screen.getByTestId('swatch-name-input');
        const colorInput = screen.getByTestId('swatch-color-input');

        // Change values
        fireEvent.change(nameInput, {target: {value: 'New Name'}});
        fireEvent.change(colorInput, {target: {value: '00FF00'}});

        // Save changes by clicking the save button
        const saveButton = screen.getByTestId('save-button');
        fireEvent.click(saveButton);

        // Check that updateSwatch was called with new values
        await waitFor(() => {
            expect(mockUpdateSwatch).toHaveBeenCalledWith('00FF00', 'New Name', '123');
        });
    });

    test('cancels editing when cancel button is clicked', async () => {
        render(<Swatch {...defaultProps} />);

        // Enter edit mode
        const editButton = screen.getByTestId('edit-button');
        fireEvent.click(editButton);

        // Get input fields
        const nameInput = screen.getByTestId('swatch-name-input');
        const colorInput = screen.getByTestId('swatch-color-input');

        // Change values
        fireEvent.change(nameInput, {target: {value: 'New Name'}});
        fireEvent.change(colorInput, {target: {value: '00FF00'}});

        // Cancel changes by clicking the cancel button
        const cancelButton = screen.getByTestId('cancel-button');
        fireEvent.click(cancelButton);

        // Check that we're back to display mode
        expect(screen.queryByTestId('swatch-labels-edit')).not.toBeInTheDocument();
        expect(screen.getByTestId('swatch-labels-display')).toBeInTheDocument();

        // Check that the original values are still displayed
        expect(screen.getByTestId('swatch-name-display')).toHaveTextContent('Test Color');
        expect(screen.getByTestId('swatch-color-display')).toHaveTextContent('FF5733');
    });

    test('calls onDelete when delete button is clicked', () => {
        render(<Swatch {...defaultProps} canDelete={true} />);

        // Find and click the delete button
        const deleteButton = screen.getByTestId('delete-button');
        fireEvent.click(deleteButton);

        // Check that onDelete was called with the correct ID
        expect(mockOnDelete).toHaveBeenCalledWith('123');
    });

    test('does not show delete button when canDelete is false', () => {
        render(<Swatch {...defaultProps} canDelete={false} />);

        // The delete button should not be present
        expect(screen.queryByTestId('delete-button')).not.toBeInTheDocument();
    });

    test('updates component when props change', async () => {
        const {rerender} = render(<Swatch {...defaultProps} />);

        // Update props
        rerender(<Swatch {...defaultProps} color="00FF00" name="New Color" />);

        // Check if the component updated with new values
        await waitFor(() => {
            expect(screen.getByTestId('swatch-name-display')).toHaveTextContent('New Color');
            expect(screen.getByTestId('swatch-color-display')).toHaveTextContent('00FF00');
        });
    });

    test('prevents saving invalid hex color', async () => {
        render(<Swatch {...defaultProps} />);

        // Enter edit mode
        const editButton = screen.getByTestId('edit-button');
        fireEvent.click(editButton);

        // Get input fields
        const colorInput = screen.getByTestId('swatch-color-input');

        // Change to invalid color
        fireEvent.change(colorInput, {target: {value: 'INVALID'}});

        // Try to save changes
        const saveButton = screen.getByTestId('save-button');
        fireEvent.click(saveButton);

        // Check that we're still in edit mode (input fields are still visible)
        expect(screen.getByTestId('swatch-labels-edit')).toBeInTheDocument();

        // Check that updateSwatch was not called with the invalid color
        expect(mockUpdateSwatch).not.toHaveBeenCalledWith('INVALID', 'Test Color', '123');
    });
});
