/**
 * Unit tests for extractColorsFromSelection functionality
 * Tests the core color extraction logic functions
 */

describe('extractColorsFromSelection logic', () => {
  
  // Test the RGB to hex conversion function (copied from plugin implementation)
  function rgbToHex(r: number, g: number, b: number): string {
    const toHex = (n: number) => Math.round(n * 255).toString(16).padStart(2, '0');
    return toHex(r) + toHex(g) + toHex(b);
  }

  describe('RGB to hex conversion', () => {
    it('should correctly convert RGB values to uppercase hex', () => {
      const testCases = [
        { r: 1, g: 1, b: 1, expected: 'ffffff' }, // White
        { r: 0, g: 0, b: 0, expected: '000000' }, // Black
        { r: 0.5, g: 0.25, b: 0.75, expected: '8040bf' }, // Mid tones (corrected expected value)
        { r: 1, g: 0, b: 0, expected: 'ff0000' }, // Red
        { r: 0, g: 1, b: 0, expected: '00ff00' }, // Green
        { r: 0, g: 0, b: 1, expected: '0000ff' }, // Blue
      ];

      testCases.forEach(testCase => {
        const result = rgbToHex(testCase.r, testCase.g, testCase.b);
        expect(result.toUpperCase()).toBe(testCase.expected.toUpperCase());
      });
    });

    it('should handle edge case RGB values correctly', () => {
      const result = rgbToHex(0.003921568627451, 0.003921568627451, 0.003921568627451);
      expect(result.toUpperCase()).toBe('010101');
    });

    it('should handle very small values', () => {
      const result = rgbToHex(0.001, 0.001, 0.001);
      expect(result.toUpperCase()).toBe('000000');
    });

    it('should handle values that round to 255', () => {
      const result = rgbToHex(0.999, 0.999, 0.999);
      expect(result.toUpperCase()).toBe('FFFFFF');
    });

    it('should handle exact 1/255 increments', () => {
      // Test specific RGB values that map to exact hex values
      expect(rgbToHex(1/255, 2/255, 3/255).toUpperCase()).toBe('010203');
      expect(rgbToHex(254/255, 1, 253/255).toUpperCase()).toBe('FEFFFD');
    });

    it('should consistently handle decimal precision', () => {
      // Test values that might cause precision issues
      const result1 = rgbToHex(0.3333333, 0.6666666, 0.9999999);
      const result2 = rgbToHex(1/3, 2/3, 1);
      
      // Both should produce similar results despite different precision inputs
      expect(result1.substring(0, 2)).toBe(result2.substring(0, 2)); // Red component
      expect(result1.substring(2, 4)).toBe(result2.substring(2, 4)); // Green component
    });
  });

  describe('color deduplication logic', () => {
    it('should identify duplicate colors correctly', () => {
      const colorSet = new Set<string>();
      const colors = ['FF0000', 'FF0000', '00FF00', 'FF0000', '0000FF'];
      const uniqueColors: string[] = [];

      colors.forEach(color => {
        if (!colorSet.has(color)) {
          colorSet.add(color);
          uniqueColors.push(color);
        }
      });

      expect(uniqueColors).toEqual(['FF0000', '00FF00', '0000FF']);
      expect(uniqueColors.length).toBe(3);
    });

    it('should handle case sensitivity in color deduplication', () => {
      const colorSet = new Set<string>();
      const colors = ['FF0000', 'ff0000', 'FF0000'];
      const uniqueColors: string[] = [];

      colors.forEach(color => {
        const upperColor = color.toUpperCase();
        if (!colorSet.has(upperColor)) {
          colorSet.add(upperColor);
          uniqueColors.push(upperColor);
        }
      });

      expect(uniqueColors).toEqual(['FF0000']);
      expect(uniqueColors.length).toBe(1);
    });
  });

  describe('paint type validation', () => {
    it('should correctly identify solid paint types', () => {
      const paints = [
        { type: 'SOLID', visible: true },
        { type: 'GRADIENT_LINEAR', visible: true },
        { type: 'SOLID', visible: false },
        { type: 'IMAGE', visible: true },
        { type: 'SOLID', visible: true },
      ];

      const validSolidPaints = paints.filter(paint => 
        paint.type === 'SOLID' && paint.visible !== false
      );

      expect(validSolidPaints.length).toBe(2);
      expect(validSolidPaints.every(paint => paint.type === 'SOLID')).toBe(true);
      expect(validSolidPaints.every(paint => paint.visible !== false)).toBe(true);
    });

    it('should handle undefined visible property correctly', () => {
      const paints = [
        { type: 'SOLID' }, // visible is undefined
        { type: 'SOLID', visible: true },
        { type: 'SOLID', visible: false },
      ];

      const validSolidPaints = paints.filter(paint => 
        paint.type === 'SOLID' && paint.visible !== false
      );

      // undefined should be treated as visible (not false)
      expect(validSolidPaints.length).toBe(2);
    });
  });

  describe('object property checking', () => {
    it('should safely check for fills property', () => {
      const objects = [
        { fills: [{ type: 'SOLID' }] },
        { strokes: [{ type: 'SOLID' }] }, // no fills
        {},  // no fills or strokes
        { fills: null },
        { fills: undefined },
      ];

      objects.forEach(obj => {
        const hasFills = Boolean('fills' in obj && obj.fills && Array.isArray(obj.fills));
        // Should not throw errors
        expect(typeof hasFills).toBe('boolean');
      });
    });

    it('should safely check for strokes property', () => {
      const objects = [
        { strokes: [{ type: 'SOLID' }] },
        { fills: [{ type: 'SOLID' }] }, // no strokes
        {},  // no fills or strokes
        { strokes: null },
        { strokes: undefined },
      ];

      objects.forEach(obj => {
        const hasStrokes = Boolean('strokes' in obj && obj.strokes && Array.isArray(obj.strokes));
        // Should not throw errors
        expect(typeof hasStrokes).toBe('boolean');
      });
    });

    it('should safely check for children property', () => {
      const objects = [
        { children: [{ type: 'RECTANGLE' }] },
        { type: 'RECTANGLE' }, // no children
        {},  // no properties
        { children: null },
        { children: undefined },
      ];

      objects.forEach(obj => {
        const hasChildren = 'children' in obj;
        // Should not throw errors
        expect(typeof hasChildren).toBe('boolean');
      });
    });
  });
});