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

    const scaleStartColor = swatchStore.isDarkStart ? swatchStore.dark : swatchStore.light;
    const scaleEndColor = swatchStore.isDarkStart ? swatchStore.light : swatchStore.dark;

    // Prepare scale start data
    const scaleStart = {
        name: applyTokenName(scaleStartColor.name, appendSeparatorToPrimitive),
        color: scaleStartColor.color
    };

    // Prepare scale end data
    const scaleEnd = {
        name: applyTokenName(scaleEndColor.name, appendSeparatorToPrimitive),
        color: scaleEndColor.color
    };

    // Prepare primary colors data
    const primaryColors = swatchStore.primaryColors.map(color => ({
        name: applyTokenName(color.name, appendSeparatorToPrimitive),
        color: color.color
    }));

    // Prepare neutral scale name (no separator for subgroup names unless user wants them)
    const neutralScaleName = applyTokenName(swatchStore.getNeutralScaleName(), false);

    // Prepare neutral scale swatches using buildColorScale() for simplified logic
    const neutralScaleSwatches = swatchStore.buildColorScale();

    // Prepare primary swatches
    const primarySwatches = swatchStore.getSwatches().map(primarySwatch => {
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