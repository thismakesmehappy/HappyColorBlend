import TextAndInput from "@ui/components/helpers/TextAndInput";
import React from "react";
import useSwatchStore from "@ui/store/useSwatchStore";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import TooltipWrapper from '@ui/components/helpers/TooltipWrapper';

const RampNameEditor = () => {
    const shadeTintRampName = useSwatchStore(state => state.getShadeTintRampName());
    const setShadeTintRampName = useSwatchStore(state => state.setShadeTintRampName);

    return (<div id="shade-tint-ramp-name">
        <p className={"figma-subtitle"}>
            What do we call the mix? <TooltipWrapper
            content="Name for the gradation created by blending your shade and tint colors; if mixing black and white, this would be your gray"
            type="component"
            id="ramp-name-tooltip"
        >
            <FontAwesomeIcon icon={"circle-question"}
                             className='figma-text-component' />
        </TooltipWrapper>
        </p>
        <div>
            <TextAndInput inputText={shadeTintRampName}
                          setInputText={setShadeTintRampName}
            />
        </div>
    </div>);
};

export default RampNameEditor
