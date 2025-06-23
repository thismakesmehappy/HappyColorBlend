import {Type} from "react-figma-ui";
import TextAndInput from "@ui/components/helpers/TextAndInput";
import React from "react";
import useSwatchStore from "@ui/store/useSwatchStore";

const RampNameEditor = () => {
    const shadeTintRampName = useSwatchStore(state => state.getShadeTintRampName());
    const setShadeTintRampName = useSwatchStore(state => state.setShadeTintRampName);

    return (<div id="shade-tint-ramp-name" className={"row overflow-auto d-block text-wrap"}>
        <Type className={"col col-12 figma-subtitle figma-mt-sm w-100 overflow-auto text-wrap"}>
            What do we call the mix?
        </Type>
        <div className={"col col-12 w-100 d-block text-wrap"}>
            <TextAndInput inputText={shadeTintRampName}
                          setInputText={setShadeTintRampName}
            />
        </div>
    </div>);
};

export default RampNameEditor
