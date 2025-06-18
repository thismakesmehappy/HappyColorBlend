import React, {forwardRef} from 'react';
import '../scss/column-layout.scss';
import ColumnDivider from './helpers/ColumnDivider';
import Section from "./helpers/Section";
import Area from "./helpers/Area";
import EqualSteps from "./steps/EqualSteps";
import useSwatchStore from "../store/useSwatchStore";
import Badge from "./helpers/Badge";
import {IncludeShadeTint} from "./steps/IncludeShadeTint";
import CustomSteps from "./steps/CustomSteps";
import {PadZeros} from "./steps/PadZeros";

interface StepsProps {
    className?: string;
    style?: React.CSSProperties;
    equalStepsRef?: React.RefObject<HTMLDivElement>;
}

const Steps = forwardRef<HTMLDivElement, StepsProps>(
    ({className, style, equalStepsRef}, ref) => {
        const steps = useSwatchStore((state) => state.steps);
        const customSteps = useSwatchStore((state) => state.customSteps);
        const removeCustomStep = useSwatchStore((state) => state.removeCustomStep);
        const buildSwatches = useSwatchStore((state) => state.buildSwatches);
        return (
            <Area
                id="steps"
                className={className}
                ref={ref}
                style={style}
                data-testid="steps-area"
            >
                <Section id="steps-input" ref={equalStepsRef} data-testid="steps-input-section">
                    {/* Steps-input content */}
                    <EqualSteps className="figma-mb-sm" />
                    <CustomSteps />
                </Section>
                <ColumnDivider />
                <Section id="step-labels" data-testid="step-labels-section">
                    {/* Step-labels content */}
                    <div data-testid="equal-steps-badges">
                        <span className="figma-subtitle">Equal Steps: </span>
                        {steps.map(step => {
                            return <Badge key={`step-${step}`} className={"figma-mr-sm"}
                                          data-testid={`equal-step-badge-${step}`}>{String(step)}</Badge>
                        })}
                    </div>
                    {customSteps.size > 0 && (
                        <div className="figma-mt-md" data-testid="custom-steps-badges">
                            <span className="figma-subtitle">Custom Steps: </span>
                            {Array.from(customSteps).map(step => {
                                return <Badge key={`custom-${step}`} className={"figma-mr-sm"}
                                              type="primary" iconRight={"minus"} onClick={() => {
                                    removeCustomStep(step);
                                    buildSwatches();
                                }} data-testid={`custom-step-badge-${step}`}>
                                    {String(step)}
                                </Badge>
                            })}
                        </div>
                    )}
                </Section>
            </Area>
        );
    }
);

export default Steps;
