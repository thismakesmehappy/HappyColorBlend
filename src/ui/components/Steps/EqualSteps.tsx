import React from "react";
import useSwatchStore from "../../store/useSwatchStore";
import {ClassAndStyle} from "@ui/interfaces/ClassAndStyle";
import NumberToggle from "../helpers/NumberToggle";
import Help from "@ui/components/helpers/Help";
import {getTooltipProps} from "@ui/constants/tooltips";

export const EqualSteps = ({className = "", style = {}, id}: ClassAndStyle) => {
    const numberOfSteps = useSwatchStore((state) => state.numberOfSteps);
    const increaseSteps = useSwatchStore((state) => state.increaseSteps);
    const decreaseSteps = useSwatchStore((state) => state.decreaseSteps);
    const buildSwatches = useSwatchStore((state) => state.buildSwatches);
    const buildColorScale = useSwatchStore((state) => state.buildColorScale);

    const handleDecrease = () => {
        decreaseSteps();
        buildSwatches();
        buildColorScale();
    };

    const handleIncrease = () => {
        increaseSteps();
        buildSwatches();
        buildColorScale();
    };

    return (
        <div className={className} style={style} data-testid="equal-steps" id={id}>
            <NumberToggle
                decreaseFunction={handleDecrease}
                increaseFunction={handleIncrease}
                value={numberOfSteps}
                minValue={3}
                className="figma-mb-sm"
            />
        </div>
    );
};

export default EqualSteps;
