import React, {forwardRef, useEffect, useRef, useState, MutableRefObject} from 'react';
import EqualSteps from "./steps/EqualSteps";
import useSwatchStore from "../store/useSwatchStore";
import Badge from "./helpers/Badge";
import CustomSteps from "./steps/CustomSteps";

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
            <>
                <div className={"figma-subtitle"}>How Many Color Steps</div>

                <div
                    id="steps"
                    className={className}
                    style={style}
                    data-testid="steps-area"
                >
                    <div
                        id="steps-input"
                        data-testid="steps-input-section"
                    >
                        {/* Steps-input content */}
                        <EqualSteps className="figma-mb-sm" />
                        <CustomSteps />
                    </div>
                    <div id="step-labels" data-testid="step-labels-section">
                        {/* Step-labels content */}
                        <div data-testid="equal-steps-badges" className="p-0">
                            <span className="figma-subtitle">Equal Steps: </span>
                            {steps.map(step => {
                                return <Badge key={`step-${step}`} className={"figma-mr-sm"}
                                              data-testid={`equal-step-badge-${step}`}>{String(step)}</Badge>
                            })}
                        </div>
                        {customSteps.size > 0 && (
                            <div className="figma-mt-sm p-0" data-testid="custom-steps-badges">
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
                    </div>
                </div>
            </>
        );
    }
);

export default Steps;
