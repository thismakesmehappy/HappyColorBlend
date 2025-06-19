import { useMemo } from 'react';
import { ColorCalculationService, SwatchGenerationService } from '../services';
import { SwatchStoreInputSwatch } from '../store/useSwatchStore';
import { createHexColor } from '../interfaces/ColorTypes';

/**
 * Custom hook for color calculations and swatch generation
 */
export const useColorCalculation = (
  shade: SwatchStoreInputSwatch,
  tint: SwatchStoreInputSwatch,
  primaryColors: SwatchStoreInputSwatch[],
  steps: number[],
  customSteps: Set<number>
) => {
  // Memoize combined steps calculation
  const combinedSteps = useMemo(() => {
    return SwatchGenerationService.combineSteps(steps, customSteps);
  }, [steps, customSteps]);

  // Memoize sorted steps for display
  const sortedSteps = useMemo(() => {
    return SwatchGenerationService.sortSteps(combinedSteps);
  }, [combinedSteps]);

  // Memoize swatch generation
  const swatches = useMemo(() => {
    return SwatchGenerationService.buildSwatches(
      shade,
      tint,
      primaryColors,
      combinedSteps
    );
  }, [shade, tint, primaryColors, combinedSteps]);

  // Utility functions
  const validateHexColor = (color: string) => {
    return ColorCalculationService.validateHexColor(color);
  };

  const generateRandomColor = () => {
    return ColorCalculationService.generateRandomColor();
  };

  const isLightColor = (color: string) => {
    return ColorCalculationService.isLightColor(createHexColor(color));
  };

  return {
    combinedSteps,
    sortedSteps,
    swatches,
    validateHexColor,
    generateRandomColor,
    isLightColor,
  };
};
