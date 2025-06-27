import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import TooltipWrapper from '../helpers/TooltipWrapper';

const OutputButtons = () => {
    return (<div className={"sticky-bottom figma-p-md bg-white"}>
        <button className={"btn btn-primary figma-bg-primary figma-text-light figma-mr-sm"}>Add Variables
        </button>
        <button className={"btn btn-primary figma-bg-primary figma-text-light figma-mr-sm"}>Add Styles</button>
        <button className={"btn btn-primary figma-bg-primary figma-text-light figma-mr-sm"}>Create Swatches</button>
        <TooltipWrapper
            content="These buttons will create Figma variables, color styles, or swatch components from your generated color palette"
            type="component"
            id="output-buttons-tooltip"
            placement={"top-end"}
        >
            <FontAwesomeIcon icon={"circle-question"}
                             className='figma-text-component' />
        </TooltipWrapper>
    </div>);
};

export default OutputButtons
