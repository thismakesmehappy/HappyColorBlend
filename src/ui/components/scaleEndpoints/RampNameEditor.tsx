import TextAndInput from "@ui/components/helpers/TextAndInput";
import React from "react";
import useSwatchStore from "@ui/store/useSwatchStore";
import Help from "@ui/components/helpers/Help";
import {getTooltipProps} from "@ui/constants/tooltips";

const RampNameEditor = () => {
    const neutralScaleName = useSwatchStore(state => state.getNeutralScaleName());
    const setNeutralScaleName = useSwatchStore(state => state.setNeutralScaleName);

    return (<div id="shade-tint-ramp-name">
        <p className={"figma-subtitle"}>
            What do we call the neutral scale?
            <Help
                {...getTooltipProps('NEUTRAL_SCALE_NAME')}
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
