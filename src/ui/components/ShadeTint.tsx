import React, {forwardRef, useEffect, useState} from 'react';
import '../scss/column-layout.scss';
import Section from './helpers/Section';
import Swatch from "./swatchesInput/Swatch";
import useSwatchStore from "../store/useSwatchStore";
import TextAndInput from "./helpers/TextAndInput";

interface ShadeTintProps {
    className?: string;
    style?: React.CSSProperties;
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
            <Section
                id="shade-tint"
                className={className}
                ref={ref}
                style={style}
            >
                {/* Shade-tint content */}
                <div className={"row"}>
                    <div className={"col col-6"}>
                        <p className={"figma-subtitle"}>Shade — 0</p>
                        <Swatch color={shadeColor} name={shadeName}
                                updateSwatch={function (color: string, name: string): void {
                                    setShade(color, name);
                                    buildSwatches();
                                }}
                                id={shade.id}
                        />
                    </div>
                    <div className={"col col-6"}>
                        <p className={"figma-subtitle"}>Tint — 1000</p>
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
                    <div className={"col col-12 figma-subtitle figma-mt-sm w-100 overflow-auto text-wrap"}>
                        What do we call the mix?
                    </div>
                    <div className={"col col-12 w-100 d-block text-wrap"}>
                        <TextAndInput inputText={shadeTintRampName}
                                      setInputText={setShadeTintRampName} />
                    </div>
                </div>
            </Section>
        );
    }
);

export default ShadeTint;
