import React, {forwardRef} from 'react';
import '../scss/column-layout.scss';
import ColumnDivider from './ColumnDivider';
import Section from "./Section";
import Area from "./Area";
import EqualSteps from "./steps/EqualSteps";
import useSwatchStore from "../store/useSwatchStore";
import Badge from "./helpers/Badge";
import {IncludeShadeTint} from "./steps/IncludeShadeTint";
import CustomSteps from "./steps/CustomSteps";
import FontAwesomeIcon from "./helpers/FontAwesomeIcon";

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
            >
                <Section id="steps-input" ref={equalStepsRef}>
                    {/* Steps-input content */}
                    <EqualSteps />
                    <IncludeShadeTint />
                    <CustomSteps />
                </Section>
                <ColumnDivider />
                <Section id="step-labels">
                    {/* Step-labels content */}
                    <div>
                        <span className="figma-subtitle">Equal Steps: </span>
                        {steps.map(step => {
                            return <Badge key={`step-${step}`} className={"figma-mr-sm"}>{String(step)}</Badge>
                        })}
                    </div>
                    {customSteps.size > 0 && (
                        <div className="figma-mt-md">
                            <span className="figma-subtitle">Custom Steps: </span>
                            {Array.from(customSteps).map(step => {
                                return <Badge key={`custom-${step}`} className={"figma-mr-sm"}
                                              type="primary" iconRight={"minus"} onClick={() => {
                                    removeCustomStep(step);
                                    buildSwatches();
                                }}>
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
