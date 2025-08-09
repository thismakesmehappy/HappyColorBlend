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
    const scaleEndColor = useSwatchStore((state) => state.getScaleEnd());
    const scaleStartColor = useSwatchStore((state) => state.getScaleStart());
    const neutralScaleName = useSwatchStore(state => state.getNeutralScaleName());
    const buildColorScale = useSwatchStore(state => state.buildColorScale);
    const colorScale = buildColorScale();
    return (
        <div
            className={className}
            style={style}
            id="swatches-output"
            data-testid="swatches-output"
        >
            <SwatchPrimitives />
            <SwatchGroupSwatches
                key="neutral-scale"
                colorName={neutralScaleName}
                color={scaleEndColor.color}
                secondColor={scaleStartColor.color}
                swatches={colorScale}
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
