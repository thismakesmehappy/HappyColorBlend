import React from 'react';
import '../scss/column-layout.scss';
import Section from "./helpers/Section";
import useSwatchStore, {SwatchStoreSwatch} from "../store/useSwatchStore";
import SwatchGroupSwatches from "./swatchesOutput/SwatchGroupSwatches";
import {blendColor} from "../helpers/colorMethods";


interface SwatchesProps {
    className?: string;
    style?: React.CSSProperties;
}

const SwatchesOutput: React.FC<SwatchesProps> = ({className, style}) => {
    const swatches = useSwatchStore((state) => state.getSwatches());
    const tintColor = useSwatchStore((state) => state.getTint());
    const shadeColor = useSwatchStore((state) => state.getShade());
    const combinedSteps: number[] = Array.from(useSwatchStore((state) => state.getCombinedSteps()));
    const toneRamp: SwatchStoreSwatch[] = combinedSteps.map((step) => {
        return {
            color: blendColor(shadeColor.color, tintColor.color, step),
            step: step,
        }
    });
    console.log(toneRamp);
    return (
        <Section
            className={className}
            style={style}
        >
            <SwatchGroupSwatches 
                key="tint-shade"
                colorName={tintColor.name} 
                color={tintColor.color}
                secondColorName={shadeColor.name}
                secondColor={shadeColor.color}
                swatches={toneRamp} 
            />

            {swatches.map((primaryColor) =>
                <SwatchGroupSwatches 
                    key={primaryColor.base.id}
                    color={primaryColor.base.color} 
                    colorName={primaryColor.base.name}
                    swatches={primaryColor.swatches} 
                />
            )}
        </Section>
    );
};

export default SwatchesOutput;
