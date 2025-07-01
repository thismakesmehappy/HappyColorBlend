import { SwatchCreationData } from "@common/networkSides";
import { SwatchStoreState } from "../store/useSwatchStore";
import { TokenNameStoreState } from "../store/useTokenNameStore";
import { prepareSwatchVariableData } from "./variableDataPrep";

/**
 * Prepare swatch data for visual swatch creation on the pasteboard
 * 
 * Since SwatchCreationData has the same core structure as SwatchVariableData,
 * we can reuse the existing data preparation logic and add display settings.
 */
export function prepareSwatchCreationData(
  swatchStore: SwatchStoreState,
  tokenStore: Omit<TokenNameStoreState, keyof { resetToDefaults: () => void }>,
  displaySettings?: {
    displayWidth?: number;
    swatchSize?: number;
    fontSize?: number;
  }
): SwatchCreationData {
  // Reuse the existing variable data preparation logic
  const baseData = prepareSwatchVariableData(swatchStore, tokenStore);
  
  // Add display settings for swatch creation
  return {
    ...baseData,
    displayWidth: displaySettings?.displayWidth,
    swatchSize: displaySettings?.swatchSize,
    fontSize: displaySettings?.fontSize
  };
}