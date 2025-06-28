import React from 'react';
import useSwatchStore, {SwatchStoreSwatch} from "../store/useSwatchStore";
import SwatchGroupSwatches from "./swatchesOutput/SwatchGroupSwatches";
import {blendColor} from "../helpers/colorMethods";
import OutputButtons from "@ui/components/swatchesOutput/OutputButtons";
import SwatchPrimitives from "@ui/components/swatchesOutput/SwatchPrimitives";


interface SwatchesProps {
    className?: string;
    style?: React.CSSProperties;
}

const SwatchesOutput: React.FC<SwatchesProps> = ({className, style}) => {
    const swatches = useSwatchStore((state) => state.getSwatches());
    const tintColor = useSwatchStore((state) => state.getTint());
    const shadeColor = useSwatchStore((state) => state.getShade());
    const combinedSteps: number[] = Array.from(useSwatchStore((state) => state.getCombinedSteps()));
    const shadeTintRampName = useSwatchStore(state => state.getShadeTintRampName());
    const toneRamp: SwatchStoreSwatch[] = combinedSteps.map((step) => {
        return {
            color: blendColor(shadeColor.color, tintColor.color, step),
            step: step,
        }
    });
    return (
        <div
            className={className}
            style={style}
            id="swatches-output"
            data-testid="swatches-output"
        >
            <SwatchPrimitives />
            <SwatchGroupSwatches
                key="tint-shade"
                colorName={shadeTintRampName}
                color={tintColor.color}
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
        </div>
    );
};

export default SwatchesOutput;
