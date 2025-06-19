import { blendPrimaryColor, isValidHexColor } from '../helpers/colorMethods';

/**
 * Service for handling color calculations and validations
 */
export class ColorCalculationService {
  /**
   * Validates if a color string is a valid hex color
   */
  static validateHexColor(color: string): boolean {
    return isValidHexColor(color);
  }

  /**
   * Blends a primary color with shade and tint based on step value
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
   * Generates a random hex color
   */
  static generateRandomColor(): string {
    return Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0')
      .toUpperCase();
  }

  /**
   * Calculates color contrast ratio between two colors
   */
  static calculateContrastRatio(color1: string, color2: string): number {
    // This is a placeholder - implement actual contrast calculation
    // You might want to use a library like wcag-contrast
    return 1;
  }

  /**
   * Determines if a color is light or dark
   */
  static isLightColor(hexColor: string): boolean {
    const rgb = this.hexToRgb(hexColor);
    const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
    return brightness > 128;
  }

  /**
   * Converts hex to RGB
   */
  private static hexToRgb(hex: string): { r: number; g: number; b: number } {
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return { r, g, b };
  }
}
