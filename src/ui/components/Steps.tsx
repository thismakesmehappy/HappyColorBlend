import React, {forwardRef} from 'react';
import '../scss/column-layout.scss';
import ColumnDivider from './ColumnDivider';
import Section from "./Section";
import Area from "./Area";
import EqualSteps from "./equalSteps/EqualSteps";
import Toggle from "./equalSteps/Toggle";
import useSwatchStore from "../store/useSwatchStore";

interface StepsProps {
    className?: string;
    style?: React.CSSProperties;
    equalStepsRef?: React.RefObject<HTMLDivElement>;
}

const Steps = forwardRef<HTMLDivElement, StepsProps>(
    ({className, style, equalStepsRef}, ref) => {
        const includeDarkLight = useSwatchStore((state) => state.includeDarkLight);
        const flipIncludeDarkLight = useSwatchStore((state) => state.flipIncludeDarkLight);
        return (
            <Area
                id="steps"
                className={className}
                ref={ref}
                style={style}
            >
                <Section id="equal-steps" ref={equalStepsRef}>
                    {/* Equal-steps content */}
                    <p className={"figma-subtitle"}>How many steps</p>
                    <EqualSteps />
                    <div className={""}>
                        <div className={'d-inline-block align-middle'}> Include light and dark</div>
                        {' '}
                        <Toggle value={includeDarkLight}
                                onChange={flipIncludeDarkLight}
                                className={"d-inline-block align-middle"} />
                    </div>
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