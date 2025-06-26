import ShadeTint from "@ui/components/ShadeTint";
import PrimaryColors from "@ui/components/PrimaryColors";
import {ClassAndStyle} from "@ui/interfaces/ClassAndStyle";
import RampNameEditor from "@ui/components/shadeTint/RampNameEditor";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface LeftColumnProps extends ClassAndStyle {
}

const SwatchInputSection = ({className, style}: LeftColumnProps) => {
    return (
        <div id="input-section" className={className}>
            <p className={"title"}>Primitives <FontAwesomeIcon icon={"circle-question"}
                                                               className='figma-text-component' /></p>
            <ShadeTint />
            <hr />
            <RampNameEditor />
            <hr />
            <PrimaryColors />
        </div>);
};

export default SwatchInputSection
