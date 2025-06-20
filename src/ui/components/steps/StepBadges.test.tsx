import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import StepBadges from "./StepBadges";

// Prevent font‑awesome SVG rendering issues in tests.
jest.mock('../helpers/FontAwesomeIcon', () => {
    return function MockFontAwesomeIcon({icon}: { icon: string }) {
        return <span data-testid={`icon-${icon}`} />;
    };
});

describe('StepBadges', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });


    test('renders with correct structure when optional props are omitted', async () => {
        render(<StepBadges steps={[100, 200, 300]} title={'Test Title'} />);

        const section = screen.getByTestId('section');
        expect(section).toBeInTheDocument();

        const title = screen.getByTestId('title');
        expect(title).toBeInTheDocument();
        expect(title).toHaveTextContent('Test Title');

        const badges = screen.getAllByTestId(/^badge/);
        expect(badges).toHaveLength(3);
        expect(badges[0]).toHaveTextContent('100');
        expect(badges[1]).toHaveTextContent('200');
        expect(badges[2]).toHaveTextContent('300');

        // if the user does not include a type, do not include any
        const classNames = badges[0].className.split(' ');
        expect(classNames.includes('figma-bg-danger')).toBe(false);
        expect(classNames.includes('figma-bg-success')).toBe(false);
        expect(classNames.includes('figma-bg-warning')).toBe(false);
        expect(classNames.includes('figma-bg-primary')).toBe(false);

        const faMinus = screen.queryByTestId('icon-minus');
        expect(faMinus).not.toBeInTheDocument()

        const faPlus = screen.queryByTestId('icon-plus');
        expect(faPlus).not.toBeInTheDocument()
    });

    test('renders with correct structure when optional props are included', async () => {
        const mocFunction = jest.fn();
        render(<StepBadges
            steps={[100, 200, 300]}
            title={'Test Title'}
            keyLabel='test-label'
            type='primary'
            iconLeft='minus'
            iconRight='plus'
            testId='test-id'
            onClick={mocFunction}
        />);

        const section = screen.getByTestId('test-id-section');
        expect(section).toBeInTheDocument();

        const title = screen.getByTestId('test-id-title');
        expect(title).toBeInTheDocument();
        expect(title).toHaveTextContent('Test Title');

        const badges = screen.getAllByTestId(/^test-id-badge/);
        expect(badges).toHaveLength(3);
        expect(badges[0]).toHaveTextContent('100');
        expect(badges[1]).toHaveTextContent('200');
        expect(badges[2]).toHaveTextContent('300');

        // if the user specifies a type, it should be the only type
        const classNames = badges[0].className.split(' ');
        expect(classNames.includes('figma-bg-danger')).toBe(false);
        expect(classNames.includes('figma-bg-success')).toBe(false);
        expect(classNames.includes('figma-bg-warning')).toBe(false);
        expect(classNames.includes('figma-bg-primary')).toBe(true);

        const faMinus = screen.getAllByTestId('icon-minus');
        expect(faMinus).toHaveLength(3);

        const faPlus = screen.getAllByTestId('icon-plus');
        expect(faPlus).toHaveLength(3);

        fireEvent.click(badges[0]);
        expect(mocFunction).toHaveBeenCalledTimes(1);
    });
});