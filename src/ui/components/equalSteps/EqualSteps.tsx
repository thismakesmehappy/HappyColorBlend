import React from "react";
import useSwatchStore from "../../store/useSwatchStore";
import FontAwesomeIcon from "../helpers/FontAwesomeIcon";

export const EqualSteps = () => {
    const numberOfSteps = useSwatchStore((state) => state.numberOfSteps)
    const increaseSteps = useSwatchStore((state) => state.increaseSteps)
    const decreaseSteps = useSwatchStore((state) => state.decreaseSteps)
    return (
        <div><span onClick={decreaseSteps}>
            <FontAwesomeIcon icon={"circle-minus"} className={"figma-icon figma-text-primary"}
            />
        </span>
            <span onClick={increaseSteps}
                  className={"figma-text figma-pl-md figma-pr-md"}>{numberOfSteps}</span>
            <span onClick={increaseSteps}>
            <FontAwesomeIcon icon={"circle-plus"} className={"figma-icon figma-text-primary"}
            />
            </span>
        </div>
    );
};

export default EqualSteps