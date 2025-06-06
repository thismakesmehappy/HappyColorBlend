import React from 'react';
import '../scss/column-layout.scss';
import Section from "./Section";
import useSwatchStore, {SwatchStoreSwatch} from "../store/useSwatchStore";
import SwatchGroupSwatches from "./swatchesOutput/SwatchGroupSwatches";
import {blendColor} from "../helpers/colorMethods";
import RowDivider from "./RowDivider";


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
            id="swatches"
            className={className}
            style={style}
        >
            <SwatchGroupSwatches colorName={tintColor.name} tokenName={tintColor.tokenName} color={tintColor.color}
                                 secondColorName={shadeColor.name} secondTokenName={shadeColor.tokenName}
                                 secondColor={shadeColor.color}
                                 swatches={toneRamp} />

            {swatches.map((primaryColor) =>
                <SwatchGroupSwatches color={primaryColor.base.color} colorName={primaryColor.base.name}
                                     swatches={primaryColor.swatches} tokenName={primaryColor.base.tokenName} />
            )}
            <div className={"sticky-bottom bg-white generate text-end"}>
                <div className={"divide"} />
                <button className={"btn figma-bg-primary figma-text-light figma-mr-md"}>Add Variables</button>
                <button className={"btn figma-bg-primary figma-text-light figma-mr-md"}>Add Styles</button>
                <button className={"btn figma-bg-primary figma-text-light"}>Create Swatches in Page</button>
            </div>
        </Section>
    );
};

export default SwatchesOutput;