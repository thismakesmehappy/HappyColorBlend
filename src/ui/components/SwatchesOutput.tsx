import React from 'react';
import useSwatchStore from "../store/useSwatchStore";
import SwatchGroupSwatches from "@ui/components/SwatchesOutput/SwatchGroupSwatches";
import SwatchPrimitives from "@ui/components/SwatchesOutput/SwatchPrimitives";

interface SwatchesProps {
    className?: string;
    style?: React.CSSProperties;
}

const SwatchesOutput: React.FC<SwatchesProps> = ({className, style}) => {
    const swatches = useSwatchStore((state) => state.getSwatches());
    const lightColor = useSwatchStore((state) => state.getLight());
    const darkColor = useSwatchStore((state) => state.getDark());
    const isDarkStart = useSwatchStore((state) => state.getIsDarkStart());
    const neutralScaleName = useSwatchStore(state => state.getNeutralScaleName());
    const colorScale = useSwatchStore(state => state.getColorScale()); // Use getter instead
    const scaleStartColor = isDarkStart ? darkColor : lightColor;
    const scaleEndColor = isDarkStart ? lightColor : darkColor;
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
