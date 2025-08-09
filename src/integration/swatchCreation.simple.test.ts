/**
 * Simplified integration tests for swatch creation flow
 * Tests the data flow without Figma API dependencies
 */

import { prepareSwatchCreationData } from '../ui/helpers/swatchDataPrep';
import { SwatchStoreState } from '../ui/store/useSwatchStore';
import { TokenNameStoreState } from '../ui/store/useTokenNameStore';
import * as colorMethods from '../ui/helpers/colorMethods';

// Mock the blendColor function
jest.mock('../ui/helpers/colorMethods', () => ({
  blendColor: jest.fn()
}));

const mockedBlendColor = colorMethods.blendColor as jest.MockedFunction<typeof colorMethods.blendColor>;

// Mock the swatch service
jest.mock('../plugin/services/swatchService', () => ({
  createAllSwatches: jest.fn()
}));

describe('Swatch Creation Integration (Simplified)', () => {
  let mockSwatchStore: SwatchStoreState;
  let mockTokenStore: Omit<TokenNameStoreState, 'resetToDefaults'>;

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock blendColor with predictable results (ensure 6-char hex)
    mockedBlendColor.mockImplementation((shade, tint, step) => {
      const stepHex = Math.min(255, step).toString(16).padStart(2, '0');
      return `${stepHex}${stepHex}${stepHex}`.substring(0, 6);
    });

    // Create realistic test data
    mockSwatchStore = {
      // Scale properties
      scaleStart: { color: '000000', name: 'Black', id: 'scaleStart' },
      scaleEnd: { color: 'FFFFFF', name: 'White', id: 'scaleEnd' },
      neutralScaleName: 'Neutral',
      primaryColors: [
        { color: '3B82F6', name: 'Blue', id: 'blue' },
        { color: '10B981', name: 'Emerald Green', id: 'emerald' }
      ],
      swatches: [
        {
          base: { color: '3B82F6', name: 'Blue', id: 'blue' },
          swatches: [
            { color: '2563EB', step: 100 },
            { color: '1D4ED8', step: 200 }
          ]
        },
        {
          base: { color: '10B981', name: 'Emerald Green', id: 'emerald' },
          swatches: [
            { color: '059669', step: 100 },
            { color: '047857', step: 200 }
          ]
        }
      ],
      numberOfSteps: 5,
      steps: [100, 200, 300, 400, 500],
      customSteps: new Set([50, 950]),
      combinedSteps: new Set([50, 100, 200, 300, 400, 500, 950]),
      // Scale getters
      getScaleStart: () => mockSwatchStore.scaleStart,
      getScaleEnd: () => mockSwatchStore.scaleEnd,
      getNeutralScaleName: () => mockSwatchStore.neutralScaleName,
      // Common getters
      getPrimaryColors: () => mockSwatchStore.primaryColors,
      getSwatches: () => mockSwatchStore.swatches,
      getNumberOfSteps: () => mockSwatchStore.numberOfSteps,
      getCustomSteps: () => mockSwatchStore.customSteps,
      getTotalUniqueSteps: () => mockSwatchStore.combinedSteps.size,
      getCombinedSteps: () => mockSwatchStore.combinedSteps,
      getSteps: () => mockSwatchStore.steps,
      // Scale setters
      setScaleStart: jest.fn(),
      setScaleEnd: jest.fn(),
      setNeutralScaleName: jest.fn(),
      swapScaleEndpoints: jest.fn(),
      // Common setters
      increaseSteps: jest.fn(),
      decreaseSteps: jest.fn(),
      setSteps: jest.fn(),
      setNumberOfSteps: jest.fn(),
      setCombinedSteps: jest.fn(),
      addPrimaryColor: jest.fn(),
      updatePrimaryColor: jest.fn(),
      removePrimaryColor: jest.fn(),
      createSteps: jest.fn(),
      addCustomStep: jest.fn(),
      removeCustomStep: jest.fn(),
      buildSwatches: jest.fn(),
      buildToneRamp: jest.fn().mockReturnValue([
        { color: '323232', step: 50 },
        { color: '646464', step: 100 },
        { color: 'C8C8C8', step: 200 },
        { color: 'F0F0F0', step: 300 },
        { color: 'F8F8F8', step: 400 },
        { color: 'FCFCFC', step: 500 },
        { color: 'FEFEFE', step: 950 }
      ]),
      buildColorScale: jest.fn().mockReturnValue([
        { color: '323232', step: 50 },
        { color: '646464', step: 100 },
        { color: 'C8C8C8', step: 200 },
        { color: 'F0F0F0', step: 300 },
        { color: 'F8F8F8', step: 400 },
        { color: 'FCFCFC', step: 500 },
        { color: 'FEFEFE', step: 950 }
      ])
    };

    mockTokenStore = {
      caseTreatment: 'lower',
      spaceTreatment: 'dash',
      leadingCharsCount: 2,
      separatorCharsCount: 1,
      leadingCharType: 'dash',
      separatorCharType: 'underscore',
      appendSeparatorToPrimitive: false,
      keepCSSClean: true,
      setCaseTreatment: jest.fn(),
      setSpaceTreatment: jest.fn(),
      setLeadingCharsCount: jest.fn(),
      setSeparatorCharsCount: jest.fn(),
      setLeadingCharType: jest.fn(),
      setSeparatorCharType: jest.fn(),
      setAppendSeparatorToPrimitive: jest.fn(),
      setKeepCSSClean: jest.fn(),
      incrementLeadingChars: jest.fn(),
      decrementLeadingChars: jest.fn(),
      incrementSeparatorChars: jest.fn(),
      decrementSeparatorChars: jest.fn(),
      toggleLeadingCharType: jest.fn(),
      toggleSeparatorCharType: jest.fn(),
      toggleAppendSeparatorToPrimitive: jest.fn(),
      toggleKeepCSSClean: jest.fn()
    };
  });

  describe('Swatch Data Preparation Flow', () => {
    it('should prepare complete swatch creation data from stores', () => {
      const result = prepareSwatchCreationData(mockSwatchStore, mockTokenStore);

      // Verify core structure
      expect(result).toHaveProperty('shade');
      expect(result).toHaveProperty('tint');
      expect(result).toHaveProperty('primaryColors');
      expect(result).toHaveProperty('shadeTintRampName');
      expect(result).toHaveProperty('shadeTintSwatches');
      expect(result).toHaveProperty('primarySwatches');
      expect(result).toHaveProperty('tokenSettings');
      
      // Verify display settings can be undefined (using defaults)
      expect(result.displayWidth).toBeUndefined();
      expect(result.swatchSize).toBeUndefined();
      expect(result.fontSize).toBeUndefined();
    });

    it('should apply custom display settings when provided', () => {
      const displaySettings = {
        displayWidth: 800,
        swatchSize: 32,
        fontSize: 10
      };

      const result = prepareSwatchCreationData(mockSwatchStore, mockTokenStore, displaySettings);

      expect(result.displayWidth).toBe(800);
      expect(result.swatchSize).toBe(32);
      expect(result.fontSize).toBe(10);
    });

    it('should apply token naming correctly for visual swatches', () => {
      const result = prepareSwatchCreationData(mockSwatchStore, mockTokenStore);

      // Visual naming follows same pattern as variables/styles
      expect(result.scaleStart.name).toBe('--black');
      expect(result.scaleEnd.name).toBe('--white');
      expect(result.primaryColors[0].name).toBe('--blue');
      expect(result.primaryColors[1].name).toBe('--emerald-green'); // space to dash

      // Subgroups for visual organization
      expect(result.neutralScaleName).toBe('--neutral');
      expect(result.primarySwatches[0].name).toBe('--blue');
      expect(result.primarySwatches[1].name).toBe('--emerald-green');
    });

    it('should generate shade-tint swatches for visual display', () => {
      const result = prepareSwatchCreationData(mockSwatchStore, mockTokenStore);

      // Should call buildToneRamp instead of blendColor directly
      expect(mockSwatchStore.buildToneRamp).toHaveBeenCalledTimes(1);
      expect(mockedBlendColor).not.toHaveBeenCalled();

      // Should return correct structure for visual creation
      expect(result.neutralScaleSwatches).toHaveLength(7);
      expect(result.neutralScaleSwatches[0]).toEqual({
        color: '323232', // mocked result for step 50
        step: 50
      });
    });

    it('should include token settings for visual separator construction', () => {
      const result = prepareSwatchCreationData(mockSwatchStore, mockTokenStore);

      expect(result.tokenSettings).toEqual({
        separatorCharsCount: 1,
        separatorCharType: 'underscore'
      });
    });
  });

  describe('Swatch Data Validation and Consistency', () => {
    it('should maintain data consistency through transformation', () => {
      const result = prepareSwatchCreationData(mockSwatchStore, mockTokenStore);

      // Original data should be preserved correctly
      expect(result.scaleStart.color).toBe(mockSwatchStore.scaleStart.color);
      expect(result.scaleEnd.color).toBe(mockSwatchStore.scaleEnd.color);
      expect(result.primaryColors).toHaveLength(mockSwatchStore.primaryColors.length);
      expect(result.primarySwatches).toHaveLength(mockSwatchStore.swatches.length);
    });

    it('should validate color format consistency for visual swatches', () => {
      const result = prepareSwatchCreationData(mockSwatchStore, mockTokenStore);

      // All colors should be valid hex for visual rendering
      expect(result.scaleStart.color).toMatch(/^[0-9A-Fa-f]{6}$/);
      expect(result.scaleEnd.color).toMatch(/^[0-9A-Fa-f]{6}$/);
      
      result.primaryColors.forEach(color => {
        expect(color.color).toMatch(/^[0-9A-Fa-f]{6}$/);
      });

      result.shadeTintSwatches.forEach(swatch => {
        expect(swatch.color).toMatch(/^[0-9A-Fa-f]{6}$/);
      });
    });

    it('should validate step number ranges for visual display', () => {
      const result = prepareSwatchCreationData(mockSwatchStore, mockTokenStore);

      result.shadeTintSwatches.forEach(swatch => {
        expect(swatch.step).toBeGreaterThanOrEqual(0);
        expect(swatch.step).toBeLessThanOrEqual(1000);
      });

      result.primarySwatches.forEach(ramp => {
        ramp.swatches.forEach(swatch => {
          expect(swatch.step).toBeGreaterThanOrEqual(0);
          expect(swatch.step).toBeLessThanOrEqual(1000);
        });
      });
    });

    it('should validate display settings when provided', () => {
      const displaySettings = {
        displayWidth: 1200,
        swatchSize: 64,
        fontSize: 12
      };

      const result = prepareSwatchCreationData(mockSwatchStore, mockTokenStore, displaySettings);

      expect(result.displayWidth).toBeGreaterThan(0);
      expect(result.swatchSize).toBeGreaterThan(0);
      expect(result.fontSize).toBeGreaterThan(0);
    });
  });

  describe('Different Visual Configuration Scenarios', () => {
    it('should handle different token configurations for visual display', () => {
      // Test with different settings for visual naming
      mockTokenStore.caseTreatment = 'upper';
      mockTokenStore.spaceTreatment = 'underscore';
      mockTokenStore.separatorCharType = 'dash';
      mockTokenStore.separatorCharsCount = 3;

      const result = prepareSwatchCreationData(mockSwatchStore, mockTokenStore);

      expect(result.scaleStart.name).toBe('--BLACK');
      expect(result.primaryColors[1].name).toBe('--EMERALD_GREEN');
      expect(result.tokenSettings.separatorCharType).toBe('dash');
      expect(result.tokenSettings.separatorCharsCount).toBe(3);
    });

    it('should handle appendSeparatorToPrimitive setting for visual swatches', () => {
      mockTokenStore.appendSeparatorToPrimitive = true;

      const result = prepareSwatchCreationData(mockSwatchStore, mockTokenStore);

      // Primitives should have separators for visual naming
      expect(result.scaleStart.name).toBe('--black_');
      expect(result.scaleEnd.name).toBe('--white_');
      expect(result.primaryColors[0].name).toBe('--blue_');

      // Subgroups should still not have separators
      expect(result.neutralScaleName).toBe('--neutral');
      expect(result.primarySwatches[0].name).toBe('--blue');
    });

    it('should handle empty data gracefully for visual creation', () => {
      mockSwatchStore.primaryColors = [];
      mockSwatchStore.swatches = [];
      mockSwatchStore.combinedSteps = new Set();
      (mockSwatchStore.buildColorScale as jest.Mock).mockReturnValue([]);

      const result = prepareSwatchCreationData(mockSwatchStore, mockTokenStore);

      expect(result.primaryColors).toEqual([]);
      expect(result.primarySwatches).toEqual([]);
      expect(result.neutralScaleSwatches).toEqual([]);
      expect(mockSwatchStore.buildColorScale).toHaveBeenCalledTimes(1);
      expect(mockedBlendColor).not.toHaveBeenCalled();
    });

    it('should handle various display size configurations', () => {
      const smallDisplay = {
        displayWidth: 600,
        swatchSize: 32,
        fontSize: 10
      };

      const largeDisplay = {
        displayWidth: 1600,
        swatchSize: 96,
        fontSize: 16
      };

      const smallResult = prepareSwatchCreationData(mockSwatchStore, mockTokenStore, smallDisplay);
      const largeResult = prepareSwatchCreationData(mockSwatchStore, mockTokenStore, largeDisplay);

      expect(smallResult.displayWidth).toBe(600);
      expect(smallResult.swatchSize).toBe(32);
      expect(smallResult.fontSize).toBe(10);

      expect(largeResult.displayWidth).toBe(1600);
      expect(largeResult.swatchSize).toBe(96);
      expect(largeResult.fontSize).toBe(16);
    });
  });

  describe('Performance and Scale for Visual Swatches', () => {
    it('should handle large datasets efficiently for visual creation', () => {
      // Create larger dataset for visual testing
      const largePrimaryColors = Array.from({ length: 15 }, (_, i) => ({
        color: `${i.toString(16).padStart(2, '0')}FF00`,
        name: `Visual Color ${i}`,
        id: `visual-color-${i}`
      }));

      const largeSwatches = largePrimaryColors.map((color, i) => ({
        base: color,
        swatches: Array.from({ length: 8 }, (_, j) => ({
          color: `${i.toString(16).padStart(2, '0')}${j.toString(16).padStart(2, '0')}00`,
          step: (j + 1) * 100
        }))
      }));

      mockSwatchStore.primaryColors = largePrimaryColors;
      mockSwatchStore.swatches = largeSwatches;

      const start = Date.now();
      const result = prepareSwatchCreationData(mockSwatchStore, mockTokenStore, {
        displayWidth: 1200,
        swatchSize: 48,
        fontSize: 11
      });
      const duration = Date.now() - start;

      expect(duration).toBeLessThan(100); // Should be very fast
      expect(result.primaryColors).toHaveLength(15);
      expect(result.primarySwatches).toHaveLength(15);
      expect(result.displayWidth).toBe(1200);
      expect(result.swatchSize).toBe(48);
      expect(result.fontSize).toBe(11);
    });
  });
});