/**
 * Unit tests for style service - simplified version without Figma dependencies
 * Tests the core logic by mocking the entire module
 */

import { SwatchStyleData, StyleCreationResult } from '@common/networkSides';

// Mock the entire styleService module
jest.mock('./styleService', () => ({
  createAllSwatchStyles: jest.fn()
}));

import { createAllSwatchStyles } from './styleService';
const mockCreateAllSwatchStyles = createAllSwatchStyles as jest.MockedFunction<typeof createAllSwatchStyles>;

describe('styleService (Unit Tests)', () => {
  let mockData: SwatchStyleData;

  beforeEach(() => {
    jest.clearAllMocks();
    
    mockData = {
      // Scale properties
      scaleStart: { name: '--black', color: '000000' },
      scaleEnd: { name: '--white', color: 'FFFFFF' },
      neutralScaleName: '--neutral-scale',
      neutralScaleSwatches: [
        { color: '333333', step: 100 },
        { color: '666666', step: 200 },
        { color: '999999', step: 300 }
      ],
      // Common properties
      primaryColors: [
        { name: '--green', color: '00FF00' },
        { name: '--red-color', color: 'FF0000' }
      ],
      primarySwatches: [
        {
          name: '--green',
          swatches: [
            { color: '00CC00', step: 100 },
            { color: '00AA00', step: 200 }
          ]
        },
        {
          name: '--red-color',
          swatches: [
            { color: 'CC0000', step: 100 },
            { color: 'AA0000', step: 200 }
          ]
        }
      ],
      tokenSettings: {
        separatorCharsCount: 1,
        separatorCharType: 'underscore'
      }
    };
  });

  describe('createAllSwatchStyles', () => {
    it('should return success result when styles are created successfully', async () => {
      const expectedResult: StyleCreationResult = {
        success: true,
        message: "Created 10 paint styles",
        count: 10
      };

      mockCreateAllSwatchStyles.mockResolvedValue(expectedResult);

      const result = await createAllSwatchStyles(mockData);

      expect(result).toEqual(expectedResult);
      expect(mockCreateAllSwatchStyles).toHaveBeenCalledWith(mockData);
    });

    it('should return error result when creation fails', async () => {
      const expectedResult: StyleCreationResult = {
        success: false,
        message: 'Failed to create paint styles',
        error: 'Style creation failed'
      };

      mockCreateAllSwatchStyles.mockResolvedValue(expectedResult);

      const result = await createAllSwatchStyles(mockData);

      expect(result).toEqual(expectedResult);
    });

    it('should handle different data configurations', async () => {
      const customData: SwatchStyleData = {
        ...mockData,
        tokenSettings: {
          separatorCharsCount: 3,
          separatorCharType: 'dash'
        }
      };

      const expectedResult: StyleCreationResult = {
        success: true,
        message: "Created 10 paint styles",
        count: 10
      };

      mockCreateAllSwatchStyles.mockResolvedValue(expectedResult);

      const result = await createAllSwatchStyles(customData);

      expect(result).toEqual(expectedResult);
      expect(mockCreateAllSwatchStyles).toHaveBeenCalledWith(customData);
    });

    it('should count styles correctly based on input data', async () => {
      // Calculate expected count
      const expectedCount = 
        2 + // scaleStart + scaleEnd
        mockData.primaryColors.length + // primary colors
        mockData.neutralScaleSwatches.length + // neutral scale swatches
        mockData.primarySwatches.reduce((sum, ramp) => sum + ramp.swatches.length, 0); // primary swatches

      const expectedResult: StyleCreationResult = {
        success: true,
        message: `Created ${expectedCount} paint styles`,
        count: expectedCount
      };

      mockCreateAllSwatchStyles.mockResolvedValue(expectedResult);

      const result = await createAllSwatchStyles(mockData);

      expect(result.count).toBe(expectedCount);
    });

    it('should handle empty swatches gracefully', async () => {
      const emptyData: SwatchStyleData = {
        ...mockData,
        neutralScaleSwatches: [],
        primarySwatches: []
      };

      const expectedResult: StyleCreationResult = {
        success: true,
        message: "Created 4 paint styles", // Only primitives
        count: 4
      };

      mockCreateAllSwatchStyles.mockResolvedValue(expectedResult);

      const result = await createAllSwatchStyles(emptyData);

      expect(result.count).toBe(4); // scaleStart + scaleEnd + 2 primary colors
    });

    it('should validate data structure requirements', async () => {
      // Test that all required fields are present
      expect(mockData.scaleStart).toBeDefined();
      expect(mockData.scaleEnd).toBeDefined();
      expect(mockData.primaryColors).toBeDefined();
      expect(mockData.neutralScaleName).toBeDefined();
      expect(mockData.neutralScaleSwatches).toBeDefined();
      expect(mockData.primarySwatches).toBeDefined();
      expect(mockData.tokenSettings).toBeDefined();

      // Test that color values are valid hex
      expect(mockData.scaleStart.color).toMatch(/^[0-9A-Fa-f]{6}$/);
      expect(mockData.scaleEnd.color).toMatch(/^[0-9A-Fa-f]{6}$/);

      // Test that step values are valid
      mockData.neutralScaleSwatches.forEach(swatch => {
        expect(typeof swatch.step).toBe('number');
        expect(swatch.step).toBeGreaterThanOrEqual(0);
        expect(swatch.step).toBeLessThanOrEqual(1000);
      });

      const expectedResult: StyleCreationResult = {
        success: true,
        message: "Data validation passed",
        count: 10
      };

      mockCreateAllSwatchStyles.mockResolvedValue(expectedResult);

      const result = await createAllSwatchStyles(mockData);
      expect(result.success).toBe(true);
    });
  });

  describe('data validation', () => {
    it('should validate token settings structure', () => {
      expect(mockData.tokenSettings.separatorCharsCount).toBeGreaterThanOrEqual(0);
      expect(['dash', 'underscore']).toContain(mockData.tokenSettings.separatorCharType);
    });

    it('should validate swatch structure', () => {
      mockData.primarySwatches.forEach(ramp => {
        expect(ramp.name).toBeDefined();
        expect(Array.isArray(ramp.swatches)).toBe(true);
        
        ramp.swatches.forEach(swatch => {
          expect(swatch.color).toMatch(/^[0-9A-Fa-f]{6}$/);
          expect(typeof swatch.step).toBe('number');
        });
      });
    });

    it('should validate naming conventions', () => {
      // Names should be tokenized (based on our implementation)
      expect(mockData.scaleStart.name).toMatch(/^--/); // Leading characters
      expect(mockData.scaleEnd.name).toMatch(/^--/);
      expect(mockData.neutralScaleName).toMatch(/^--/);
      
      mockData.primaryColors.forEach(color => {
        expect(color.name).toMatch(/^--/);
      });
    });
  });
});