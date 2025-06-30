import React from "react";
import Help from "@ui/components/helpers/Help";

const OutputButtons = () => {
    return (<div className={"sticky-bottom figma-p-md bg-white d-flex justify-content-around"}>
        <button className={"btn btn-primary figma-bg-primary figma-text-light figma-mr-sm"}>Add Variables
        </button>
        <button className={"btn btn-primary figma-bg-primary figma-text-light figma-mr-sm"}>Add Styles</button>
        <button className={"btn btn-primary figma-bg-primary figma-text-light figma-mr-sm"}>Create Swatches</button>
        <Help
            content={"These buttons will create Figma variables, color styles, or swatch components from your generated color palette"}
            id="output-buttons-tooltip"
            placement={"top"} />

    </div>);
};

export default OutputButtons
