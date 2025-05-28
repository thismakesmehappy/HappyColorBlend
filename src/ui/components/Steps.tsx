import React, {forwardRef} from 'react';
import '../scss/column-layout.scss';
import ColumnDivider from './ColumnDivider';
import Section from "./Section";
import Area from "./Area";
import EqualSteps from "./equalSteps/EqualSteps";
import useSwatchStore from "../store/useSwatchStore";
import Toggle from "./helpers/Toggle";
import Badge from "./helpers/Badge";
import {IncludeLightDark} from "./equalSteps/IncludeLightDark";

interface StepsProps {
    className?: string;
    style?: React.CSSProperties;
    equalStepsRef?: React.RefObject<HTMLDivElement>;
}

const Steps = forwardRef<HTMLDivElement, StepsProps>(
    ({className, style, equalStepsRef}, ref) => {
        const includeDarkLight = useSwatchStore((state) => state.includeDarkLight);
        const flipIncludeDarkLight = useSwatchStore((state) => state.flipIncludeDarkLight);
        const steps = useSwatchStore((state) => state.steps);
        return (
            <Area
                id="steps"
                className={className}
                ref={ref}
                style={style}
            >
                <Section id="steps-input" ref={equalStepsRef}>
                    {/* Steps-input content */}
                    <EqualSteps />
                    <IncludeLightDark />
                </Section>
                <ColumnDivider />
                <Section id="step-labels">
                    {/* Step-labels content */}
                    {steps.map(step => {
                        return <Badge className={"figma-mr-sm"}>{String(step)}</Badge>
                    })}
                </Section>
            </Area>
        );
    }
);

export default Steps;