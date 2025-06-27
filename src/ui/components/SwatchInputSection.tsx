import ShadeTint from "@ui/components/ShadeTint";
import PrimaryColors from "@ui/components/PrimaryColors";
import {ClassAndStyle} from "@ui/interfaces/ClassAndStyle";
import RampNameEditor from "@ui/components/shadeTint/RampNameEditor";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import TooltipWrapper from './helpers/TooltipWrapper';

interface LeftColumnProps extends ClassAndStyle {
}

const SwatchInputSection = ({className, style}: LeftColumnProps) => {
    return (
        <div id="input-section" className={className}>
            <p className={"title"}>Primitives
                {/*    <TooltipWrapper*/}
                {/*    content="Configure your base colors and shades/tints to generate color swatches"*/}
                {/*    type="component"*/}
                {/*    id="primitives-tooltip"*/}
                {/*    placement={"bottom-start"}*/}
                {/*>*/}
                {/*    <FontAwesomeIcon icon={"circle-question"}*/}
                {/*                     className='figma-text-component' />*/}
                {/*</TooltipWrapper>*/}
            </p>
            <ShadeTint />
            <hr />
            <RampNameEditor />
            <hr />
            <PrimaryColors />
        </div>);
};

export default SwatchInputSection
