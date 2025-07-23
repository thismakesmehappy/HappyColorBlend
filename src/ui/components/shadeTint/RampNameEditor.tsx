import TextAndInput from "@ui/components/helpers/TextAndInput";
import React from "react";
import useSwatchStore from "@ui/store/useSwatchStore";
import FontAwesomeIcon from "../helpers/FontAwesomeIcon";
import TooltipWrapper from '@ui/components/helpers/TooltipWrapper';
import Help from "@ui/components/helpers/Help";

const RampNameEditor = () => {
    const shadeTintRampName = useSwatchStore(state => state.getShadeTintRampName());
    const setShadeTintRampName = useSwatchStore(state => state.setShadeTintRampName);

    return (<div id="shade-tint-ramp-name">
        <p className={"figma-subtitle"}>
            What do we call the mix?
            <Help
                content="Name for the gradation created by blending your shade and tint colors; if mixing black and white, this would be your gray"
                id="ramp-name-tooltip"
                className={"figma-ml-xs"}
            />
        </p>
        <div>
            <TextAndInput inputText={shadeTintRampName}
                          setInputText={setShadeTintRampName}
            />
        </div>
    </div>);
};

export default RampNameEditor
