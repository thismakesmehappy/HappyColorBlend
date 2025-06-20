import React, {forwardRef, useEffect, useRef, useState, MutableRefObject} from 'react';
import '../scss/column-layout.scss';
import ColumnDivider from './helpers/ColumnDivider';
import Section from "./helpers/Section";
import Area from "./helpers/Area";
import EqualStepsInput from "./steps/EqualStepsInput";
import useSwatchStore from "../store/useSwatchStore";
import CustomStepsInput from "./steps/CustomStepsInput";
import ColumnSpacer from "./helpers/ColumnSpacer";
import AllStepBadges from "./steps/AllStepBadges";

interface StepsProps {
    className?: string;
    style?: React.CSSProperties;
    equalStepsRef?: React.RefObject<HTMLDivElement>;
}

const Steps = forwardRef<HTMLDivElement, StepsProps>(
    ({className, style, equalStepsRef}, ref) => {
        const steps = useSwatchStore((state) => state.steps);
        const customSteps = useSwatchStore((state) => state.customSteps);
        const stepsInputRef = useRef<HTMLDivElement>(null);
        const areaRef = useRef<HTMLDivElement>(null);
        const [stepsInputNode, setStepsInputNode] = useState<HTMLDivElement | null>(null);
        const [areaNode, setAreaNode] = useState<HTMLDivElement | null>(null);

        // Effect to handle the equalStepsRef
        useEffect(() => {
            // If equalStepsRef exists and stepsInputNode has a value,
            // we need to find a way to synchronize them without directly assigning to equalStepsRef.current
            // This is a workaround for the TypeScript error about ref.current being read-only
            if (equalStepsRef && stepsInputNode) {
                // We can use Object.defineProperty to override the current property
                // This is a bit of a hack, but it allows us to maintain the current API
                Object.defineProperty(equalStepsRef, 'current', {
                    value: stepsInputNode,
                    writable: false,
                    configurable: true
                });
            }
        }, [equalStepsRef, stepsInputNode]);

        // Effect to handle the areaRef
        useEffect(() => {
            // If areaNode has a value, update the areaRef
            if (areaNode) {
                // We can use Object.defineProperty to override the current property
                Object.defineProperty(areaRef, 'current', {
                    value: areaNode,
                    writable: false,
                    configurable: true
                });
            }
        }, [areaNode]);

        // Effect to handle the stepsInputRef
        useEffect(() => {
            // If stepsInputNode has a value, update the stepsInputRef
            if (stepsInputNode) {
                // We can use Object.defineProperty to override the current property
                Object.defineProperty(stepsInputRef, 'current', {
                    value: stepsInputNode,
                    writable: false,
                    configurable: true
                });
            }
        }, [stepsInputNode]);

        useEffect(() => {
            // Function to update the CSS variable with the width of steps-input
            const updateStepsInputWidth = () => {
                if (stepsInputRef.current && areaRef.current) {
                    const width = stepsInputRef.current.offsetWidth;
                    areaRef.current.style.setProperty('--steps-input-width', `${width}px`);
                }
            };

            // Call once on mount
            updateStepsInputWidth();

            // Set up ResizeObserver to update when size changes
            const resizeObserver = new ResizeObserver(updateStepsInputWidth);
            if (stepsInputRef.current) {
                resizeObserver.observe(stepsInputRef.current);
            }

            // Clean up
            return () => {
                if (stepsInputRef.current) {
                    resizeObserver.unobserve(stepsInputRef.current);
                }
                resizeObserver.disconnect();
            };
        }, [steps, customSteps, stepsInputNode, areaNode]); // Re-run when steps, customSteps, or refs change

        return (
            <>
                <div className={"figma-subtitle"}>How Many Color Steps</div>

                <Area
                    id="steps"
                    className={className}
                    ref={(node) => {
                        // Handle the forwarded ref
                        if (typeof ref === 'function') {
                            ref(node);
                        }

                        // Update our state variable to trigger the useEffect
                        setAreaNode(node);
                    }}
                    style={style}
                    data-testid="steps-area"
                >
                    <Section
                        id="steps-input"
                        ref={(node) => {
                            // Update the state variable to trigger the useEffect
                            setStepsInputNode(node);
                        }}
                        data-testid="steps-input-section"
                    >
                        {/* Steps-input content */}
                        <EqualStepsInput className="figma-mb-sm" />
                        <CustomStepsInput />
                    </Section>
                    <ColumnSpacer />
                    <Section id="step-labels" data-testid="step-labels-section" className={"row"}>
                        {/* Step-labels content */}
                        <AllStepBadges data-testid="step-badges" />
                    </Section>
                </Area>
            </>
        );
    }
);

export default Steps;
