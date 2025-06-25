import TextAndInput from "@ui/components/helpers/TextAndInput";
import React from "react";
import useSwatchStore from "@ui/store/useSwatchStore";

const RampNameEditor = () => {
    const shadeTintRampName = useSwatchStore(state => state.getShadeTintRampName());
    const setShadeTintRampName = useSwatchStore(state => state.setShadeTintRampName);

    return (<div id="shade-tint-ramp-name">
        <p className={"figma-subtitle"}>
            What do we call the mix?
        </p>
        <div>
            <TextAndInput inputText={shadeTintRampName}
                          setInputText={setShadeTintRampName}
            />
        </div>
    </div>);
};

export default RampNameEditor
