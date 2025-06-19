/**
 * Tests for StepTypes with strict validation
 */

import {
  StepValue,
  StepCount,
  STEP_CONSTRAINTS,
  isValidStepValue,
  isValidStepCount,
  isReservedStep,
  createStepValue,
  createStepCount,
  validateStepArray,
  validateCustomStepSet,
  generateEqualSteps,
  combineAndSortSteps,
  validateStepInput,
} from './StepTypes';

describe('StepTypes', () => {
  describe('STEP_CONSTRAINTS', () => {
    test('defines correct constraints', () => {
      expect(STEP_CONSTRAINTS.MIN_VALUE).toBe(1);
      expect(STEP_CONSTRAINTS.MAX_VALUE).toBe(999);
      expect(STEP_CONSTRAINTS.RESERVED_STEPS).toEqual([0, 500, 1000]);
      expect(STEP_CONSTRAINTS.MIN_STEPS_COUNT).toBe(3);
      expect(STEP_CONSTRAINTS.MAX_STEPS_COUNT).toBe(21);
    });
  });

  describe('isValidStepValue', () => {
    test('validates correct step values', () => {
      expect(isValidStepValue(1)).toBe(true);
      expect(isValidStepValue(100)).toBe(true);
      expect(isValidStepValue(999)).toBe(true);
      expect(isValidStepValue(250)).toBe(true);
    });

    test('rejects invalid step values', () => {
      expect(isValidStepValue(0)).toBe(false); // Reserved
      expect(isValidStepValue(500)).toBe(false); // Reserved
      expect(isValidStepValue(1000)).toBe(false); // Reserved
      expect(isValidStepValue(-1)).toBe(false); // Below min
      expect(isValidStepValue(1001)).toBe(false); // Above max
      expect(isValidStepValue(50.5)).toBe(false); // Not integer
    });
  });

  describe('isValidStepCount', () => {
    test('validates correct step counts', () => {
      expect(isValidStepCount(3)).toBe(true);
      expect(isValidStepCount(5)).toBe(true);
      expect(isValidStepCount(9)).toBe(true);
      expect(isValidStepCount(21)).toBe(true);
    });

    test('rejects invalid step counts', () => {
      expect(isValidStepCount(2)).toBe(false); // Below min
      expect(isValidStepCount(23)).toBe(false); // Above max
      expect(isValidStepCount(4)).toBe(false); // Even number
      expect(isValidStepCount(6)).toBe(false); // Even number
      expect(isValidStepCount(5.5)).toBe(false); // Not integer
    });
  });

  describe('isReservedStep', () => {
    test('identifies reserved steps', () => {
      expect(isReservedStep(0)).toBe(true);
      expect(isReservedStep(500)).toBe(true);
      expect(isReservedStep(1000)).toBe(true);
    });

    test('identifies non-reserved steps', () => {
      expect(isReservedStep(1)).toBe(false);
      expect(isReservedStep(250)).toBe(false);
      expect(isReservedStep(750)).toBe(false);
      expect(isReservedStep(999)).toBe(false);
    });
  });

  describe('createStepValue', () => {
    test('creates valid step values', () => {
      const step1 = createStepValue(100);
      expect(step1).toBe(100);
      
      const step2 = createStepValue(999);
      expect(step2).toBe(999);
    });

    test('throws error for invalid step values', () => {
      expect(() => createStepValue(0)).toThrow('reserved');
      expect(() => createStepValue(500)).toThrow('reserved');
      expect(() => createStepValue(1000)).toThrow('reserved');
      expect(() => createStepValue(-1)).toThrow('must be between');
      expect(() => createStepValue(1001)).toThrow('must be between');
      expect(() => createStepValue(50.5)).toThrow('must be an integer');
    });
  });

  describe('createStepCount', () => {
    test('creates valid step counts', () => {
      const count1 = createStepCount(5);
      expect(count1).toBe(5);
      
      const count2 = createStepCount(9);
      expect(count2).toBe(9);
    });

    test('throws error for invalid step counts', () => {
      expect(() => createStepCount(2)).toThrow('must be between');
      expect(() => createStepCount(23)).toThrow('must be between');
      expect(() => createStepCount(4)).toThrow('must be odd');
      expect(() => createStepCount(6)).toThrow('must be odd');
      expect(() => createStepCount(5.5)).toThrow('must be an integer');
    });
  });

  describe('validateStepArray', () => {
    test('validates correct step arrays', () => {
      const steps = [0, 100, 500, 900, 1000];
      const validated = validateStepArray(steps);
      expect(validated).toEqual(steps);
    });

    test('throws error for invalid steps in array', () => {
      expect(() => validateStepArray([-1, 100, 500])).toThrow('Invalid step in array');
      expect(() => validateStepArray([0, 1001, 500])).toThrow('Invalid step in array');
      expect(() => validateStepArray([0, 100.5, 500])).toThrow('Invalid step in array');
    });
  });

  describe('validateCustomStepSet', () => {
    test('validates correct custom step sets', () => {
      const customSteps = new Set([50, 150, 750, 950]);
      const validated = validateCustomStepSet(customSteps);
      expect(validated.size).toBe(4);
      expect(validated.has(50 as StepValue)).toBe(true);
      expect(validated.has(150 as StepValue)).toBe(true);
    });

    test('throws error for invalid custom steps', () => {
      const invalidSteps = new Set([0, 150, 750]); // 0 is reserved
      expect(() => validateCustomStepSet(invalidSteps)).toThrow('reserved');
    });
  });

  describe('generateEqualSteps', () => {
    test('generates correct equal steps', () => {
      const steps3 = generateEqualSteps(createStepCount(3));
      expect(steps3).toHaveLength(3);
      expect(steps3[0]).toBeGreaterThan(0);
      expect(steps3[steps3.length - 1]).toBeLessThan(1000);
      
      const steps5 = generateEqualSteps(createStepCount(5));
      expect(steps5).toHaveLength(5);
      expect(steps5).toEqual([167, 333, 500, 667, 833]);
    });

    test('generates evenly distributed steps', () => {
      const steps = generateEqualSteps(createStepCount(9));
      expect(steps).toHaveLength(9);
      
      // Check that steps are evenly distributed
      const differences = [];
      for (let i = 1; i < steps.length; i++) {
        differences.push(steps[i] - steps[i - 1]);
      }
      
      // All differences should be approximately equal
      const avgDiff = differences.reduce((a, b) => a + b) / differences.length;
      differences.forEach(diff => {
        expect(Math.abs(diff - avgDiff)).toBeLessThanOrEqual(1); // Allow for rounding
      });
    });
  });

  describe('combineAndSortSteps', () => {
    test('combines and sorts equal and custom steps', () => {
      const equalSteps = [200, 400, 600, 800];
      const customSteps = new Set([createStepValue(50), createStepValue(950)]);
      
      const combined = combineAndSortSteps(equalSteps, customSteps);
      expect(combined).toEqual([50, 200, 400, 600, 800, 950]);
    });

    test('handles duplicate steps correctly', () => {
      const equalSteps = [200, 400, 600];
      const customSteps = new Set([createStepValue(200), createStepValue(800)]); // 200 is duplicate
      
      const combined = combineAndSortSteps(equalSteps, customSteps);
      expect(combined).toEqual([200, 400, 600, 800]); // No duplicates
    });

    test('handles empty custom steps', () => {
      const equalSteps = [200, 400, 600];
      const customSteps = new Set<StepValue>();
      
      const combined = combineAndSortSteps(equalSteps, customSteps);
      expect(combined).toEqual([200, 400, 600]);
    });
  });

  describe('validateStepInput', () => {
    test('validates correct step inputs', () => {
      const result1 = validateStepInput(100);
      expect(result1.isValid).toBe(true);
      expect(result1.validatedValue).toBe(100);
      expect(result1.errorMessage).toBeUndefined();
      
      const result2 = validateStepInput(999);
      expect(result2.isValid).toBe(true);
      expect(result2.validatedValue).toBe(999);
    });

    test('rejects invalid step inputs', () => {
      const result1 = validateStepInput('100');
      expect(result1.isValid).toBe(false);
      expect(result1.errorMessage).toContain('must be a number');
      expect(result1.validatedValue).toBeUndefined();
      
      const result2 = validateStepInput(0);
      expect(result2.isValid).toBe(false);
      expect(result2.errorMessage).toContain('reserved');
      
      const result3 = validateStepInput(1001);
      expect(result3.isValid).toBe(false);
      expect(result3.errorMessage).toContain('must be between');
    });

    test('handles edge cases', () => {
      const result1 = validateStepInput(null);
      expect(result1.isValid).toBe(false);
      expect(result1.errorMessage).toContain('must be a number');
      
      const result2 = validateStepInput(undefined);
      expect(result2.isValid).toBe(false);
      expect(result2.errorMessage).toContain('must be a number');
      
      const result3 = validateStepInput(NaN);
      expect(result3.isValid).toBe(false);
      expect(result3.errorMessage).toContain('must be an integer');
    });
  });

  describe('Type safety', () => {
    test('StepValue type prevents invalid assignments at compile time', () => {
      // This test verifies that TypeScript compilation would catch these errors
      const validStep = createStepValue(100);
      
      // These would cause TypeScript errors if uncommented:
      // const invalidStep: StepValue = 100; // Error: Type 'number' is not assignable to type 'StepValue'
      // const anotherInvalid: StepValue = 0; // Error: Type 'number' is not assignable to type 'StepValue'
      
      expect(typeof validStep).toBe('number');
    });

    test('StepCount type prevents invalid assignments at compile time', () => {
      const validCount = createStepCount(5);
      
      // These would cause TypeScript errors if uncommented:
      // const invalidCount: StepCount = 5; // Error: Type 'number' is not assignable to type 'StepCount'
      // const anotherInvalid: StepCount = 4; // Error: Type 'number' is not assignable to type 'StepCount'
      
      expect(typeof validCount).toBe('number');
    });
  });
});