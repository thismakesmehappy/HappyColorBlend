import React from 'react';
import '../scss/column-layout.scss';
import Section from "./Section";
import useSwatchStore, {SwatchStoreSwatch} from "../store/useSwatchStore";
import SwatchGroupSwatches from "./Swatches/SwatchGroupSwatches";
import {blendColor} from "../helpers/colorMethods";


interface SwatchesProps {
    className?: string;
    style?: React.CSSProperties;
}

const Swatches: React.FC<SwatchesProps> = ({className, style}) => {
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
            id="swatches"
            className={className}
            style={style}
        >
            <SwatchGroupSwatches colorName={"Neutrals"} swatches={toneRamp} />

            {swatches.map((primaryColor) =>
                <SwatchGroupSwatches color={primaryColor.base.color} colorName={primaryColor.base.name}
                                     swatches={primaryColor.swatches} />
            )}
        </Section>
    );
};

export default Swatches;