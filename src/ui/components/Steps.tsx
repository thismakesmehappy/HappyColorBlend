import React, {forwardRef} from 'react';
import '../scss/column-layout.scss';
import ColumnDivider from './ColumnDivider';
import Section from "./Section";
import Area from "./Area";

interface StepsProps {
    className?: string;
    style?: React.CSSProperties;
    equalStepsRef?: React.RefObject<HTMLDivElement>;
}

const Steps = forwardRef<HTMLDivElement, StepsProps>(
    ({className, style, equalStepsRef}, ref) => {
        return (
            <Area
                id="steps"
                className={className}
                ref={ref}
                style={style}
            >
                <Section id="equal-steps" ref={equalStepsRef}>
                    {/* Equal-steps content */}
                    equal-steps<br />
                    equal-steps<br />
                    equal-steps<br />
                </Section>
                <ColumnDivider />
                <Section id="step-labels">
                    {/* Step-labels content */}
                    steps-labels<br />
                    steps-labels<br />
                    steps-labels<br />
                    steps-labels<br />
                    steps-labels
                </Section>
            </Area>
        );
    }
);

export default Steps;