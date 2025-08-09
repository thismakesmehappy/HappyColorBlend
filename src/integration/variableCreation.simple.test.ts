/**
 * Simplified integration tests for variable creation flow
 * Tests the data flow without Figma API dependencies
 */

import { prepareSwatchVariableData } from '../ui/helpers/variableDataPrep';
import { SwatchStoreState } from '../ui/store/useSwatchStore';
import { TokenNameStoreState } from '../ui/store/useTokenNameStore';
import * as colorMethods from '../ui/helpers/colorMethods';

// Mock the blendColor function
jest.mock('../ui/helpers/colorMethods', () => ({
  blendColor: jest.fn()
}));

const mockedBlendColor = colorMethods.blendColor as jest.MockedFunction<typeof colorMethods.blendColor>;

// Mock the variable service
jest.mock('../plugin/services/variableService', () => ({
  createAllSwatchVariables: jest.fn()
}));

describe('Variable Creation Integration (Simplified)', () => {
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
      // Old properties
      shade: { color: '000000', name: 'Black', id: 'shade' },
      tint: { color: 'FFFFFF', name: 'White', id: 'tint' },
      shadeTintRampName: 'Neutral',
      gradientDirection: 'shade-to-tint' as const,
      // New properties
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
      // Mock getters - old
      getShade: () => mockSwatchStore.shade,
      getTint: () => mockSwatchStore.tint,
      getShadeTintRampName: () => mockSwatchStore.shadeTintRampName,
      getGradientDirection: () => 'shade-to-tint' as const,
      // Mock getters - new
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
      // Mock setters - old
      setShade: jest.fn(),
      setTint: jest.fn(),
      setShadeTintRampName: jest.fn(),
      toggleGradientDirection: jest.fn(),
      // Mock setters - new
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
        { color: '2BC2BC', step: 300 },
        { color: '909090', step: 400 },
        { color: 'F4F4F4', step: 500 },
        { color: '3B63B6', step: 950 }
      ]),
      buildColorScale: jest.fn().mockReturnValue([
        { color: '323232', step: 50 },
        { color: '646464', step: 100 },
        { color: 'C8C8C8', step: 200 },
        { color: '2BC2BC', step: 300 },
        { color: '909090', step: 400 },
        { color: 'F4F4F4', step: 500 },
        { color: '3B63B6', step: 950 }
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

  describe('Data Preparation Flow', () => {
    it('should prepare complete variable data from stores', () => {
      const result = prepareSwatchVariableData(mockSwatchStore, mockTokenStore);

      // Verify structure
      expect(result).toHaveProperty('shade');
      expect(result).toHaveProperty('tint');
      expect(result).toHaveProperty('primaryColors');
      expect(result).toHaveProperty('shadeTintRampName');
      expect(result).toHaveProperty('shadeTintSwatches');
      expect(result).toHaveProperty('primarySwatches');
      expect(result).toHaveProperty('tokenSettings');
    });

    it('should apply token naming correctly across all elements', () => {
      const result = prepareSwatchVariableData(mockSwatchStore, mockTokenStore);

      // Primitives should follow appendSeparatorToPrimitive setting
      expect(result.shade.name).toBe('--black'); // no separator
      expect(result.tint.name).toBe('--white');
      expect(result.primaryColors[0].name).toBe('--blue');
      expect(result.primaryColors[1].name).toBe('--emerald-green'); // space to dash

      // Subgroups should not have separators
      expect(result.shadeTintRampName).toBe('--neutral');
      expect(result.primarySwatches[0].name).toBe('--blue');
      expect(result.primarySwatches[1].name).toBe('--emerald-green');
    });

    it('should generate shade-tint swatches correctly', () => {
      const result = prepareSwatchVariableData(mockSwatchStore, mockTokenStore);

      // Should call buildToneRamp instead of blendColor directly
      expect(mockSwatchStore.buildToneRamp).toHaveBeenCalledTimes(1);
      expect(mockedBlendColor).not.toHaveBeenCalled();

      // Should return correct structure from buildToneRamp
      const expectedSteps = [50, 100, 200, 300, 400, 500, 950];
      expect(result.shadeTintSwatches).toHaveLength(expectedSteps.length);
      expect(result.shadeTintSwatches[0]).toEqual({
        color: '323232', // mocked result for step 50
        step: 50
      });
    });

    it('should include token settings for variable naming', () => {
      const result = prepareSwatchVariableData(mockSwatchStore, mockTokenStore);

      expect(result.tokenSettings).toEqual({
        separatorCharsCount: 1,
        separatorCharType: 'underscore'
      });
    });
  });

  describe('Data Validation and Consistency', () => {
    it('should maintain data consistency through transformation', () => {
      const result = prepareSwatchVariableData(mockSwatchStore, mockTokenStore);

      // Original data should be preserved correctly
      expect(result.shade.color).toBe(mockSwatchStore.shade.color);
      expect(result.tint.color).toBe(mockSwatchStore.tint.color);
      expect(result.primaryColors).toHaveLength(mockSwatchStore.primaryColors.length);
      expect(result.primarySwatches).toHaveLength(mockSwatchStore.swatches.length);
    });

    it('should validate color format consistency', () => {
      const result = prepareSwatchVariableData(mockSwatchStore, mockTokenStore);

      // All colors should be valid hex
      expect(result.shade.color).toMatch(/^[0-9A-Fa-f]{6}$/);
      expect(result.tint.color).toMatch(/^[0-9A-Fa-f]{6}$/);
      
      result.primaryColors.forEach(color => {
        expect(color.color).toMatch(/^[0-9A-Fa-f]{6}$/);
      });

      result.shadeTintSwatches.forEach(swatch => {
        expect(swatch.color).toMatch(/^[0-9A-Fa-f]{6}$/);
      });
    });

    it('should validate step number ranges', () => {
      const result = prepareSwatchVariableData(mockSwatchStore, mockTokenStore);

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
  });

  describe('Different Configuration Scenarios', () => {
    it('should handle different token configurations', () => {
      // Test with different settings
      mockTokenStore.caseTreatment = 'upper';
      mockTokenStore.spaceTreatment = 'underscore';
      mockTokenStore.separatorCharType = 'dash';
      mockTokenStore.separatorCharsCount = 3;

      const result = prepareSwatchVariableData(mockSwatchStore, mockTokenStore);

      expect(result.shade.name).toBe('--BLACK');
      expect(result.primaryColors[1].name).toBe('--EMERALD_GREEN');
      expect(result.tokenSettings.separatorCharType).toBe('dash');
      expect(result.tokenSettings.separatorCharsCount).toBe(3);
    });

    it('should handle appendSeparatorToPrimitive setting', () => {
      mockTokenStore.appendSeparatorToPrimitive = true;

      const result = prepareSwatchVariableData(mockSwatchStore, mockTokenStore);

      // Primitives should have separators
      expect(result.shade.name).toBe('--black_');
      expect(result.tint.name).toBe('--white_');
      expect(result.primaryColors[0].name).toBe('--blue_');

      // Subgroups should still not have separators
      expect(result.shadeTintRampName).toBe('--neutral');
      expect(result.primarySwatches[0].name).toBe('--blue');
    });

    it('should handle empty data gracefully', () => {
      mockSwatchStore.primaryColors = [];
      mockSwatchStore.swatches = [];
      mockSwatchStore.combinedSteps = new Set();
      (mockSwatchStore.buildToneRamp as jest.Mock).mockReturnValue([]);

      const result = prepareSwatchVariableData(mockSwatchStore, mockTokenStore);

      expect(result.primaryColors).toEqual([]);
      expect(result.primarySwatches).toEqual([]);
      expect(result.shadeTintSwatches).toEqual([]);
      expect(mockSwatchStore.buildToneRamp).toHaveBeenCalledTimes(1);
      expect(mockedBlendColor).not.toHaveBeenCalled();
    });
  });

  describe('Performance and Scale', () => {
    it('should handle large datasets efficiently', () => {
      // Create larger dataset
      const largePrimaryColors = Array.from({ length: 20 }, (_, i) => ({
        color: `${i.toString(16).padStart(2, '0')}FF00`,
        name: `Color ${i}`,
        id: `color-${i}`
      }));

      const largeSwatches = largePrimaryColors.map(color => ({
        base: color,
        swatches: Array.from({ length: 10 }, (_, j) => ({
          color: `${j.toString(16).padStart(2, '0')}${j.toString(16).padStart(2, '0')}00`,
          step: (j + 1) * 100
        }))
      }));

      mockSwatchStore.primaryColors = largePrimaryColors;
      mockSwatchStore.swatches = largeSwatches;

      const start = Date.now();
      const result = prepareSwatchVariableData(mockSwatchStore, mockTokenStore);
      const duration = Date.now() - start;

      expect(duration).toBeLessThan(100); // Should be very fast
      expect(result.primaryColors).toHaveLength(20);
      expect(result.primarySwatches).toHaveLength(20);
    });
  });
});