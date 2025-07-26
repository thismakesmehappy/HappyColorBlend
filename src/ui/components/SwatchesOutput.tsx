import React from 'react';
import useSwatchStore from "../store/useSwatchStore";
import SwatchGroupSwatches from "./swatchesOutput/SwatchGroupSwatches";
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
    const shadeTintRampName = useSwatchStore(state => state.getShadeTintRampName());
    const buildToneRamp = useSwatchStore(state => state.buildToneRamp);
    const toneRamp = buildToneRamp();
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
