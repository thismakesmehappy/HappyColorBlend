/**
 * Step configuration types with validation
 */

// Step value constraints
export const STEP_CONSTRAINTS = {
  MIN_VALUE: 1,
  MAX_VALUE: 999,
  RESERVED_STEPS: [0, 500, 1000],
  MIN_STEPS_COUNT: 3,
  MAX_STEPS_COUNT: 21,
} as const;

// Base step types
export type StepValue = number & { readonly __stepBrand: unique symbol };
export type StepCount = number & { readonly __stepCountBrand: unique symbol };

// Step validation utilities
export const isValidStepValue = (value: number): value is StepValue => {
  return (
    Number.isInteger(value) &&
    value >= STEP_CONSTRAINTS.MIN_VALUE &&
    value <= STEP_CONSTRAINTS.MAX_VALUE &&
    !(STEP_CONSTRAINTS.RESERVED_STEPS as readonly number[]).includes(value)
  );
};

export const isValidStepCount = (count: number): count is StepCount => {
  return (
    Number.isInteger(count) &&
    count >= STEP_CONSTRAINTS.MIN_STEPS_COUNT &&
    count <= STEP_CONSTRAINTS.MAX_STEPS_COUNT &&
    count % 2 === 1 // Must be odd number for proper color distribution
  );
};

export const isReservedStep = (value: number): boolean => {
  return (STEP_CONSTRAINTS.RESERVED_STEPS as readonly number[]).includes(value);
};

// Type guards for runtime validation
export const createStepValue = (value: number): StepValue => {
  if (!Number.isInteger(value)) {
    throw new Error(`Step value must be an integer, got: ${value}`);
  }

  if (isReservedStep(value)) {
    throw new Error(
      `Step value ${value} is reserved. Reserved values: ${STEP_CONSTRAINTS.RESERVED_STEPS.join(', ')}`
    );
  }

  if (value < STEP_CONSTRAINTS.MIN_VALUE || value > STEP_CONSTRAINTS.MAX_VALUE) {
    throw new Error(
      `Step value must be between ${STEP_CONSTRAINTS.MIN_VALUE} and ${STEP_CONSTRAINTS.MAX_VALUE}, got: ${value}`
    );
  }

  return value as StepValue;
};

export const createStepCount = (count: number): StepCount => {
  if (!Number.isInteger(count)) {
    throw new Error(`Step count must be an integer, got: ${count}`);
  }

  if (count < STEP_CONSTRAINTS.MIN_STEPS_COUNT || count > STEP_CONSTRAINTS.MAX_STEPS_COUNT) {
    throw new Error(
      `Step count must be between ${STEP_CONSTRAINTS.MIN_STEPS_COUNT} and ${STEP_CONSTRAINTS.MAX_STEPS_COUNT}, got: ${count}`
    );
  }

  if (count % 2 === 0) {
    throw new Error(`Step count must be odd for proper color distribution, got: ${count}`);
  }

  return count as StepCount;
};

// Step collection types
export interface StepConfiguration {
  readonly numberOfSteps: StepCount;
  readonly equalSteps: readonly number[];
  readonly customSteps: ReadonlySet<StepValue>;
  readonly combinedSteps: ReadonlySet<number>;
}

// Step validation for collections
export const validateStepArray = (steps: number[]): number[] => {
  return steps.map(step => {
    if (!Number.isInteger(step) || step < 0 || step > 1000) {
      throw new Error(`Invalid step in array: ${step}. Steps must be integers 0-1000`);
    }
    return step;
  });
};

export const validateCustomStepSet = (steps: Set<number>): Set<StepValue> => {
  const validatedSteps = new Set<StepValue>();

  for (const step of steps) {
    validatedSteps.add(createStepValue(step));
  }

  return validatedSteps;
};

// Step generation utilities with validation
export const generateEqualSteps = (count: StepCount): number[] => {
  const steps: number[] = [];
  const stepSize = 1000 / (count + 1);

  for (let i = 1; i <= count; i++) {
    steps.push(Math.round(i * stepSize));
  }

  return validateStepArray(steps);
};

export const combineAndSortSteps = (
  equalSteps: readonly number[],
  customSteps: ReadonlySet<StepValue>
): number[] => {
  const combined = new Set<number>();

  // Add equal steps
  equalSteps.forEach(step => combined.add(step));

  // Add custom steps
  customSteps.forEach(step => combined.add(step));

  // Convert to sorted array
  return Array.from(combined).sort((a, b) => a - b);
};

// Step validation result types
export interface StepValidationResult {
  readonly isValid: boolean;
  readonly errorMessage?: string;
  readonly validatedValue?: StepValue;
}

export const validateStepInput = (input: unknown): StepValidationResult => {
  if (typeof input !== 'number') {
    return {
      isValid: false,
      errorMessage: `Step must be a number, got: ${typeof input}`,
    };
  }

  try {
    const validatedValue = createStepValue(input);
    return {
      isValid: true,
      validatedValue,
    };
  } catch (error) {
    return {
      isValid: false,
      errorMessage: error instanceof Error ? error.message : 'Unknown validation error',
    };
  }
};
