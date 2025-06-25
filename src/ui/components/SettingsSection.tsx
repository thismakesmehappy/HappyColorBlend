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


interface LeftColumnProps extends ClassAndStyle {
}

const SettingsColumn = ({className, style}: LeftColumnProps) => {
    const customSteps = useSwatchStore((state) => state.customSteps);
    return (
        <div id="settings-section" className={className}>
            <div className="figma-subtitle">Equal Steps</div>
            <EqualSteps className="figma-mb-sm" />
            <EqualStepsBadges />
            <hr />
            <div className="figma-subtitle">Custom Steps</div>

            <CustomSteps />
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
