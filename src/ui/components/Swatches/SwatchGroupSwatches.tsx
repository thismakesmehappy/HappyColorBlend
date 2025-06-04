import SwatchColorChip from "./SwatchColorChip";
import React from "react";
import {SwatchStoreSwatch, SwatchStoreSwatches} from "../../store/useSwatchStore";

interface SwatchGroupSwatchesProps {
    colorName: string;
    color?: string;
    swatches: SwatchStoreSwatch[];
}

const SwatchGroupSwatches = ({colorName, color, swatches}: SwatchGroupSwatchesProps) => {
    return (<div className={"swatch-group figma-mb-lg figma-pb-sm"}>
        <p className={"figma-subtitle"}><strong>{colorName}</strong> {color}
        </p>
        <div className={"swatches-container"}>
            {swatches.map((swatch) =>
                <SwatchColorChip color={swatch.color} step={swatch.step} />
            )}
        </div>
    </div>);
};

export default SwatchGroupSwatches
