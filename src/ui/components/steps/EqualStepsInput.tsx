import React, {useEffect, useState} from "react";
import useSwatchStore from "../../store/useSwatchStore";
import {ClassAndStyle} from "../../interfaces/ClassAndStyle";
import NumberToggle from "../helpers/NumberToggle";

export const EqualStepsInput = ({className = "", style = {}}: ClassAndStyle) => {
    const numberOfSteps = useSwatchStore((state) => state.numberOfSteps);
    const increaseSteps = useSwatchStore((state) => state.increaseSteps);
    const decreaseSteps = useSwatchStore((state) => state.decreaseSteps);
    const buildSwatches = useSwatchStore((state) => state.buildSwatches);

    const handleDecrease = () => {
        decreaseSteps();
        buildSwatches();
    };

    const handleIncrease = () => {
        increaseSteps();
        buildSwatches();
    };

    return (
        <div className={className} style={style} data-testid="equal-steps">
            <span>Equal steps: </span>
            <NumberToggle
                decreaseFunction={handleDecrease}
                increaseFunction={handleIncrease}
                value={numberOfSteps}
                minValue={3}
            />
        </div>
    );
};

export default EqualStepsInput;
