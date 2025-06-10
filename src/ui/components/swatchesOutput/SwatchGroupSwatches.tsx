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
    return (<div className={"swatch-group figma-mb-lg figma-pb-sm"}>
        <p className={"figma-subtitle"}><ChipOutput
            color={color!} />#{color} | {tokenName}<span className={"figma-text-mid"}>500</span><br />
            {secondColorName &&
                <><ChipOutput
                    color={secondColor!} />#{secondColor} | {secondTokenName}<span
                    className={"figma-text-mid"}>500</span></>
            }
        </p>
        <div className={"swatches-container"}>
            {swatches.map((swatch) =>
                <SwatchColorChip color={swatch.color} step={swatch.step} />
            )}
        </div>
    </div>);
};

export default SwatchGroupSwatches
