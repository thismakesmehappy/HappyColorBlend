import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import RampNameEditor from "./RampNameEditor";

// Prevent font‑awesome SVG rendering issues in tests.
jest.mock('../helpers/FontAwesomeIcon', () => {
    return function MockFontAwesomeIcon({icon}: { icon: string }) {
        return <span data-testid={`icon-${icon}`} />;
    };
});

// Mock the Toast component
jest.mock('../helpers/Toast', () => {
    return function MockToast({message, isVisible}: { message: string, isVisible: boolean }) {
        return isVisible ? <div data-testid="mock-toast">{message}</div> : null;
    };
});

const mockMethod = jest.fn();

describe('RampNameEditor', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });


    test('renders with correct structure when optional props are omitted', async () => {
        render(<RampNameEditor onRampNameChange={mockMethod} rampName={'Test Ramp'} />);

        const title = screen.getByTestId('title');
        expect(title).toBeInTheDocument();
        expect(title).toHaveTextContent('What do we call the mix?');

        const textAndInput = screen.getByTestId('text-and-input');
        expect(textAndInput).toBeInTheDocument();

        const textAndInputField = screen.getByTestId('text-and-input-field');
        expect(textAndInputField).toBeInTheDocument();
        expect(textAndInputField).toHaveTextContent('Test Ramp');

        const textAndInputFieldEditing = screen.queryByTestId('text-and-input-editing');
        expect(textAndInputFieldEditing).not.toBeInTheDocument();

        const faPencil = screen.getByTestId('icon-pencil');
        expect(faPencil).toBeInTheDocument();

        const faCheck = screen.queryByTestId('icon-circle-check');
        expect(faCheck).not.toBeInTheDocument();
    });

    test('toggles to edit mode when pencil icon is clicked', async () => {
        render(<RampNameEditor onRampNameChange={mockMethod} rampName={'Test Ramp'} />);

        const faPencil = screen.getByTestId('icon-pencil');
        expect(faPencil).toBeInTheDocument();

        fireEvent.click(faPencil);

        const faPencilAfterClick = screen.queryByTestId('icon-pencil');
        expect(faPencilAfterClick).not.toBeInTheDocument();

        const faCheck = screen.getByTestId('icon-circle-check');
        expect(faCheck).toBeInTheDocument();

        const textAndInputFieldEditing = screen.getByTestId('text-and-input-editing');
        expect(textAndInputFieldEditing).toBeInTheDocument();

        const inputField = screen.getByTestId('swatch-name-input');
        expect(inputField).toBeInTheDocument();
        expect(inputField).toHaveValue('Test Ramp');
    });

    test('saves new name', async () => {
        render(<RampNameEditor onRampNameChange={mockMethod} rampName={'Test Ramp'} />);

        let faPencil: HTMLElement | null = screen.getByTestId('icon-pencil');
        expect(faPencil).toBeInTheDocument();

        fireEvent.click(faPencil);

        faPencil = screen.queryByTestId('icon-pencil');
        expect(faPencil).not.toBeInTheDocument();

        const faCheck = screen.getByTestId('icon-circle-check');

        fireEvent.click(faCheck);

        expect(mockMethod).toHaveBeenCalledTimes(1);
        faPencil = screen.getByTestId('icon-pencil');
        expect(faPencil).toBeInTheDocument();
    });

    test('produces error when trying to save an empty name', async () => {
        render(<RampNameEditor onRampNameChange={mockMethod} rampName={'Test Ramp'} />);

        let faPencil: HTMLElement | null = screen.getByTestId('icon-pencil');
        expect(faPencil).toBeInTheDocument();

        fireEvent.click(faPencil);

        faPencil = screen.queryByTestId('icon-pencil');
        expect(faPencil).not.toBeInTheDocument();
        const swatchNameInput = screen.getByTestId('swatch-name-input');

        fireEvent.change(swatchNameInput, {target: {value: ''}})
        const faCheck = screen.getByTestId('icon-circle-check');


        fireEvent.click(faCheck);

        expect(screen.getByTestId('mock-toast')).toBeInTheDocument();

        expect(mockMethod).toHaveBeenCalledTimes(0);
        faPencil = screen.queryByTestId('icon-pencil');
        expect(faPencil).not.toBeInTheDocument();
    });

    test('cancels saving new name', async () => {
        render(<RampNameEditor onRampNameChange={mockMethod} rampName={'Test Ramp'} />);

        let faPencil: HTMLElement | null = screen.getByTestId('icon-pencil');
        expect(faPencil).toBeInTheDocument();

        fireEvent.click(faPencil);

        faPencil = screen.queryByTestId('icon-pencil');
        expect(faPencil).not.toBeInTheDocument();

        const faCheck = screen.getByTestId('icon-circle-xmark');

        fireEvent.click(faCheck);

        expect(mockMethod).toHaveBeenCalledTimes(0);
        faPencil = screen.getByTestId('icon-pencil');
        expect(faPencil).toBeInTheDocument();
    });

});