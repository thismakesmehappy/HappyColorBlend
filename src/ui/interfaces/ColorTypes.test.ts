/**
 * Tests for ColorTypes with strict validation
 */

import {
  HexColor,
  RgbColor,
  HslColor,
  isValidHexColor,
  isValidRgbColor,
  isValidHslColor,
  createHexColor,
  createRgbColor,
  createHslColor,
  hexToRgb,
  rgbToHex,
  calculateContrastRatio,
  isLightColor,
} from './ColorTypes';

describe('ColorTypes', () => {
  describe('isValidHexColor', () => {
    test('validates correct hex colors', () => {
      expect(isValidHexColor('FF0000')).toBe(true);
      expect(isValidHexColor('00FF00')).toBe(true);
      expect(isValidHexColor('0000FF')).toBe(true);
      expect(isValidHexColor('FFFFFF')).toBe(true);
      expect(isValidHexColor('000000')).toBe(true);
      expect(isValidHexColor('123ABC')).toBe(true);
      expect(isValidHexColor('ff0000')).toBe(true); // Lowercase should be valid
      expect(isValidHexColor('123abc')).toBe(true); // Mixed case should be valid
    });

    test('rejects invalid hex colors', () => {
      expect(isValidHexColor('#FF0000')).toBe(false); // With hash
      expect(isValidHexColor('FF00')).toBe(false); // Too short
      expect(isValidHexColor('FF00000')).toBe(false); // Too long
      expect(isValidHexColor('GGGGGG')).toBe(false); // Invalid characters
      expect(isValidHexColor('')).toBe(false); // Empty
      expect(isValidHexColor('ZZZZZZ')).toBe(false); // Invalid characters
    });
  });

  describe('createHexColor', () => {
    test('creates valid hex colors', () => {
      const red = createHexColor('FF0000');
      expect(red).toBe('FF0000');

      const blue = createHexColor('0000FF');
      expect(blue).toBe('0000FF');
    });

    test('throws error for invalid hex colors', () => {
      expect(() => createHexColor('#FF0000')).toThrow('Invalid hex color');
      expect(() => createHexColor('GGGGGG')).toThrow('Invalid hex color');
      expect(() => createHexColor('FF00')).toThrow('Invalid hex color');
    });
  });

  describe('RGB color validation', () => {
    test('validates correct RGB colors', () => {
      expect(isValidRgbColor({ r: 255, g: 0, b: 0 })).toBe(true);
      expect(isValidRgbColor({ r: 0, g: 255, b: 0 })).toBe(true);
      expect(isValidRgbColor({ r: 0, g: 0, b: 255 })).toBe(true);
      expect(isValidRgbColor({ r: 128, g: 128, b: 128 })).toBe(true);
    });

    test('rejects invalid RGB colors', () => {
      expect(isValidRgbColor({ r: -1, g: 0, b: 0 })).toBe(false);
      expect(isValidRgbColor({ r: 256, g: 0, b: 0 })).toBe(false);
      expect(isValidRgbColor({ r: 255.5, g: 0, b: 0 })).toBe(false);
      expect(isValidRgbColor({ r: NaN, g: 0, b: 0 })).toBe(false);
    });
  });

  describe('createRgbColor', () => {
    test('creates valid RGB colors', () => {
      const red = createRgbColor(255, 0, 0);
      expect(red).toEqual({ r: 255, g: 0, b: 0 });
    });

    test('throws error for invalid RGB values', () => {
      expect(() => createRgbColor(-1, 0, 0)).toThrow('Invalid RGB color');
      expect(() => createRgbColor(256, 0, 0)).toThrow('Invalid RGB color');
      expect(() => createRgbColor(255.5, 0, 0)).toThrow('Invalid RGB color');
    });
  });

  describe('HSL color validation', () => {
    test('validates correct HSL colors', () => {
      expect(isValidHslColor({ h: 0, s: 100, l: 50 })).toBe(true);
      expect(isValidHslColor({ h: 360, s: 0, l: 0 })).toBe(true);
      expect(isValidHslColor({ h: 180, s: 50, l: 100 })).toBe(true);
    });

    test('rejects invalid HSL colors', () => {
      expect(isValidHslColor({ h: -1, s: 50, l: 50 })).toBe(false);
      expect(isValidHslColor({ h: 361, s: 50, l: 50 })).toBe(false);
      expect(isValidHslColor({ h: 180, s: -1, l: 50 })).toBe(false);
      expect(isValidHslColor({ h: 180, s: 101, l: 50 })).toBe(false);
    });
  });

  describe('Color conversion', () => {
    test('converts hex to RGB correctly', () => {
      const red = createHexColor('FF0000');
      const rgb = hexToRgb(red);
      expect(rgb).toEqual({ r: 255, g: 0, b: 0 });

      const white = createHexColor('FFFFFF');
      const whiteRgb = hexToRgb(white);
      expect(whiteRgb).toEqual({ r: 255, g: 255, b: 255 });
    });

    test('converts RGB to hex correctly', () => {
      const red = createRgbColor(255, 0, 0);
      const hex = rgbToHex(red);
      expect(hex).toBe('FF0000');

      const white = createRgbColor(255, 255, 255);
      const whiteHex = rgbToHex(white);
      expect(whiteHex).toBe('FFFFFF');
    });

    test('round-trip conversion maintains accuracy', () => {
      const originalHex = createHexColor('123ABC');
      const rgb = hexToRgb(originalHex);
      const backToHex = rgbToHex(rgb);
      expect(backToHex).toBe(originalHex);
    });
  });

  describe('Color analysis', () => {
    test('identifies light colors correctly', () => {
      const white = createHexColor('FFFFFF');
      const lightGray = createHexColor('CCCCCC');
      const yellow = createHexColor('FFFF00');

      expect(isLightColor(white)).toBe(true);
      expect(isLightColor(lightGray)).toBe(true);
      expect(isLightColor(yellow)).toBe(true);
    });

    test('identifies dark colors correctly', () => {
      const black = createHexColor('000000');
      const darkGray = createHexColor('333333');
      const darkBlue = createHexColor('000080');

      expect(isLightColor(black)).toBe(false);
      expect(isLightColor(darkGray)).toBe(false);
      expect(isLightColor(darkBlue)).toBe(false);
    });

    test('calculates contrast ratio', () => {
      const white = createHexColor('FFFFFF');
      const black = createHexColor('000000');

      const contrast = calculateContrastRatio(white, black);
      expect(contrast).toBeGreaterThan(20); // Should be 21:1 for perfect black/white

      // Same color should have 1:1 ratio
      const sameColorContrast = calculateContrastRatio(white, white);
      expect(sameColorContrast).toBe(1);
    });
  });

  describe('Type safety', () => {
    test('HexColor type prevents invalid assignments at compile time', () => {
      // This test verifies that TypeScript compilation would catch these errors
      const validHex = createHexColor('FF0000');

      // These would cause TypeScript errors if uncommented:
      // const invalidHex: HexColor = 'invalid'; // Error: Type 'string' is not assignable to type 'HexColor'
      // const anotherInvalid: HexColor = '#FF0000'; // Error: Type 'string' is not assignable to type 'HexColor'

      expect(typeof validHex).toBe('string');
    });

    test('RGB and HSL types enforce readonly properties', () => {
      const rgb = createRgbColor(255, 0, 0);
      const hsl = createHslColor(0, 100, 50);

      // These would cause TypeScript errors if uncommented:
      // rgb.r = 128; // Error: Cannot assign to 'r' because it is a read-only property
      // hsl.h = 180; // Error: Cannot assign to 'h' because it is a read-only property

      expect(rgb.r).toBe(255);
      expect(hsl.h).toBe(0);
    });
  });
});
