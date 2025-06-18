import SwatchColorChip from "./SwatchColorChip";
import React from "react";
import {SwatchStoreSwatch, SwatchStoreSwatches} from "../../store/useSwatchStore";
import ChipOutput from "./ChipOutput";
import {CaseTreatment, CharType, computeTokenName, SpaceTreatment} from "../../helpers/computeTokenName";
import useTokenNameStore from "../../store/useTokenNameStore";

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
    const caseTreatment = useTokenNameStore(state => state.caseTreatment)
    const spaceTreatment = useTokenNameStore(state => state.spaceTreatment)
    const leadingCharsCount = useTokenNameStore(state => state.leadingCharsCount)
    const trailingCharsCount = useTokenNameStore(state => state.trailingCharsCount)
    const leadingCharType = useTokenNameStore(state => state.leadingCharType)
    const trailingCharType = useTokenNameStore(state => state.trailingCharType)
    const colorTokenName = computeTokenName(
        colorName,
        caseTreatment,
        spaceTreatment,
        leadingCharsCount,
        trailingCharsCount,
        leadingCharType,
        trailingCharType
    );
    const secondColorTokenName = secondColorName && computeTokenName(
        secondColorName,
        caseTreatment,
        spaceTreatment,
        leadingCharsCount,
        trailingCharsCount,
        leadingCharType,
        trailingCharType
    );
    return (<div className={"swatch-group figma-mb-lg figma-pb-sm"} data-testid="swatch-group">
        <p className={"figma-subtitle"} data-testid="swatch-group-title">
            <ChipOutput color={color!} />

            <span data-testid="primary-color-info">#{color} | {colorTokenName}<span
                className={"figma-text-mid"}>500</span></span>
            <br />
            {secondColorName && (
                <span data-testid="secondary-color-info">
                    <ChipOutput color={secondColor!} />
                    #{secondColor} | {secondColorTokenName}<span className={"figma-text-mid"}>500</span>
                </span>
            )}
        </p>
        <div className={"swatches-container"} data-testid="swatches-container">
            {swatches.map((swatch, index) =>
                <SwatchColorChip key={`${swatch.color}-${swatch.step}-${index}`} color={swatch.color}
                                 step={swatch.step} />
            )}
        </div>
    </div>);
};

export default SwatchGroupSwatches
