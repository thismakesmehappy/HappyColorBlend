import React, {useEffect, useState} from "react";
import useSwatchStore from "../../store/useSwatchStore";
import FontAwesomeIcon from "../helpers/FontAwesomeIcon";
import {ClassAndStyle} from "../../interfaces/ClassAndStyle";

export const EqualSteps = ({className = "", style = {}}: ClassAndStyle) => {
    const numberOfSteps = useSwatchStore((state) => state.numberOfSteps)
    const increaseSteps = useSwatchStore((state) => state.increaseSteps)
    const decreaseSteps = useSwatchStore((state) => state.decreaseSteps)
    const buildSwatches = useSwatchStore((state) => state.buildSwatches);
    const [canDecrease, updateCanDecrease] = useState(numberOfSteps > 3);

    useEffect(() => {
        updateCanDecrease(numberOfSteps > 3)
    }, [numberOfSteps]);
    return (
        <div className={className} style={style} data-testid="equal-steps">
            <span>Equal steps: </span>
            <span 
                onClick={() => {
                    decreaseSteps();
                    buildSwatches();
                }}
                data-testid="decrease-steps-button"
            >
                <FontAwesomeIcon icon={"circle-minus"}
                                className={`figma-icon ${canDecrease ? 'figma-text-primary' : 'figma-text-secondary'}`}
                />
            </span>
            <span className={"figma-text figma-pl-md figma-pr-md"} data-testid="steps-count">{numberOfSteps}</span>
            <span 
                onClick={() => {
                    increaseSteps();
                    buildSwatches();
                }}
                data-testid="increase-steps-button"
            >
                <FontAwesomeIcon icon={"circle-plus"} className={"figma-icon figma-text-primary"}
                />
            </span>
        </div>
    );
};

export default EqualSteps