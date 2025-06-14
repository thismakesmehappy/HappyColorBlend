import SwatchColorChip from "./SwatchColorChip";
import React from "react";
import {SwatchStoreSwatch, SwatchStoreSwatches} from "../../store/useSwatchStore";
import ChipOutput from "./ChipOutput";

interface SwatchGroupSwatchesProps {
    colorName: string;
    color?: string;
    swatches: SwatchStoreSwatch[];
    tokenName?: string;
    secondColorName?: string;
    secondColor?: string;
    secondTokenName?: string;
}

const SwatchGroupSwatches = ({
                                 colorName,
                                 color,
                                 swatches,
                                 tokenName,
                                 secondTokenName,
                                 secondColorName,
                                 secondColor
                             }: SwatchGroupSwatchesProps) => {
    return (<div className={"swatch-group figma-mb-lg figma-pb-sm"} data-testid="swatch-group">
        <p className={"figma-subtitle"} data-testid="swatch-group-title">
            <ChipOutput color={color!} />
            <span data-testid="primary-color-info">#{color} | {tokenName}<span className={"figma-text-mid"}>500</span></span>
            <br />
            {secondColorName && (
                <span data-testid="secondary-color-info">
                    <ChipOutput color={secondColor!} />
                    #{secondColor} | {secondTokenName}<span className={"figma-text-mid"}>500</span>
                </span>
            )}
        </p>
        <div className={"swatches-container"} data-testid="swatches-container">
            {swatches.map((swatch, index) =>
                <SwatchColorChip key={`${swatch.color}-${swatch.step}-${index}`} color={swatch.color} step={swatch.step} />
            )}
        </div>
    </div>);
};

export default SwatchGroupSwatches
