import SwatchesOutput from "@ui/components/SwatchesOutput";
import {ClassAndStyle} from "@ui/interfaces/ClassAndStyle";
import React from "react";
import OutputButtons from "@ui/components/swatchesOutput/OutputButtons";
import FontAwesomeIcon from "./helpers/FontAwesomeIcon";
import TooltipWrapper from './helpers/TooltipWrapper';

interface SwatchesOutputProps extends ClassAndStyle {
}

const OutputSection = ({className, style}: SwatchesOutputProps) => {
    return (<div id="output-section" className={className}>
        <p className={"title"}>Results <TooltipWrapper
            content="Preview your generated color swatches"
            type="component"
            id="results-tooltip"
            placement={"bottom"}
        >
            <FontAwesomeIcon icon={"circle-question"}
                             className='figma-text-component' />
        </TooltipWrapper></p>
        <SwatchesOutput />
        <OutputButtons />

    </div>);
};

export default OutputSection;
