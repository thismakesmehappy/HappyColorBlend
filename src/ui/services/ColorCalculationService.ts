import { blendPrimaryColor, isValidHexColor } from '../helpers/colorMethods';
import { 
  HexColor, 
  RgbColor, 
  createHexColor, 
  isValidHexColor as isValidHexColorType,
  hexToRgb,
  calculateContrastRatio as calculateContrastRatioSafe,
  isLightColor as isLightColorSafe
} from '../interfaces/ColorTypes';

/**
 * Type-safe service for handling color calculations and validations
 */
export class ColorCalculationService {
  /**
   * Validates if a color string is a valid hex color
   * @deprecated Use createHexColor or isValidHexColor from ColorTypes instead
   */
  static validateHexColor(color: string): boolean {
    return isValidHexColor(color);
  }

  /**
   * Type-safe validation that returns a branded HexColor type
   */
  static validateAndCreateHexColor(color: string): HexColor {
    return createHexColor(color);
  }

  /**
   * Type-safe check for hex color validity
   */
  static isValidHexColor(color: string): color is HexColor {
    return isValidHexColorType(color);
  }

  /**
   * Blends a primary color with shade and tint based on step value
   * @deprecated Use the type-safe version blendColorSafe instead
   */
  static blendColor(
    shadeColor: string,
    tintColor: string,
    primaryColor: string,
    step: number
  ): string {
    return blendPrimaryColor(shadeColor, tintColor, primaryColor, step);
  }

  /**
   * Type-safe color blending with validation
   */
  static blendColorSafe(
    shadeColor: HexColor,
    tintColor: HexColor,
    primaryColor: HexColor,
    step: number
  ): HexColor {
    // Validate step range
    if (!Number.isInteger(step) || step < 0 || step > 1000) {
      throw new Error(`Invalid step value: ${step}. Must be integer 0-1000`);
    }

    const result = blendPrimaryColor(shadeColor, tintColor, primaryColor, step);
    return createHexColor(result);
  }

  /**
   * Generates a random hex color with type safety
   */
  static generateRandomColor(): HexColor {
    const randomHex = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0')
      .toUpperCase();
    return createHexColor(randomHex);
  }

  /**
   * Calculates color contrast ratio between two colors with type safety
   */
  static calculateContrastRatio(color1: HexColor, color2: HexColor): number {
    return calculateContrastRatioSafe(color1, color2);
  }

  /**
   * Determines if a color is light or dark with type safety
   */
  static isLightColor(hexColor: HexColor): boolean {
    return isLightColorSafe(hexColor);
  }

  /**
   * Converts hex to RGB with type safety
   */
  static hexToRgb(hex: HexColor): RgbColor {
    return hexToRgb(hex);
  }

  /**
   * Legacy method for backward compatibility
   * @deprecated Use hexToRgb instead
   */
  private static hexToRgbLegacy(hex: string): { r: number; g: number; b: number } {
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return { r, g, b };
  }
}
