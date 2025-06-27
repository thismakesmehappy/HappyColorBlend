import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import TooltipWrapper from './TooltipWrapper';

describe('TooltipWrapper Component', () => {
    test('renders children correctly', () => {
        render(
            <TooltipWrapper content="Test tooltip" id="test-tooltip">
                <button>Test Button</button>
            </TooltipWrapper>
        );

        expect(screen.getByText('Test Button')).toBeInTheDocument();
    });

    test('applies status classes correctly', () => {
        const statuses = ['error', 'success', 'warning', 'primary', 'component'] as const;

        statuses.forEach((status) => {
            const {unmount} = render(
                <TooltipWrapper content={`${status} tooltip`} type={status} id={`${status}-tooltip`}>
                    <span>Test {status}</span>
                </TooltipWrapper>
            );

            // Component should render without errors
            expect(screen.getByText(`Test ${status}`)).toBeInTheDocument();

            unmount();
        });
    });

    test('renders without status (default)', () => {
        render(
            <TooltipWrapper content="Default tooltip" id="default-tooltip">
                <span>Default test</span>
            </TooltipWrapper>
        );

        expect(screen.getByText('Default test')).toBeInTheDocument();
    });
});