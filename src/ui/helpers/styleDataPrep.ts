import { SwatchStyleData } from "@common/networkSides";
import { SwatchStoreState } from "../store/useSwatchStore";
import { TokenNameStoreState } from "../store/useTokenNameStore";
import { prepareSwatchVariableData } from "./variableDataPrep";

/**
 * Prepare swatch data for style creation with token naming applied
 * 
 * Since SwatchStyleData has the same structure as SwatchVariableData,
 * we can reuse the existing data preparation logic.
 */
export function prepareSwatchStyleData(
  swatchStore: SwatchStoreState,
  tokenStore: Omit<TokenNameStoreState, keyof { resetToDefaults: () => void }>
): SwatchStyleData {
  // The data preparation logic is identical for styles and variables
  // since both use the same token naming and data structure
  return prepareSwatchVariableData(swatchStore, tokenStore) as SwatchStyleData;
}