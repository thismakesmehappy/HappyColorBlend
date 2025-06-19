import { v4 as uuidv4 } from 'uuid';
import ColorNamer from 'color-namer';
import { ColorCalculationService } from './ColorCalculationService';
import { SwatchStoreInputSwatch } from '../store/useSwatchStore';

/**
 * Service for managing primary colors
 */
export class PrimaryColorService {
  /**
   * Creates a new primary color with random color and generated name
   */
  static createRandomPrimaryColor(): SwatchStoreInputSwatch {
    const randomColor = ColorCalculationService.generateRandomColor();
    const colorName = this.generateColorName(randomColor);
    
    return {
      color: randomColor,
      name: colorName,
      id: uuidv4(),
    };
  }

  /**
   * Creates a primary color with specified color and auto-generated name
   */
  static createPrimaryColor(color: string, customName?: string): SwatchStoreInputSwatch {
    const colorName = customName || this.generateColorName(color);
    
    return {
      color: color.toUpperCase(),
      name: colorName,
      id: uuidv4(),
    };
  }

  /**
   * Updates an existing primary color
   */
  static updatePrimaryColor(
    existingColor: SwatchStoreInputSwatch,
    newColor: string,
    newName?: string
  ): SwatchStoreInputSwatch {
    return {
      ...existingColor,
      color: newColor.toUpperCase(),
      name: newName || this.generateColorName(newColor),
    };
  }

  /**
   * Validates a primary color
   */
  static validatePrimaryColor(color: string): { isValid: boolean; errorMessage?: string } {
    if (!ColorCalculationService.validateHexColor(color)) {
      return {
        isValid: false,
        errorMessage: 'Invalid hex color format'
      };
    }

    return { isValid: true };
  }

  /**
   * Generates a color name using ColorNamer library
   */
  private static generateColorName(hexColor: string): string {
    try {
      return ColorNamer(`#${hexColor}`).ntc[0].name;
    } catch (error) {
      console.warn('Failed to generate color name, using fallback', error);
      return 'Custom Color';
    }
  }

  /**
   * Finds primary colors that are similar to a given color
   */
  static findSimilarColors(
    targetColor: string,
    primaryColors: SwatchStoreInputSwatch[],
    threshold: number = 50
  ): SwatchStoreInputSwatch[] {
    // This is a placeholder for color similarity detection
    // You could implement actual color distance calculation here
    return primaryColors.filter(color => color.color !== targetColor);
  }

  /**
   * Suggests complementary colors for a given primary color
   */
  static suggestComplementaryColors(primaryColor: string): string[] {
    // This is a placeholder for color harmony suggestions
    // You could implement actual color theory calculations here
    return [];
  }
}
