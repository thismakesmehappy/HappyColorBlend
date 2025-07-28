import { prepareSwatchVariableData } from './variableDataPrep';
import { SwatchStoreState } from '../store/useSwatchStore';
import { TokenNameStoreState } from '../store/useTokenNameStore';
import * as colorMethods from './colorMethods';

// Mock the blendColor function
jest.mock('./colorMethods', () => ({
  blendColor: jest.fn()
}));

const mockedBlendColor = colorMethods.blendColor as jest.MockedFunction<typeof colorMethods.blendColor>;

describe('prepareSwatchVariableData', () => {
  let mockSwatchStore: SwatchStoreState;
  let mockTokenStore: Omit<TokenNameStoreState, 'resetToDefaults'>;

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    
    // Mock blendColor to return predictable colors
    mockedBlendColor.mockImplementation((shade, tint, step) => {
      // Simple mock: return a hex based on step
      const stepHex = step.toString(16).padStart(2, '0');
      return `${stepHex}${stepHex}${stepHex}`;
    });

    // Create mock swatch store
    mockSwatchStore = {
      shade: { color: '000000', name: 'Black', id: 'shade' },
      tint: { color: 'FFFFFF', name: 'White', id: 'tint' },
      primaryColors: [
        { color: '00FF00', name: 'Green', id: 'green' },
        { color: 'FF0000', name: 'Red Color', id: 'red' }
      ],
      swatches: [
        {
          base: { color: '00FF00', name: 'Green', id: 'green' },
          swatches: [
            { color: '00CC00', step: 100 },
            { color: '00AA00', step: 200 }
          ]
        },
        {
          base: { color: 'FF0000', name: 'Red Color', id: 'red' },
          swatches: [
            { color: 'CC0000', step: 100 },
            { color: 'AA0000', step: 200 }
          ]
        }
      ],
      numberOfSteps: 5,
      steps: [100, 200, 300, 400, 500],
      customSteps: new Set([50, 950]),
      combinedSteps: new Set([50, 100, 200, 300, 400, 500, 950]),
      shadeTintRampName: 'Gray Scale',
      // Mock getter functions
      getShade: () => mockSwatchStore.shade,
      getTint: () => mockSwatchStore.tint,
      getPrimaryColors: () => mockSwatchStore.primaryColors,
      getSwatches: () => mockSwatchStore.swatches,
      getNumberOfSteps: () => mockSwatchStore.numberOfSteps,
      getCustomSteps: () => mockSwatchStore.customSteps,
      getTotalUniqueSteps: () => mockSwatchStore.combinedSteps.size,
      getCombinedSteps: () => mockSwatchStore.combinedSteps,
      getSteps: () => mockSwatchStore.steps,
      getShadeTintRampName: () => mockSwatchStore.shadeTintRampName,
      // Mock setter functions (not used in this test)
      setShade: jest.fn(),
      setTint: jest.fn(),
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
      setShadeTintRampName: jest.fn(),
      gradientDirection: 'shade-to-tint' as const,
      getGradientDirection: () => 'shade-to-tint' as const,
      toggleGradientDirection: jest.fn()
    };

    // Create mock token store
    mockTokenStore = {
      caseTreatment: 'lower',
      spaceTreatment: 'dash',
      leadingCharsCount: 2,
      separatorCharsCount: 1,
      leadingCharType: 'dash',
      separatorCharType: 'underscore',
      appendSeparatorToPrimitive: false,
      keepCSSClean: true,
      // Mock setter functions (not used in this test)
      setCaseTreatment: jest.fn(),
      setSpaceTreatment: jest.fn(),
      setLeadingCharsCount: jest.fn(),
      setSeparatorCharsCount: jest.fn(),
      setLeadingCharType: jest.fn(),
      setSeparatorCharType: jest.fn(),
      setAppendSeparatorToPrimitive: jest.fn(),
      setKeepCSSClean: jest.fn(),
      // Mock action functions (not used in this test)
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

  describe('basic data preparation', () => {
    it('should prepare shade and tint data correctly', () => {
      const result = prepareSwatchVariableData(mockSwatchStore, mockTokenStore);

      expect(result.shade).toEqual({
        name: '--black', // computeTokenName applied: lower case, leading chars, no separator
        color: '000000'
      });

      expect(result.tint).toEqual({
        name: '--white',
        color: 'FFFFFF'
      });
    });

    it('should prepare primary colors data correctly', () => {
      const result = prepareSwatchVariableData(mockSwatchStore, mockTokenStore);

      expect(result.primaryColors).toEqual([
        {
          name: '--green', // computeTokenName applied without separator
          color: '00FF00'
        },
        {
          name: '--red-color', // space converted to dash
          color: 'FF0000'
        }
      ]);
    });

    it('should prepare shade-tint ramp name without separator', () => {
      const result = prepareSwatchVariableData(mockSwatchStore, mockTokenStore);

      expect(result.shadeTintRampName).toBe('--gray-scale'); // no separator for subgroup names
    });
  });

  describe('shade-tint swatches generation', () => {
    it('should generate shade-tint swatches using buildToneRamp', () => {
      // Mock buildToneRamp to return expected data
      const expectedSwatches = [
        { color: '323232', step: 50 },
        { color: '646464', step: 100 },
        { color: 'C8C8C8', step: 200 },
        { color: '2BC2BC', step: 300 },
        { color: '909090', step: 400 },
        { color: 'F4F4F4', step: 500 },
        { color: '3B63B6', step: 950 }
      ];
      
      (mockSwatchStore.buildToneRamp as jest.Mock).mockReturnValue(expectedSwatches);

      const result = prepareSwatchVariableData(mockSwatchStore, mockTokenStore);

      // Should call buildToneRamp instead of blendColor directly
      expect(mockSwatchStore.buildToneRamp).toHaveBeenCalledTimes(1);
      expect(mockedBlendColor).not.toHaveBeenCalled();

      // Should return the swatches from buildToneRamp
      expect(result.shadeTintSwatches).toEqual(expectedSwatches);
    });

    it('should handle empty buildToneRamp result', () => {
      (mockSwatchStore.buildToneRamp as jest.Mock).mockReturnValue([]);

      const result = prepareSwatchVariableData(mockSwatchStore, mockTokenStore);

      expect(result.shadeTintSwatches).toEqual([]);
      expect(mockSwatchStore.buildToneRamp).toHaveBeenCalledTimes(1);
      expect(mockedBlendColor).not.toHaveBeenCalled();
    });
  });

  describe('primary swatches preparation', () => {
    it('should prepare primary swatches with tokenized names', () => {
      const result = prepareSwatchVariableData(mockSwatchStore, mockTokenStore);

      expect(result.primarySwatches).toEqual([
        {
          name: '--green', // no separator for subgroup names
          swatches: [
            { color: '00CC00', step: 100 },
            { color: '00AA00', step: 200 }
          ]
        },
        {
          name: '--red-color', // space converted to dash
          swatches: [
            { color: 'CC0000', step: 100 },
            { color: 'AA0000', step: 200 }
          ]
        }
      ]);
    });

    it('should handle empty primary swatches', () => {
      mockSwatchStore.swatches = [];

      const result = prepareSwatchVariableData(mockSwatchStore, mockTokenStore);

      expect(result.primarySwatches).toEqual([]);
    });
  });

  describe('token settings inclusion', () => {
    it('should include token settings in result', () => {
      const result = prepareSwatchVariableData(mockSwatchStore, mockTokenStore);

      expect(result.tokenSettings).toEqual({
        separatorCharsCount: 1,
        separatorCharType: 'underscore'
      });
    });

    it('should include different token settings', () => {
      mockTokenStore.separatorCharsCount = 3;
      mockTokenStore.separatorCharType = 'dash';

      const result = prepareSwatchVariableData(mockSwatchStore, mockTokenStore);

      expect(result.tokenSettings).toEqual({
        separatorCharsCount: 3,
        separatorCharType: 'dash'
      });
    });
  });

  describe('appendSeparatorToPrimitive setting', () => {
    it('should apply separator to primitives when appendSeparatorToPrimitive is true', () => {
      mockTokenStore.appendSeparatorToPrimitive = true;

      const result = prepareSwatchVariableData(mockSwatchStore, mockTokenStore);

      expect(result.shade.name).toBe('--black_'); // with separator
      expect(result.tint.name).toBe('--white_');
      expect(result.primaryColors[0].name).toBe('--green_');
      expect(result.primaryColors[1].name).toBe('--red-color_');
    });

    it('should not apply separator to primitives when appendSeparatorToPrimitive is false', () => {
      mockTokenStore.appendSeparatorToPrimitive = false;

      const result = prepareSwatchVariableData(mockSwatchStore, mockTokenStore);

      expect(result.shade.name).toBe('--black'); // no separator
      expect(result.tint.name).toBe('--white');
      expect(result.primaryColors[0].name).toBe('--green');
      expect(result.primaryColors[1].name).toBe('--red-color');
    });
  });

  describe('different token naming configurations', () => {
    it('should handle uppercase case treatment', () => {
      mockTokenStore.caseTreatment = 'upper';

      const result = prepareSwatchVariableData(mockSwatchStore, mockTokenStore);

      expect(result.shade.name).toBe('--BLACK');
      expect(result.primaryColors[1].name).toBe('--RED-COLOR');
    });

    it('should handle underscore space treatment', () => {
      mockTokenStore.spaceTreatment = 'underscore';

      const result = prepareSwatchVariableData(mockSwatchStore, mockTokenStore);

      expect(result.primaryColors[1].name).toBe('--red_color');
      expect(result.shadeTintRampName).toBe('--gray_scale');
    });

    it('should handle different leading char counts and types', () => {
      mockTokenStore.leadingCharsCount = 3;
      mockTokenStore.leadingCharType = 'underscore';

      const result = prepareSwatchVariableData(mockSwatchStore, mockTokenStore);

      expect(result.shade.name).toBe('___black');
      expect(result.tint.name).toBe('___white');
    });
  });
});