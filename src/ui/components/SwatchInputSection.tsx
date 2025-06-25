import ShadeTint from "@ui/components/ShadeTint";
import PrimaryColors from "@ui/components/PrimaryColors";
import {ClassAndStyle} from "@ui/interfaces/ClassAndStyle";
import RampNameEditor from "@ui/components/shadeTint/RampNameEditor";
import React from "react";

interface LeftColumnProps extends ClassAndStyle {
}

const SwatchInputSection = ({className, style}: LeftColumnProps) => {
    return (
        <div id="input-section" className={className}>
            <ShadeTint />
            <hr />
            <RampNameEditor />
            <hr />
            <PrimaryColors />
        </div>);
};

export default SwatchInputSection
