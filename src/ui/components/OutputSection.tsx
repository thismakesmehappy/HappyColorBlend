import SwatchesOutput from "@ui/components/SwatchesOutput";
import {ClassAndStyle} from "@ui/interfaces/ClassAndStyle";
import React from "react";
import OutputButtons from "@ui/components/swatchesOutput/OutputButtons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface SwatchesOutputProps extends ClassAndStyle {
}

const OutputSection = ({className, style}: SwatchesOutputProps) => {
    return (<div id="output-section" className={className}>
        <p className={"title"}>Results <FontAwesomeIcon icon={"circle-question"}
                                                        className='figma-text-component' /></p>
        <SwatchesOutput />
        <OutputButtons />

    </div>);
};

export default OutputSection;
