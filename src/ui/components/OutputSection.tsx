import SwatchesOutput from "@ui/components/SwatchesOutput";
import {ClassAndStyle} from "@ui/interfaces/ClassAndStyle";
import React from "react";
import OutputButtons from "@ui/components/swatchesOutput/OutputButtons";
import Help from "@ui/components/helpers/Help";
import {getTooltipProps} from "@ui/constants/tooltips";

interface SwatchesOutputProps extends ClassAndStyle {
}

const OutputSection = ({className, style}: SwatchesOutputProps) => {
    return (<div id="output-section" className={className}>
        <p className={"title"}>Results<Help {...getTooltipProps('PREVIEW_SWATCHES')}
                                            className={"figma-ml-xs"}
        />
        </p>
        <SwatchesOutput />
        <OutputButtons />

    </div>);
};

export default OutputSection;
