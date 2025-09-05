import FontAwesomeIcon from "./FontAwesomeIcon";
import React, {useState, useEffect} from "react";

interface NumberToggleProps {
    decreaseFunction: () => void;
    increaseFunction: () => void;
    minValue?: number;
    maxValue?: number;
    value: number;
    className?: string;
}

const NumberToggle = ({
                          className,
                          decreaseFunction,
                          increaseFunction,
                          minValue,
                          maxValue,
                          value
                      }: NumberToggleProps) => {
    const getCanIncrease = () => maxValue ? value < maxValue : true;
    const getCanDecrease = () => minValue ? value > minValue : true;
    const [canIncrease, setCanIncrease] = useState(getCanIncrease);
    const [canDecrease, setCanDecrease] = useState(getCanDecrease);

    // Update button states when value or min/max values change
    useEffect(() => {
        setCanIncrease(getCanIncrease());
        setCanDecrease(getCanDecrease());
    }, [value, minValue, maxValue]);


    return (
        <span className={className}>
            <span
                onClick={() => {
                    if (canDecrease) {
                        decreaseFunction();
                    }
                }}
                data-testid="decrease-steps-button"
            >
                <FontAwesomeIcon
                    icon="circle-minus"
                    className={`figma-icon ${canDecrease ? 'figma-text-primary' : 'figma-text-secondary'}`}
                />
            </span>
            <span
                className="figma-text figma-pl-md figma-pr-md"
                data-testid="steps-count"
            >
                {value}
            </span>
            <span
                onClick={() => {
                    if (canIncrease) {
                        increaseFunction();
                    }
                }}
                data-testid="increase-steps-button"
            >



                <FontAwesomeIcon
                    icon="circle-plus"
                    className={`figma-icon ${canIncrease ? 'figma-text-primary' : 'figma-text-secondary'}`}
                />
            </span>
        </span>
    );
};

export default NumberToggle;
