import Badge from "../helpers/Badge";
import React from "react";
import {Alerttype} from "../../interfaces";

interface StepBadgesProps {
    steps: number[];
    title: string;
    type?: Alerttype;
    keyLabel?: string;
    iconRight?: any;
    iconLeft?: any;
    onClick?: (step: number) => void;
    testId?: string;
}

const StepBadges = ({steps, title, type, iconRight, iconLeft, onClick, keyLabel, testId}: StepBadgesProps) => {
    const keyPrefix = keyLabel ? keyLabel + '-' : '';
    const testIdPrefix = testId ? testId + '-' : '';
    return (
        <div data-testid={`${testIdPrefix}section`} className="p-0">
            <span data-testid={`${testIdPrefix}title`} className="figma-subtitle">{title} </span>
            {steps.map((step: number) => (
                <Badge
                    key={`${keyPrefix}${step}`}
                    className="figma-mr-sm"
                    data-testid={`${testIdPrefix}badge-${step}`}
                    testId={`${testIdPrefix}badge-${step}`}
                    type={type}
                    iconRight={iconRight}
                    iconLeft={iconLeft}
                    onClick={() => onClick?.(step)}
                >
                    {String(step)}
                </Badge>
            ))}
        </div>
    );
};

export default StepBadges
