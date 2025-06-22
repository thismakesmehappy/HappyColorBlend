import React, {forwardRef, useEffect, useState} from 'react';
import Swatch from "./swatchesInput/Swatch";
import useSwatchStore from "../store/useSwatchStore";
import TextAndInput from "./helpers/TextAndInput";
import {Type} from "react-figma-ui";
import {ClassAndStyle} from "@ui/interfaces/ClassAndStyle";

interface ShadeTintProps extends ClassAndStyle {
}

const ShadeTint = forwardRef<HTMLDivElement, ShadeTintProps>(
    ({className, style}, ref) => {
        const shade = useSwatchStore(state => state.getShade());
        const tint = useSwatchStore(state => state.getTint());
        const setShade = useSwatchStore(state => state.setShade);
        const setTint = useSwatchStore(state => state.setTint);
        const buildSwatches = useSwatchStore((state) => state.buildSwatches);
        const shadeTintRampName = useSwatchStore(state => state.getShadeTintRampName());
        const setShadeTintRampName = useSwatchStore(state => state.setShadeTintRampName);
        const [shadeName, setShadeName] = useState(shade.name);
        const [shadeColor, setShadeColor] = useState(shade.color);
        const [tintName, setTintName] = useState(tint.name);
        const [tintColor, setTintColor] = useState(tint.color);

        useEffect(() => {
            setShadeName(shade.name);
            setShadeColor(shade.color);
            setTintName(tint.name);
            setTintColor(tint.color);
        }, [shade, tint]);

        return (
            <div className={className}>
                {/* Shade-tint content */}
                <div className={"row"}>
                    <div className={"col col-6"}>
                        <Type className={"figma-subtitle"}>Shade — 0</Type>
                        <Swatch color={shadeColor} name={shadeName}
                                updateSwatch={function (color: string, name: string): void {
                                    setShade(color, name);
                                    buildSwatches();
                                }}
                                id={shade.id}
                        />
                    </div>
                    <div className={"col col-6"}>
                        <Type  className={"figma-subtitle"}>Tint — 1000</Type>
                        <Swatch color={tintColor} name={tintName}
                                updateSwatch={function (color: string, name: string): void {
                                    setTint(color, name);
                                    buildSwatches();
                                }}
                                id={tint.id}
                        />
                    </div>
                </div>

                {/* Shade-Tint Ramp Name Editor */}
                <div id="shade-tint-ramp-name" className={"row overflow-auto d-block text-wrap"}>
                    <Type className={"col col-12 figma-subtitle figma-mt-sm w-100 overflow-auto text-wrap"}>
                        What do we call the mix?
                    </Type>
                    <div className={"col col-12 w-100 d-block text-wrap"}>
                        <TextAndInput inputText={shadeTintRampName}
                                      setInputText={setShadeTintRampName} />
                    </div>
                </div>
            </div>
        );
    }
);

export default ShadeTint;
