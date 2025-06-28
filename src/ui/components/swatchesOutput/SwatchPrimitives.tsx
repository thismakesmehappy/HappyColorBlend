import useSwatchStore from "@ui/store/useSwatchStore";
import SwatchColorChip from "@ui/components/swatchesOutput/SwatchColorChip";
import React from "react";
import Swatch from "@ui/components/swatchesInput";
import useTokenNameStore from "@ui/store/useTokenNameStore";
import {computeTokenName} from "@ui/helpers/computeTokenName";

const SwatchPrimitives = () => {
    const tint = useSwatchStore(state => state.tint);
    const shade = useSwatchStore(state => state.shade);
    const primary = useSwatchStore(state => state.primaryColors);
    const caseTreatment = useTokenNameStore(state => state.caseTreatment)
    const spaceTreatment = useTokenNameStore(state => state.spaceTreatment)
    const leadingCharsCount = useTokenNameStore(state => state.leadingCharsCount)
    const trailingCharsCount = useTokenNameStore(state => state.trailingCharsCount)
    const leadingCharType = useTokenNameStore(state => state.leadingCharType)
    const trailingCharType = useTokenNameStore(state => state.trailingCharType)
    const tintColorToken = computeTokenName(
        tint.name,
        caseTreatment,
        spaceTreatment,
        leadingCharsCount,
        trailingCharsCount,
        leadingCharType,
        trailingCharType
    );

    const shadeColorToken = computeTokenName(
        shade.name,
        caseTreatment,
        spaceTreatment,
        leadingCharsCount,
        trailingCharsCount,
        leadingCharType,
        trailingCharType
    );

    return (<div className={"row gx-0 figma-mb-lg"}>
        <Swatch color={shade.color} name={shadeColorToken} displayOnly={true} className={'col col-4'} />
        <Swatch color={tint.color} name={tintColorToken} displayOnly={true} className={'col col-4'} />
        {primary.map((color) => {
            const colorTokenName = computeTokenName(
                color.name,
                caseTreatment,
                spaceTreatment,
                leadingCharsCount,
                trailingCharsCount,
                leadingCharType,
                trailingCharType
            );
            return <Swatch color={color.color} name={colorTokenName} displayOnly={true}
                           key={`${color.color}-${color.name}`}
                           className={'col col-4'} />
        })}
    </div>);
};

export default SwatchPrimitives
