import {ClassAndStyle} from "@ui/interfaces/ClassAndStyle";
import EqualSteps from "@ui/components/steps/EqualSteps";
import CustomSteps from "@ui/components/steps/CustomSteps";
import React from "react";
import Case from "@ui/components/tokenSettings/Case";
import Spaces from "@ui/components/tokenSettings/Spaces";
import Leading from "@ui/components/tokenSettings/Leading";
import Separator from "@ui/components/tokenSettings/Separator";
import "@ui/styles/bootstrap/bootstrap.scss"
import CustomStepBadges from "@ui/components/steps/CustomStepBadges";
import useSwatchStore from "@ui/store/useSwatchStore";
import Help from "@ui/components/helpers/Help";
import {getTooltipProps} from "@ui/constants/tooltips";


interface LeftColumnProps extends ClassAndStyle {
}

const SettingsColumn = ({className, style}: LeftColumnProps) => {
    const customSteps = useSwatchStore((state) => state.customSteps);
    return (
        <div id="settings-section" className={className}>
            <p className={"title"}>Options
                {/*    <TooltipWrapper*/}
                {/*    content="Configure how your color steps are generated and how design tokens are named"*/}
                {/*    type="component"*/}
                {/*    id="options-tooltip"*/}
                {/*    placement={"bottom"}*/}
                {/*>*/}
                {/*    <FontAwesomeIcon icon={"circle-question"}*/}
                {/*                     className='figma-text-component' />*/}
                {/*</TooltipWrapper>*/}
            </p>
            <span className="figma-subtitle">Equal Steps: </span>
            <EqualSteps className="figma-mb-sm figma-ml-xs d-inline-block" />
            <hr />
            <span className="figma-subtitle d-inline-block">Custom Steps: </span>
            <CustomSteps className="figma-ml-sm d-inline-block" />
            {customSteps.size > 0 && (
                <CustomStepBadges />
            )}
            <hr />
            <div className="figma-subtitle">Token Name Settings<Help
                {...getTooltipProps('TOKEN_SETTINGS')}
                className={"figma-ml-xs"}
            />
            </div>
            <Case />
            <Spaces />
            <Leading />
            <Separator />
            {/*<CleanVariables />*/}
            {/*<Settings />*/}

        </div>);
};

export default SettingsColumn
