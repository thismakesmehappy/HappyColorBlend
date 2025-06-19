import { ColorCalculationService } from './ColorCalculationService';
import { SwatchStoreInputSwatch, SwatchStoreSwatches } from '../store/useSwatchStore';

/**
 * Service for generating and managing color swatches
 */
export class SwatchGenerationService {
  /**
   * Builds swatches based on shade, tint, primary colors, and steps
   */
  static buildSwatches(
    shade: SwatchStoreInputSwatch,
    tint: SwatchStoreInputSwatch,
    primaryColors: SwatchStoreInputSwatch[],
    combinedSteps: Set<number>
  ): SwatchStoreSwatches[] {
    const swatches: SwatchStoreSwatches[] = [];
    const sortedSteps = this.sortSteps(combinedSteps);

    for (const primary of primaryColors) {
      const swatch: SwatchStoreSwatches = {
        base: primary,
        swatches: []
      };

      for (const step of sortedSteps) {
        const blendedColor = ColorCalculationService.blendColor(
          shade.color,
          tint.color,
          primary.color,
          step
        );

        swatch.swatches.push({
          color: blendedColor,
          step: step
        });
      }

      swatches.push(swatch);
    }

    return swatches;
  }

  /**
   * Combines equal steps and custom steps into a single sorted set
   */
  static combineSteps(equalSteps: number[], customSteps: Set<number>): Set<number> {
    const combined = new Set<number>();

    // Add equal steps
    equalSteps.forEach(step => combined.add(step));

    // Add custom steps
    customSteps.forEach(step => combined.add(step));

    return combined;
  }

  /**
   * Generates equal steps based on number of steps
   */
  static generateEqualSteps(numberOfSteps: number): number[] {
    const steps: number[] = [];
    const stepSize = 1000 / (numberOfSteps - 1);

    for (let i = 0; i < numberOfSteps; i++) {
      steps.push(Math.round(i * stepSize));
    }

    return steps;
  }

  /**
   * Validates if a step value is valid for custom steps
   */
  static validateCustomStep(
    step: number,
    existingCustomSteps: Set<number>,
    reservedSteps: number[] = [0, 500, 1000]
  ): { isValid: boolean; errorMessage?: string } {
    // Check range
    if (step < 1 || step > 999) {
      return {
        isValid: false,
        errorMessage: 'Custom step must be between 1 and 999'
      };
    }

    // Check if reserved
    if (reservedSteps.includes(step)) {
      return {
        isValid: false,
        errorMessage: 'Values 0, 500, and 1000 are already included by default'
      };
    }

    // Check if already exists
    if (existingCustomSteps.has(step)) {
      return {
        isValid: false,
        errorMessage: 'Custom step already exists'
      };
    }

    return { isValid: true };
  }

  /**
   * Sorts steps in ascending order
   */
  static sortSteps(steps: Set<number>): number[] {
    return Array.from(steps).sort((a, b) => a - b);
  }

  /**
   * Creates equal steps based on the number of steps
   * Calculates steps excluding 0 and 1000
   */
  static createSteps(numberOfSteps: number): number[] {
    let steps: number[] = [];

    // Calculate steps excluding 0 and 1000
    for (let i = 1; i <= numberOfSteps; i++) {
      const step = Math.round((i * 1000) / (numberOfSteps + 1));
      steps.push(step);
    }

    return steps;
  }

  /**
   * Adds a step to a set, sorts the steps, and returns a new set
   */
  static addStepToSet(step: number, existingSteps: Set<number>): Set<number> {
    // Convert to array, add new step, sort, and convert back to set
    const stepsArray = Array.from(existingSteps);
    stepsArray.push(step);
    stepsArray.sort((a, b) => a - b);
    return new Set(stepsArray);
  }
}
