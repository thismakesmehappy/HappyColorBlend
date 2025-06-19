import { ColorCalculationService } from './ColorCalculationService';
import { createHexColor } from '../interfaces/ColorTypes';

describe('ColorCalculationService', () => {
  describe('validateHexColor', () => {
    test('validates correct hex colors', () => {
      expect(ColorCalculationService.validateHexColor('FF0000')).toBe(true);
      expect(ColorCalculationService.validateHexColor('000000')).toBe(true);
      expect(ColorCalculationService.validateHexColor('FFFFFF')).toBe(true);
      expect(ColorCalculationService.validateHexColor('123ABC')).toBe(true);
    });

    test('rejects invalid hex colors', () => {
      expect(ColorCalculationService.validateHexColor('GG0000')).toBe(false);
      expect(ColorCalculationService.validateHexColor('FF00')).toBe(false);
      expect(ColorCalculationService.validateHexColor('FF00000')).toBe(false);
      expect(ColorCalculationService.validateHexColor('')).toBe(false);
    });
  });

  describe('generateRandomColor', () => {
    test('generates valid hex colors', () => {
      const color = ColorCalculationService.generateRandomColor();
      expect(color).toHaveLength(6);
      expect(ColorCalculationService.validateHexColor(color)).toBe(true);
    });

    test('generates different colors on multiple calls', () => {
      const color1 = ColorCalculationService.generateRandomColor();
      const color2 = ColorCalculationService.generateRandomColor();
      // While theoretically possible to be the same, it's extremely unlikely
      expect(color1).not.toBe(color2);
    });
  });

  describe('isLightColor', () => {
    test('identifies light colors correctly', () => {
      expect(ColorCalculationService.isLightColor(createHexColor('FFFFFF'))).toBe(true);
      expect(ColorCalculationService.isLightColor(createHexColor('FFFF00'))).toBe(true);
      expect(ColorCalculationService.isLightColor(createHexColor('00FFFF'))).toBe(true);
    });

    test('identifies dark colors correctly', () => {
      expect(ColorCalculationService.isLightColor(createHexColor('000000'))).toBe(false);
      expect(ColorCalculationService.isLightColor(createHexColor('800000'))).toBe(false);
      expect(ColorCalculationService.isLightColor(createHexColor('008000'))).toBe(false);
    });
  });

  describe('blendColor', () => {
    test('blends colors correctly', () => {
      const result = ColorCalculationService.blendColor('000000', 'FFFFFF', 'FF0000', 500);
      expect(typeof result).toBe('string');
      expect(result).toHaveLength(6);
      expect(ColorCalculationService.validateHexColor(result)).toBe(true);
    });
  });
});
