import {ClassAndStyle} from "@ui/interfaces/ClassAndStyle";
import EqualSteps from "@ui/components/steps/EqualSteps";
import CustomSteps from "@ui/components/steps/CustomSteps";
import React from "react";
import Case from "@ui/components/tokenSettings/Case";
import Spaces from "@ui/components/tokenSettings/Spaces";
import Leading from "@ui/components/tokenSettings/Leading";
import Trailing from "@ui/components/tokenSettings/Trailing";
import "@ui/styles/bootstrap/bootstrap.scss"
import EqualStepsBadges from "@ui/components/steps/EqualStepsBadges";
import CustomStepBadges from "@ui/components/steps/CustomStepBadges";
import useSwatchStore from "@ui/store/useSwatchStore";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


interface LeftColumnProps extends ClassAndStyle {
}

const SettingsColumn = ({className, style}: LeftColumnProps) => {
    const customSteps = useSwatchStore((state) => state.customSteps);
    return (
        <div id="settings-section" className={className}>
            <p className={"title"}>Options <FontAwesomeIcon icon={"circle-question"}
                                                            className='figma-text-component' /></p>
            <span className="figma-subtitle">Equal Steps: </span>
            <EqualSteps className="figma-mb-sm figma-ml-xs d-inline-block" />
            <hr />
            <span className="figma-subtitle d-inline-block">Custom Steps: </span>
            <CustomSteps className="figma-ml-sm d-inline-block" />
            {customSteps.size > 0 && (
                <CustomStepBadges />
            )}
            <hr />
            <div className="figma-subtitle">Token Name Settings</div>
            <Case />
            <Spaces />
            <Leading />
            <Trailing />
            {/*<Settings />*/}

        </div>);
};

export default SettingsColumn
