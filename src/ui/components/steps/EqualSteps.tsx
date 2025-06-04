import React, {useEffect, useState} from "react";
import useSwatchStore from "../../store/useSwatchStore";
import FontAwesomeIcon from "../helpers/FontAwesomeIcon";

export const EqualSteps = () => {
    const numberOfSteps = useSwatchStore((state) => state.numberOfSteps)
    const increaseSteps = useSwatchStore((state) => state.increaseSteps)
    const decreaseSteps = useSwatchStore((state) => state.decreaseSteps)
    const buildSwatches = useSwatchStore((state) => state.buildSwatches);
    const [canDecrease, updateCanDecrease] = useState(numberOfSteps > 3);

    useEffect(() => {
        updateCanDecrease(numberOfSteps > 3)
    }, [numberOfSteps]);
    return (
        <div>
            <span>Equal steps: </span>
            <span onClick={() => {
                decreaseSteps();
                buildSwatches();
            }}>
            <FontAwesomeIcon icon={"circle-minus"}
                             className={`figma-icon ${canDecrease ? 'figma-text-primary' : 'figma-text-secondary'}`}
            />
        </span>
            <span className={"figma-text figma-pl-md figma-pr-md"}>{numberOfSteps}</span>
            <span onClick={() => {
                increaseSteps();
                buildSwatches();
            }}>
            <FontAwesomeIcon icon={"circle-plus"} className={"figma-icon figma-text-primary"}
            />
            </span>
        </div>
    );
};

export default EqualSteps