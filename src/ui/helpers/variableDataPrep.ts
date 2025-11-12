import {SwatchVariableData} from "@common/networkSides";
import {computeTokenName} from "./computeTokenName";
import {SwatchStoreState} from "../store/useSwatchStore";
import {TokenNameStoreState} from "../store/useTokenNameStore";

/**
 * Prepare swatch data for variable creation with token naming applied
 */
export function prepareSwatchVariableData(
    swatchStore: SwatchStoreState,
    tokenStore: Omit<TokenNameStoreState, keyof { resetToDefaults: () => void }>
): SwatchVariableData {
    const {
        caseTreatment,
        spaceTreatment,
        leadingCharsCount,
        separatorCharsCount,
        leadingCharType,
        separatorCharType,
        appendSeparatorToPrimitive
    } = tokenStore;

    // Helper function to apply token naming
    const applyTokenName = (name: string, includeSeparator: boolean = true) => {
        return computeTokenName(
            name,
            caseTreatment,
            spaceTreatment,
            leadingCharsCount,
            separatorCharsCount,
            leadingCharType,
            separatorCharType,
            includeSeparator
        );
    };

    // Prepare scale start data
    const scaleStart = {
        name: applyTokenName(swatchStore.scaleStart.name, appendSeparatorToPrimitive),
        color: swatchStore.scaleStart.color
    };

    // Prepare scale end data
    const scaleEnd = {
        name: applyTokenName(swatchStore.scaleEnd.name, appendSeparatorToPrimitive),
        color: swatchStore.scaleEnd.color
    };

    // Prepare primary colors data
    const primaryColors = swatchStore.primaryColors.map(color => ({
        name: applyTokenName(color.name, appendSeparatorToPrimitive),
        color: color.color
    }));

    // Prepare neutral scale name (no separator for subgroup names unless user wants them)
    const neutralScaleName = applyTokenName(swatchStore.neutralScaleName, false);

    // Prepare neutral scale swatches using buildColorScale() for simplified logic
    swatchStore.buildColorScale();
    const neutralScaleSwatches = swatchStore.colorScale;

    // Prepare primary swatches
    const primarySwatches = swatchStore.swatches.map(primarySwatch => {
        const tokenizedName = applyTokenName(primarySwatch.base.name, false); // No separator for subgroup names

        return {
            name: tokenizedName,
            swatches: primarySwatch.swatches
        };
    });

    return {
        // Scale properties
        scaleStart,
        scaleEnd,
        neutralScaleName,
        neutralScaleSwatches,
        // Common properties
        primaryColors,
        primarySwatches,
        tokenSettings: {
            separatorCharsCount,
            separatorCharType
        }
    };
}