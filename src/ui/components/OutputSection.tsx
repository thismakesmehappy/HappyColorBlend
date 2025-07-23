import SwatchesOutput from "@ui/components/SwatchesOutput";
import {ClassAndStyle} from "@ui/interfaces/ClassAndStyle";
import React from "react";
import OutputButtons from "@ui/components/swatchesOutput/OutputButtons";
import FontAwesomeIcon from "./helpers/FontAwesomeIcon";
import TooltipWrapper from './helpers/TooltipWrapper';
import Help from "@ui/components/helpers/Help";

interface SwatchesOutputProps extends ClassAndStyle {
}

const OutputSection = ({className, style}: SwatchesOutputProps) => {
    return (<div id="output-section" className={className}>
        <p className={"title"}>Results<Help content={"Preview your generated color swatches"}
                                            id="results-tooltip"
                                            placement={"bottom"}
                                            className={"figma-ml-xs"}
        />
        </p>
        <SwatchesOutput />
        <OutputButtons />

    </div>);
};

export default OutputSection;
