import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import SwatchSection from "./SwatchSection";


describe('RampNameEditor', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    const mockMethod = jest.fn();

    test('renders with correct structure when optional props are omitted', async () => {
        render(<SwatchSection title="Test Section" stepValue="0" color="FFAADD" name="Test Name" id="Test Id"
                              onUpdateSwatch={mockMethod} />);

        const title = screen.getByTestId('title');
        expect(title).toBeInTheDocument();
        expect(title).toHaveTextContent('Test Section');

        const swatch = screen.getByTestId('swatch-chip-container');
        expect(swatch).toBeInTheDocument();
    });

});