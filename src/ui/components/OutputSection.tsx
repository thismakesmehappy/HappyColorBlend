import SwatchesOutput from "@ui/components/SwatchesOutput";
import {ClassAndStyle} from "@ui/interfaces/ClassAndStyle";
import React from "react";

interface SwatchesOutputProps extends ClassAndStyle {
}

const OutputSection = ({className, style}: SwatchesOutputProps) => {
    return (<div id="output-section" className={className}>
        <SwatchesOutput />
        <div className={"sticky-bottom figma-p-md bg-white"}>
            <button className={"btn btn-primary figma-bg-primary figma-text-light figma-mr-md"}>Add Variables
            </button>
            <button className={"btn btn-primary figma-bg-primary figma-text-light figma-mr-md"}>Add Styles</button>
            <button className={"btn btn-primary figma-bg-primary figma-text-light"}>Create Swatches</button>
        </div>
    </div>);
};

export default OutputSection;
