/**
 * Comprehensive color type definitions with strict validation
 */

// Base color types
export type HexColor = string & { readonly __brand: unique symbol };
export type RgbColor = {
  readonly r: number;
  readonly g: number;
  readonly b: number;
};

export type HslColor = {
  readonly h: number;
  readonly s: number;
  readonly l: number;
};

// Color validation utilities
export const isValidHexColor = (color: string): color is HexColor => {
  const hexRegex = /^[0-9A-Fa-f]{6}$/;
  return hexRegex.test(color);
};

export const isValidRgbColor = (color: RgbColor): boolean => {
  return (
    Number.isInteger(color.r) && color.r >= 0 && color.r <= 255 &&
    Number.isInteger(color.g) && color.g >= 0 && color.g <= 255 &&
    Number.isInteger(color.b) && color.b >= 0 && color.b <= 255
  );
};

export const isValidHslColor = (color: HslColor): boolean => {
  return (
    Number.isFinite(color.h) && color.h >= 0 && color.h <= 360 &&
    Number.isFinite(color.s) && color.s >= 0 && color.s <= 100 &&
    Number.isFinite(color.l) && color.l >= 0 && color.l <= 100
  );
};

// Type guards for runtime validation
export const createHexColor = (color: string): HexColor => {
  if (!isValidHexColor(color)) {
    throw new Error(`Invalid hex color: ${color}. Must be 6 characters of 0-9, A-F`);
  }
  return color as HexColor;
};

export const createRgbColor = (r: number, g: number, b: number): RgbColor => {
  const color = { r, g, b };
  if (!isValidRgbColor(color)) {
    throw new Error(`Invalid RGB color: r=${r}, g=${g}, b=${b}. Values must be integers 0-255`);
  }
  return color;
};

export const createHslColor = (h: number, s: number, l: number): HslColor => {
  const color = { h, s, l };
  if (!isValidHslColor(color)) {
    throw new Error(`Invalid HSL color: h=${h}, s=${s}, l=${l}. H: 0-360, S/L: 0-100`);
  }
  return color;
};

// Color conversion utilities with type safety
export const hexToRgb = (hex: HexColor): RgbColor => {
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return createRgbColor(r, g, b);
};

export const rgbToHex = (rgb: RgbColor): HexColor => {
  const toHex = (n: number) => n.toString(16).padStart(2, '0').toUpperCase();
  return createHexColor(`${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`);
};

// Color contrast and accessibility
export const calculateLuminance = (rgb: RgbColor): number => {
  const sRGB = [rgb.r, rgb.g, rgb.b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
};

export const calculateContrastRatio = (color1: HexColor, color2: HexColor): number => {
  const lum1 = calculateLuminance(hexToRgb(color1));
  const lum2 = calculateLuminance(hexToRgb(color2));
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
};

export const isLightColor = (hex: HexColor): boolean => {
  const rgb = hexToRgb(hex);
  const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  return brightness > 128;
};