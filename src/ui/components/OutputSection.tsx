import SwatchesOutput from "@ui/components/SwatchesOutput";
import {ClassAndStyle} from "@ui/interfaces/ClassAndStyle";
import React from "react";
import OutputButtonsFooter from "@ui/components/OutputButtonsFooter/OutputButtonsFooter";

// TODO: Refactor to an Output directory

interface SwatchesOutputProps extends ClassAndStyle {
}

const OutputSection = ({className, style}: SwatchesOutputProps) => {
    return (<div id="output-section" className={className + " show-scroll"}>
        <SwatchesOutput className={"show-scroll"} />
        <OutputButtonsFooter />
    </div>);
};

export default OutputSection;
