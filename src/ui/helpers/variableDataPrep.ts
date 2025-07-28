import { SwatchVariableData } from "@common/networkSides";
import { computeTokenName } from "./computeTokenName";
import { SwatchStoreState } from "../store/useSwatchStore";
import { TokenNameStoreState } from "../store/useTokenNameStore";

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

  // Prepare shade data
  const shade = {
    name: applyTokenName(swatchStore.shade.name, appendSeparatorToPrimitive),
    color: swatchStore.shade.color
  };

  // Prepare tint data
  const tint = {
    name: applyTokenName(swatchStore.tint.name, appendSeparatorToPrimitive),
    color: swatchStore.tint.color
  };

  // Prepare primary colors data
  const primaryColors = swatchStore.primaryColors.map(color => ({
    name: applyTokenName(color.name, appendSeparatorToPrimitive),
    color: color.color
  }));

  // Prepare shade-tint ramp name (no separator for subgroup names unless user wants them)
  const shadeTintRampName = applyTokenName(swatchStore.getShadeTintRampName(), false);

  // Prepare shade-tint ramp swatches using buildToneRamp() to respect gradient direction
  const shadeTintSwatches = swatchStore.buildToneRamp();

  // Prepare primary swatches
  const primarySwatches = swatchStore.getSwatches().map(primarySwatch => {
    const tokenizedName = applyTokenName(primarySwatch.base.name, false); // No separator for subgroup names
    
    return {
      name: tokenizedName,
      swatches: primarySwatch.swatches
    };
  });

  return {
    shade,
    tint,
    primaryColors,
    shadeTintRampName,
    shadeTintSwatches,
    primarySwatches,
    tokenSettings: {
      separatorCharsCount,
      separatorCharType
    }
  };
}