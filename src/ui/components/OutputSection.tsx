import SwatchesOutput from "@ui/components/SwatchesOutput";
import {ClassAndStyle} from "@ui/interfaces/ClassAndStyle";
import React from "react";
import OutputButtons from "@ui/components/swatchesOutput/OutputButtons";
import Help from "@ui/components/helpers/Help";
import {getTooltipProps} from "@ui/constants/tooltips";
import StepsSection from "@ui/components/tokenSettings/StepsSection";

interface SwatchesOutputProps extends ClassAndStyle {
}

const OutputSection = ({className, style}: SwatchesOutputProps) => {
    return (<div id="output-section" className={className + " show-scroll"}>
        <SwatchesOutput />
    </div>);
};

export default OutputSection;
