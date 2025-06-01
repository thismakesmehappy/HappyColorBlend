import React, {useState} from 'react';
import '../scss/column-layout.scss';
import Section from "./Section";
import useSwatchStore from "../store/useSwatchStore";
import {hex} from 'wcag-contrast';


interface SwatchesProps {
    className?: string;
    style?: React.CSSProperties;
}

const Swatches: React.FC<SwatchesProps> = ({className, style}) => {
    const swatches = useSwatchStore((state) => state.getSwatches());
    const totalUniqueSteps = useSwatchStore((state) => state.getTotalUniqueSteps());
    const shouldPadZeros = useSwatchStore((state) => state.getShouldPadZeros());
    const tint = useSwatchStore((state) => state.getTint());
    const shade = useSwatchStore((state) => state.getShade());
    const [width, updateWidth] = useState(100 / totalUniqueSteps);
    return (
        <Section
            id="swatches"
            className={className}
            style={style}
        >
            {swatches.map((primaryColor) => {

                    return <div className={"swatch-group figma-mb-lg figma-pb-sm"}>
                        <p className={"figma-subtitle"}><strong>{primaryColor.base.name}</strong> {primaryColor.base.color}
                        </p>
                        <div className={"swatches-container"}>
                            {primaryColor.swatches.map((swatch, index) => {
                                const ratioTint = hex("#" + tint.color, "#" + swatch.color);
                                const ratioShade = hex("#" + shade.color, "#" + swatch.color);
                                let textColor = ratioTint > ratioShade ? "#" + tint.color : "#" + shade.color;
                                if (ratioTint < 3 && ratioShade < 3) {
                                    textColor = '#000000';
                                }


                                return (
                                    <div style={{width: width + "%"}}
                                         className='color-chip-container'>
                                        <div
                                            style={{backgroundColor: "#" + swatch.color, color: textColor}}
                                            className={`color-chip`}>
                                            {swatch.step.toString().padStart(shouldPadZeros ? 3 : 0, '0')}<br />
                                            #{swatch.color}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                }
            )}
        </Section>
    );
};

export default Swatches;