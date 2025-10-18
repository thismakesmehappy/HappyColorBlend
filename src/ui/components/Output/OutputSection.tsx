import SwatchesOutput from "@ui/components/Output/SwatchesOutput";
import {ClassAndStyle} from "@ui/interfaces/ClassAndStyle";
import React from "react";
import OutputButtonsFooter from "@ui/components/OutputButtonsFooter/OutputButtonsFooter";


interface SwatchesOutputProps extends ClassAndStyle {
}

const OutputSection = ({className, style}: SwatchesOutputProps) => {
    return (<div id="output-section" className={className + " show-scroll"}>
        <SwatchesOutput className={"show-scroll"} />
        <OutputButtonsFooter />
    </div>);
};

export default OutputSection;
