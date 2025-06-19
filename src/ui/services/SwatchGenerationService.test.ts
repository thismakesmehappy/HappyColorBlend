import { SwatchGenerationService } from './SwatchGenerationService';
import { SwatchStoreInputSwatch } from '../store/useSwatchStore';

describe('SwatchGenerationService', () => {
  const mockShade: SwatchStoreInputSwatch = {
    color: '000000',
    name: 'Black',
    id: 'shade'
  };

  const mockTint: SwatchStoreInputSwatch = {
    color: 'FFFFFF',
    name: 'White',
    id: 'tint'
  };

  const mockPrimaryColors: SwatchStoreInputSwatch[] = [
    {
      color: 'FF0000',
      name: 'Red',
      id: 'primary-1'
    },
    {
      color: '00FF00',
      name: 'Green',
      id: 'primary-2'
    }
  ];

  describe('generateEqualSteps', () => {
    test('generates correct number of equal steps', () => {
      const steps = SwatchGenerationService.generateEqualSteps(5);
      expect(steps).toHaveLength(5);
      expect(steps[0]).toBe(0);
      expect(steps[steps.length - 1]).toBe(1000);
    });

    test('generates evenly distributed steps', () => {
      const steps = SwatchGenerationService.generateEqualSteps(9);
      expect(steps).toEqual([0, 125, 250, 375, 500, 625, 750, 875, 1000]);
    });
  });

  describe('combineSteps', () => {
    test('combines equal steps and custom steps', () => {
      const equalSteps = [0, 250, 500, 750, 1000];
      const customSteps = new Set([100, 300, 700]);
      const combined = SwatchGenerationService.combineSteps(equalSteps, customSteps);
      
      expect(combined.size).toBe(8);
      expect(combined.has(100)).toBe(true);
      expect(combined.has(300)).toBe(true);
      expect(combined.has(700)).toBe(true);
    });

    test('handles duplicate steps correctly', () => {
      const equalSteps = [0, 250, 500, 750, 1000];
      const customSteps = new Set([250, 500]); // Duplicates
      const combined = SwatchGenerationService.combineSteps(equalSteps, customSteps);
      
      expect(combined.size).toBe(5); // No duplicates
    });
  });

  describe('validateCustomStep', () => {
    const existingSteps = new Set([100, 200, 300]);

    test('validates valid custom steps', () => {
      const result = SwatchGenerationService.validateCustomStep(150, existingSteps);
      expect(result.isValid).toBe(true);
      expect(result.errorMessage).toBeUndefined();
    });

    test('rejects out of range steps', () => {
      const result1 = SwatchGenerationService.validateCustomStep(0, existingSteps);
      expect(result1.isValid).toBe(false);
      expect(result1.errorMessage).toContain('between 1 and 999');

      const result2 = SwatchGenerationService.validateCustomStep(1000, existingSteps);
      expect(result2.isValid).toBe(false);
      expect(result2.errorMessage).toContain('between 1 and 999');
    });

    test('rejects reserved steps', () => {
      const result = SwatchGenerationService.validateCustomStep(500, existingSteps);
      expect(result.isValid).toBe(false);
      expect(result.errorMessage).toContain('Values 0, 500, and 1000 are already included by default');
    });

    test('rejects duplicate steps', () => {
      const result = SwatchGenerationService.validateCustomStep(100, existingSteps);
      expect(result.isValid).toBe(false);
      expect(result.errorMessage).toContain('already exists');
    });
  });

  describe('sortSteps', () => {
    test('sorts steps in ascending order', () => {
      const steps = new Set([500, 100, 900, 200, 750]);
      const sorted = SwatchGenerationService.sortSteps(steps);
      expect(sorted).toEqual([100, 200, 500, 750, 900]);
    });
  });

  describe('buildSwatches', () => {
    test('builds swatches correctly', () => {
      const combinedSteps = new Set([0, 500, 1000]);
      const swatches = SwatchGenerationService.buildSwatches(
        mockShade,
        mockTint,
        mockPrimaryColors,
        combinedSteps
      );

      expect(swatches).toHaveLength(2); // Two primary colors
      expect(swatches[0].base).toEqual(mockPrimaryColors[0]);
      expect(swatches[0].swatches).toHaveLength(3); // Three steps
      expect(swatches[1].base).toEqual(mockPrimaryColors[1]);
      expect(swatches[1].swatches).toHaveLength(3); // Three steps
    });

    test('handles empty primary colors', () => {
      const combinedSteps = new Set([0, 500, 1000]);
      const swatches = SwatchGenerationService.buildSwatches(
        mockShade,
        mockTint,
        [],
        combinedSteps
      );

      expect(swatches).toHaveLength(0);
    });
  });
});
