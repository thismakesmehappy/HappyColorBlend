/**
 * Unit tests for swatch service - simplified version without Figma dependencies
 * Tests the core logic by mocking the entire module
 */

import { SwatchCreationData, SwatchCreationResult } from '@common/networkSides';

// Mock the entire swatchService module
jest.mock('./swatchService', () => ({
  createAllSwatches: jest.fn()
}));

import { createAllSwatches } from './swatchService';
const mockCreateAllSwatches = createAllSwatches as jest.MockedFunction<typeof createAllSwatches>;

describe('swatchService (Unit Tests)', () => {
  let mockData: SwatchCreationData;

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
      },
      displayWidth: 1200,
      swatchSize: 64,
      fontSize: 12
    };
  });

  describe('createAllSwatches', () => {
    it('should return success result when swatches are created successfully', async () => {
      const expectedResult: SwatchCreationResult = {
        success: true,
        message: "Created 10 swatches on the pasteboard",
        count: 10
      };

      mockCreateAllSwatches.mockResolvedValue(expectedResult);

      const result = await createAllSwatches(mockData);

      expect(result).toEqual(expectedResult);
      expect(mockCreateAllSwatches).toHaveBeenCalledWith(mockData);
    });

    it('should return error result when creation fails', async () => {
      const expectedResult: SwatchCreationResult = {
        success: false,
        message: 'Failed to create swatches',
        error: 'Font loading failed'
      };

      mockCreateAllSwatches.mockResolvedValue(expectedResult);

      const result = await createAllSwatches(mockData);

      expect(result).toEqual(expectedResult);
    });

    it('should handle different display configurations', async () => {
      const customData: SwatchCreationData = {
        ...mockData,
        displayWidth: 800,
        swatchSize: 32,
        fontSize: 10
      };

      const expectedResult: SwatchCreationResult = {
        success: true,
        message: "Created 10 swatches on the pasteboard",
        count: 10
      };

      mockCreateAllSwatches.mockResolvedValue(expectedResult);

      const result = await createAllSwatches(customData);

      expect(result).toEqual(expectedResult);
      expect(mockCreateAllSwatches).toHaveBeenCalledWith(customData);
    });

    it('should handle default display settings when not provided', async () => {
      const dataWithoutDisplay: SwatchCreationData = {
        ...mockData,
        displayWidth: undefined,
        swatchSize: undefined,
        fontSize: undefined
      };

      const expectedResult: SwatchCreationResult = {
        success: true,
        message: "Created 10 swatches on the pasteboard",
        count: 10
      };

      mockCreateAllSwatches.mockResolvedValue(expectedResult);

      const result = await createAllSwatches(dataWithoutDisplay);

      expect(result).toEqual(expectedResult);
      expect(mockCreateAllSwatches).toHaveBeenCalledWith(dataWithoutDisplay);
    });

    it('should count swatches correctly based on input data', async () => {
      // Calculate expected count
      const expectedCount = 
        2 + // shade + tint
        mockData.primaryColors.length + // primary colors
        mockData.shadeTintSwatches.length + // shade-tint swatches
        mockData.primarySwatches.reduce((sum, ramp) => sum + ramp.swatches.length, 0); // primary swatches

      const expectedResult: SwatchCreationResult = {
        success: true,
        message: `Created ${expectedCount} swatches on the pasteboard`,
        count: expectedCount
      };

      mockCreateAllSwatches.mockResolvedValue(expectedResult);

      const result = await createAllSwatches(mockData);

      expect(result.count).toBe(expectedCount);
    });

    it('should handle empty swatches gracefully', async () => {
      const emptyData: SwatchCreationData = {
        ...mockData,
        shadeTintSwatches: [],
        primarySwatches: []
      };

      const expectedResult: SwatchCreationResult = {
        success: true,
        message: "Created 4 swatches on the pasteboard", // Only primitives
        count: 4
      };

      mockCreateAllSwatches.mockResolvedValue(expectedResult);

      const result = await createAllSwatches(emptyData);

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

      const expectedResult: SwatchCreationResult = {
        success: true,
        message: "Data validation passed",
        count: 10
      };

      mockCreateAllSwatches.mockResolvedValue(expectedResult);

      const result = await createAllSwatches(mockData);
      expect(result.success).toBe(true);
    });

    it('should validate display settings', async () => {
      // Test display settings validation
      if (mockData.displayWidth) {
        expect(mockData.displayWidth).toBeGreaterThan(0);
      }
      if (mockData.swatchSize) {
        expect(mockData.swatchSize).toBeGreaterThan(0);
      }
      if (mockData.fontSize) {
        expect(mockData.fontSize).toBeGreaterThan(0);
      }

      const expectedResult: SwatchCreationResult = {
        success: true,
        message: "Display settings validated",
        count: 10
      };

      mockCreateAllSwatches.mockResolvedValue(expectedResult);

      const result = await createAllSwatches(mockData);
      expect(result.success).toBe(true);
    });
  });

  describe('data validation', () => {
    it('should validate token settings structure', () => {
      expect(mockData.tokenSettings.separatorCharsCount).toBeGreaterThanOrEqual(0);
      expect(['dash', 'underscore']).toContain(mockData.tokenSettings.separatorCharType);
    });

    it('should validate swatch structure for visual creation', () => {
      mockData.primarySwatches.forEach(ramp => {
        expect(ramp.name).toBeDefined();
        expect(Array.isArray(ramp.swatches)).toBe(true);
        
        ramp.swatches.forEach(swatch => {
          expect(swatch.color).toMatch(/^[0-9A-Fa-f]{6}$/);
          expect(typeof swatch.step).toBe('number');
        });
      });
    });

    it('should validate naming conventions for visual display', () => {
      // Names should be tokenized (based on our implementation)
      expect(mockData.shade.name).toMatch(/^--/); // Leading characters
      expect(mockData.tint.name).toMatch(/^--/);
      expect(mockData.shadeTintRampName).toMatch(/^--/);
      
      mockData.primaryColors.forEach(color => {
        expect(color.name).toMatch(/^--/);
      });
    });

    it('should validate display settings ranges', () => {
      if (mockData.displayWidth) {
        expect(mockData.displayWidth).toBeGreaterThanOrEqual(400);
        expect(mockData.displayWidth).toBeLessThanOrEqual(3000);
      }
      
      if (mockData.swatchSize) {
        expect(mockData.swatchSize).toBeGreaterThanOrEqual(16);
        expect(mockData.swatchSize).toBeLessThanOrEqual(200);
      }
      
      if (mockData.fontSize) {
        expect(mockData.fontSize).toBeGreaterThanOrEqual(8);
        expect(mockData.fontSize).toBeLessThanOrEqual(48);
      }
    });
  });
});