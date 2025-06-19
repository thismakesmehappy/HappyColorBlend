/**
 * Swatch data structure types with strict validation
 */

import { HexColor, createHexColor, isValidHexColor } from './ColorTypes';
import { StepValue, createStepValue, isValidStepValue } from './StepTypes';

// Base swatch types with type safety
export interface TypeSafeInputSwatch {
  readonly color: HexColor;
  readonly name: string;
  readonly id?: string;
}

export interface TypeSafeSwatch {
  readonly color: HexColor;
  readonly step: number; // Can include reserved steps like 0, 500, 1000
}

export interface TypeSafeSwatchGroup {
  readonly base: TypeSafeInputSwatch;
  readonly swatches: readonly TypeSafeSwatch[];
}

// Validation utilities for swatch data
export const isValidSwatchName = (name: string): boolean => {
  return (
    typeof name === 'string' &&
    name.trim().length > 0 &&
    name.trim().length <= 50 &&
    /^[a-zA-Z0-9\s\-_]+$/.test(name.trim())
  );
};

export const isValidSwatchId = (id: string): boolean => {
  return (
    typeof id === 'string' &&
    id.trim().length > 0 &&
    id.trim().length <= 100 &&
    /^[a-zA-Z0-9\-_]+$/.test(id.trim())
  );
};

// Type guards for runtime validation
export const createInputSwatch = (
  color: string,
  name: string,
  id?: string
): TypeSafeInputSwatch => {
  // Validate color
  const validColor = createHexColor(color);
  
  // Validate name
  if (!isValidSwatchName(name)) {
    throw new Error(
      `Invalid swatch name: "${name}". Must be 1-50 characters, alphanumeric with spaces, hyphens, underscores only`
    );
  }
  
  // Validate id if provided
  if (id !== undefined && !isValidSwatchId(id)) {
    throw new Error(
      `Invalid swatch id: "${id}". Must be 1-100 characters, alphanumeric with hyphens, underscores only`
    );
  }
  
  return {
    color: validColor,
    name: name.trim(),
    id: id?.trim(),
  };
};

export const createSwatch = (color: string, step: number): TypeSafeSwatch => {
  // Validate color
  const validColor = createHexColor(color);
  
  // Validate step (allow all steps including reserved ones for swatches)
  if (!Number.isInteger(step) || step < 0 || step > 1000) {
    throw new Error(`Invalid step: ${step}. Must be integer 0-1000`);
  }
  
  return {
    color: validColor,
    step,
  };
};

export const createSwatchGroup = (
  base: TypeSafeInputSwatch,
  swatches: TypeSafeSwatch[]
): TypeSafeSwatchGroup => {
  // Validate that swatches array is not empty
  if (!Array.isArray(swatches) || swatches.length === 0) {
    throw new Error('Swatch group must contain at least one swatch');
  }
  
  // Validate that all steps are unique
  const steps = swatches.map(s => s.step);
  const uniqueSteps = new Set(steps);
  if (steps.length !== uniqueSteps.size) {
    throw new Error('Swatch group cannot contain duplicate steps');
  }
  
  // Sort swatches by step for consistency
  const sortedSwatches = [...swatches].sort((a, b) => a.step - b.step);
  
  return {
    base,
    swatches: sortedSwatches,
  };
};

// Validation result types
export interface SwatchValidationResult {
  readonly isValid: boolean;
  readonly errorMessage?: string;
  readonly validatedSwatch?: TypeSafeInputSwatch;
}

export const validateInputSwatchData = (data: unknown): SwatchValidationResult => {
  if (typeof data !== 'object' || data === null) {
    return {
      isValid: false,
      errorMessage: 'Swatch data must be an object',
    };
  }
  
  const swatchData = data as Record<string, unknown>;
  
  // Validate required fields
  if (typeof swatchData.color !== 'string') {
    return {
      isValid: false,
      errorMessage: 'Swatch color must be a string',
    };
  }
  
  if (typeof swatchData.name !== 'string') {
    return {
      isValid: false,
      errorMessage: 'Swatch name must be a string',
    };
  }
  
  // Validate optional id field
  if (swatchData.id !== undefined && typeof swatchData.id !== 'string') {
    return {
      isValid: false,
      errorMessage: 'Swatch id must be a string if provided',
    };
  }
  
  try {
    const validatedSwatch = createInputSwatch(
      swatchData.color,
      swatchData.name,
      swatchData.id as string | undefined
    );
    
    return {
      isValid: true,
      validatedSwatch,
    };
  } catch (error) {
    return {
      isValid: false,
      errorMessage: error instanceof Error ? error.message : 'Unknown validation error',
    };
  }
};

// Conversion utilities for backward compatibility
export const convertLegacyInputSwatch = (legacy: {
  color: string;
  name: string;
  id?: string;
}): TypeSafeInputSwatch => {
  return createInputSwatch(legacy.color, legacy.name, legacy.id);
};

export const convertLegacySwatch = (legacy: {
  color: string;
  step: number;
}): TypeSafeSwatch => {
  return createSwatch(legacy.color, legacy.step);
};

export const convertLegacySwatchGroup = (legacy: {
  base: { color: string; name: string; id?: string };
  swatches: { color: string; step: number }[];
}): TypeSafeSwatchGroup => {
  const base = convertLegacyInputSwatch(legacy.base);
  const swatches = legacy.swatches.map(convertLegacySwatch);
  return createSwatchGroup(base, swatches);
};

// Utility functions for swatch operations
export const findSwatchByStep = (
  group: TypeSafeSwatchGroup,
  step: number
): TypeSafeSwatch | undefined => {
  return group.swatches.find(swatch => swatch.step === step);
};

export const getSwatchSteps = (group: TypeSafeSwatchGroup): number[] => {
  return group.swatches.map(swatch => swatch.step).sort((a, b) => a - b);
};

export const validateSwatchGroupConsistency = (groups: TypeSafeSwatchGroup[]): void => {
  if (groups.length === 0) return;
  
  // All groups should have the same steps
  const firstGroupSteps = getSwatchSteps(groups[0]);
  
  for (let i = 1; i < groups.length; i++) {
    const currentGroupSteps = getSwatchSteps(groups[i]);
    
    if (firstGroupSteps.length !== currentGroupSteps.length ||
        !firstGroupSteps.every((step, index) => step === currentGroupSteps[index])) {
      throw new Error(`Swatch group ${i} has inconsistent steps compared to first group`);
    }
  }
};