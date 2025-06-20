import React, {forwardRef, useEffect, useState} from 'react';
import '../scss/column-layout.scss';
import Section from './helpers/Section';
import useSwatchStore from "../store/useSwatchStore";
import SwatchSection from "./swatchesInput/SwatchSection";
import RampNameEditor from "./swatchesInput/RampNameEditor";

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
                    <SwatchSection
                        title="Shade"
                        stepValue="0"
                        color={shadeColor}
                        name={shadeName}
                        id={shade.id}
                        onUpdateSwatch={(color: string, name: string) => {
                            setShade(color, name);
                            buildSwatches();
                        }}
                    />
                    <SwatchSection
                        title="Tint"
                        stepValue="1000"
                        color={tintColor}
                        name={tintName}
                        id={tint.id}
                        onUpdateSwatch={(color: string, name: string) => {
                            setTint(color, name);
                            buildSwatches();
                        }}
                    />
                </div>

                {/* Shade-Tint Ramp Name Editor */}
                <RampNameEditor
                    rampName={shadeTintRampName}
                    onRampNameChange={setShadeTintRampName}
                />
            </Section>
        );
    }
);

export default ShadeTint;
