import FontAwesomeIcon from "./FontAwesomeIcon";
import React, {useState, useEffect} from "react";

interface NumberToggleProps {
    decreaseFunction: () => void;
    increaseFunction: () => void;
    minValue?: number;
    maxValue?: number;
    value: number;
}

const NumberToggle = ({decreaseFunction, increaseFunction, minValue, maxValue, value}: NumberToggleProps) => {
    const getCanIncrease = () => maxValue ? value < maxValue : true;
    const getCanDecrease = () => minValue ? value > minValue : true;
    const [canIncrease, setCanIncrease] = useState(getCanIncrease());
    const [canDecrease, setCanDecrease] = useState(getCanDecrease());

    // Update button states when value or min/max values change
    useEffect(() => {
        setCanIncrease(getCanIncrease());
        setCanDecrease(getCanDecrease());
    }, [value, minValue, maxValue]);

    // Common style to prevent text selection
    const noSelectStyle = {
        userSelect: 'none' as const,
        WebkitUserSelect: 'none' as const,
        MozUserSelect: 'none' as const,
        msUserSelect: 'none' as const
    };

    return (
        <>
            <span
                onClick={() => {
                    if (canDecrease) {
                        decreaseFunction();
                    }
                }}
                data-testid="decrease-steps-button"
                style={noSelectStyle}
            >
                <FontAwesomeIcon
                    icon="circle-minus"
                    className={`figma-icon ${canDecrease ? 'figma-text-primary' : 'figma-text-secondary'}`}
                />
            </span>
            <span
                className="figma-text figma-pl-md figma-pr-md"
                data-testid="steps-count"
                style={noSelectStyle}
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
                style={noSelectStyle}
            >



                <FontAwesomeIcon
                    icon="circle-plus"
                    className={`figma-icon ${canIncrease ? 'figma-text-primary' : 'figma-text-secondary'}`}
                />
            </span>
        </>
    );
};

export default NumberToggle;
