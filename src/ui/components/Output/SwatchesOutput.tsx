import React from 'react';
import useSwatchStore from "../../store/useSwatchStore";
import SwatchGroupSwatches from "@ui/components/SwatchesOutput/SwatchGroupSwatches";
import SwatchPrimitives from "@ui/components/SwatchesOutput/SwatchPrimitives";

interface SwatchesProps {
    className?: string;
    style?: React.CSSProperties;
}

const SwatchesOutput: React.FC<SwatchesProps> = ({className, style}) => {
    const swatches = useSwatchStore((state) => state.swatches);
    const end = useSwatchStore((state) => state.scaleEnd);
    const start = useSwatchStore((state) => state.scaleStart);
    const neutralScaleName = useSwatchStore(state => state.neutralScaleName);
    const colorScale = useSwatchStore(state => state.colorScale);
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
                color={start.color}
                secondColor={end.color}
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
