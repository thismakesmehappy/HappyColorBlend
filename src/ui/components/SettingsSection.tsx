import {ClassAndStyle} from "@ui/interfaces/ClassAndStyle";
import EqualSteps from "@ui/components/steps/EqualSteps";
import CustomSteps from "@ui/components/steps/CustomSteps";
import React from "react";
import Case from "@ui/components/tokenSettings/Case";
import Spaces from "@ui/components/tokenSettings/Spaces";
import Leading from "@ui/components/tokenSettings/Leading";
import Trailing from "@ui/components/tokenSettings/Trailing";
import "@ui/styles/bootstrap/bootstrap.scss"
import StepLabels from "@ui/components/steps/StepLabels";


interface LeftColumnProps extends ClassAndStyle {
}

const SettingsColumn = ({className, style}: LeftColumnProps) => {
    return (
        <div id="steps-section" className={className}>
            <EqualSteps className="figma-mb-sm" />
            <CustomSteps />
            <StepLabels />
            {/*<Steps />*/}
            <Case />
            <Spaces />
            <Leading />
            <Trailing />
            {/*<Settings />*/}
            <div className={"sticky-bottom bg-white generate text-end figma-p-md"}>
                <button className={"btn btn-primary figma-bg-primary figma-text-light figma-mr-md"}>Add Variables
                </button>
                <button className={"btn figma-bg-primary figma-text-light figma-mr-md"}>Add Styles</button>
                <button className={"btn figma-bg-primary figma-text-light"}>Create Swatches in Page</button>
            </div>
        </div>);
};

export default SettingsColumn
