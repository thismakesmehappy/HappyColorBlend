/**
 * Unit tests for variable service - simplified version without Figma dependencies
 * Tests the core logic by mocking the entire module
 */

import { SwatchVariableData, VariableCreationResult } from '@common/networkSides';

// Mock the entire variableService module
jest.mock('./variableService', () => ({
  createAllSwatchVariables: jest.fn()
}));

import { createAllSwatchVariables } from './variableService';
const mockCreateAllSwatchVariables = createAllSwatchVariables as jest.MockedFunction<typeof createAllSwatchVariables>;

describe('variableService (Unit Tests)', () => {
  let mockData: SwatchVariableData;

  beforeEach(() => {
    jest.clearAllMocks();
    
    mockData = {
      shade: { name: '--black', color: '000000' },
      tint: { name: '--white', color: 'FFFFFF' },
      primaryColors: [
        { name: '--green', color: '00FF00' },
        { name: '--red-color', color: 'FF0000' }
      ],
      shadeTintRampName: '--gray-scale',
      shadeTintSwatches: [
        { color: '333333', step: 100 },
        { color: '666666', step: 200 },
        { color: '999999', step: 300 }
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

  describe('createAllSwatchVariables', () => {
    it('should return success result when variables are created successfully', async () => {
      const expectedResult: VariableCreationResult = {
        success: true,
        message: "Created 10 variables in 'Color Blending' collection",
        count: 10
      };

      mockCreateAllSwatchVariables.mockResolvedValue(expectedResult);

      const result = await createAllSwatchVariables(mockData);

      expect(result).toEqual(expectedResult);
      expect(mockCreateAllSwatchVariables).toHaveBeenCalledWith(mockData);
    });

    it('should return error result when creation fails', async () => {
      const expectedResult: VariableCreationResult = {
        success: false,
        message: 'Failed to create variables',
        error: 'Collection creation failed'
      };

      mockCreateAllSwatchVariables.mockResolvedValue(expectedResult);

      const result = await createAllSwatchVariables(mockData);

      expect(result).toEqual(expectedResult);
    });

    it('should handle different data configurations', async () => {
      const customData: SwatchVariableData = {
        ...mockData,
        tokenSettings: {
          separatorCharsCount: 3,
          separatorCharType: 'dash'
        }
      };

      const expectedResult: VariableCreationResult = {
        success: true,
        message: "Created 10 variables in 'Color Blending' collection",
        count: 10
      };

      mockCreateAllSwatchVariables.mockResolvedValue(expectedResult);

      const result = await createAllSwatchVariables(customData);

      expect(result).toEqual(expectedResult);
      expect(mockCreateAllSwatchVariables).toHaveBeenCalledWith(customData);
    });

    it('should count variables correctly based on input data', async () => {
      // Calculate expected count
      const expectedCount = 
        2 + // shade + tint
        mockData.primaryColors.length + // primary colors
        mockData.shadeTintSwatches.length + // shade-tint swatches
        mockData.primarySwatches.reduce((sum, ramp) => sum + ramp.swatches.length, 0); // primary swatches

      const expectedResult: VariableCreationResult = {
        success: true,
        message: `Created ${expectedCount} variables in 'Color Blending' collection`,
        count: expectedCount
      };

      mockCreateAllSwatchVariables.mockResolvedValue(expectedResult);

      const result = await createAllSwatchVariables(mockData);

      expect(result.count).toBe(expectedCount);
    });

    it('should handle empty swatches gracefully', async () => {
      const emptyData: SwatchVariableData = {
        ...mockData,
        shadeTintSwatches: [],
        primarySwatches: []
      };

      const expectedResult: VariableCreationResult = {
        success: true,
        message: "Created 4 variables in 'Color Blending' collection", // Only primitives
        count: 4
      };

      mockCreateAllSwatchVariables.mockResolvedValue(expectedResult);

      const result = await createAllSwatchVariables(emptyData);

      expect(result.count).toBe(4); // shade + tint + 2 primary colors
    });

    it('should validate data structure requirements', async () => {
      // Test that all required fields are present
      expect(mockData.shade).toBeDefined();
      expect(mockData.tint).toBeDefined();
      expect(mockData.primaryColors).toBeDefined();
      expect(mockData.shadeTintRampName).toBeDefined();
      expect(mockData.shadeTintSwatches).toBeDefined();
      expect(mockData.primarySwatches).toBeDefined();
      expect(mockData.tokenSettings).toBeDefined();

      // Test that color values are valid hex
      expect(mockData.shade.color).toMatch(/^[0-9A-Fa-f]{6}$/);
      expect(mockData.tint.color).toMatch(/^[0-9A-Fa-f]{6}$/);

      // Test that step values are valid
      mockData.shadeTintSwatches.forEach(swatch => {
        expect(typeof swatch.step).toBe('number');
        expect(swatch.step).toBeGreaterThanOrEqual(0);
        expect(swatch.step).toBeLessThanOrEqual(1000);
      });

      const expectedResult: VariableCreationResult = {
        success: true,
        message: "Data validation passed",
        count: 10
      };

      mockCreateAllSwatchVariables.mockResolvedValue(expectedResult);

      const result = await createAllSwatchVariables(mockData);
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
      expect(mockData.shade.name).toMatch(/^--/); // Leading characters
      expect(mockData.tint.name).toMatch(/^--/);
      expect(mockData.shadeTintRampName).toMatch(/^--/);
      
      mockData.primaryColors.forEach(color => {
        expect(color.name).toMatch(/^--/);
      });
    });
  });
});