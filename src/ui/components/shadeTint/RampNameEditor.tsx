import TextAndInput from "@ui/components/helpers/TextAndInput";
import React from "react";
import useSwatchStore from "@ui/store/useSwatchStore";
import FontAwesomeIcon from "../helpers/FontAwesomeIcon";
import TooltipWrapper from '@ui/components/helpers/TooltipWrapper';
import Help from "@ui/components/helpers/Help";

const RampNameEditor = () => {
    const neutralScaleName = useSwatchStore(state => state.getNeutralScaleName());
    const setNeutralScaleName = useSwatchStore(state => state.setNeutralScaleName);

    return (<div id="shade-tint-ramp-name">
        <p className={"figma-subtitle"}>
            What do we call the neutral scale?
            <Help
                content="Name for the gradation created by blending your start and end colors; if mixing black and white, this would be your gray scale"
                id="ramp-name-tooltip"
                className={"figma-ml-xs"}
            />
        </p>
        <div>
            <TextAndInput inputText={neutralScaleName}
                          setInputText={setNeutralScaleName}
            />
        </div>
    </div>);
};

export default RampNameEditor
