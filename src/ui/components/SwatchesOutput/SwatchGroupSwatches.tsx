import SwatchColorChip from "@ui/components/SwatchesOutput/SwatchColorChip";
import React from "react";
import {SwatchStoreSwatch} from "@ui/store/useSwatchStore";
import ChipOutput from "@ui/components/SwatchesOutput/ChipOutput";
import {computeTokenName} from "@ui/helpers/computeTokenName";
import useTokenNameStore from "../../store/useTokenNameStore";

interface SwatchGroupSwatchesProps {
    colorName: string;
    color?: string;
    swatches: SwatchStoreSwatch[];
    secondColor?: string;
}

const SwatchGroupSwatches = ({
                                 colorName,
                                 color,
                                 swatches,
                                 secondColor
                             }: SwatchGroupSwatchesProps) => {
    const caseTreatment = useTokenNameStore(state => state.caseTreatment)
    const spaceTreatment = useTokenNameStore(state => state.spaceTreatment)
    const leadingCharsCount = useTokenNameStore(state => state.leadingCharsCount)
    const separatorCharsCount = useTokenNameStore(state => state.separatorCharsCount)
    const leadingCharType = useTokenNameStore(state => state.leadingCharType)
    const separatorCharType = useTokenNameStore(state => state.separatorCharType)
    const colorTokenName = computeTokenName(
        colorName,
        caseTreatment,
        spaceTreatment,
        leadingCharsCount,
        separatorCharsCount,
        leadingCharType,
        separatorCharType,
        true // Always use separator in SwatchGroupSwatches
    );
    return (<div className={"swatch-group figma-mb-lg figma-pb-sm"} data-testid="swatch-group">
        <p className={"figma-subtitle"} data-testid="swatch-group-title">
            <ChipOutput color={color!} />

            <span className="selectable-text" data-testid="primary-color-info">#{color} |
                {secondColor && (
                    <span className="selectable-text" data-testid="secondary-color-info">
                    <ChipOutput color={secondColor!} className="figma-ml-sm" />
                    #{secondColor!} | </span>
                )}
                <span className="selectable-text"> {colorTokenName}<span
                    className={"figma-text-mid"}>500</span></span></span>
            <br />

        </p>
        <div className={`swatches-container`}
             data-testid="swatches-container">
            {swatches.map((swatch, index) => {
                    return (
                        <SwatchColorChip key={`${swatch.color}-${swatch.step}-${index}`} color={swatch.color}
                                         step={swatch.step} />
                    )
                }
            )}
        </div>
    </div>);
};

export default SwatchGroupSwatches
