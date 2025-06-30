/**
 * Test utilities and mocks for Figma API
 * Provides reusable mock implementations for testing plugin functionality
 */

export interface MockVariable {
  id: string;
  name: string;
  setValueForMode: jest.MockedFunction<any>;
  remove: jest.MockedFunction<any>;
}

export interface MockVariableCollection {
  id: string;
  name: string;
  variableIds: string[];
  modes: Array<{ modeId: string; name: string }>;
}

export interface MockFigmaAPI {
  variables: {
    createVariableCollection: jest.MockedFunction<any>;
    getLocalVariableCollections: jest.MockedFunction<any>;
    createVariable: jest.MockedFunction<any>;
    getVariableById: jest.MockedFunction<any>;
  };
}

/**
 * Creates a mock variable with default behavior
 */
export function createMockVariable(name: string, id?: string): MockVariable {
  return {
    id: id || `var-${name.replace(/[^a-zA-Z0-9]/g, '-')}`,
    name,
    setValueForMode: jest.fn(),
    remove: jest.fn()
  };
}

/**
 * Creates a mock variable collection with default behavior
 */
export function createMockCollection(name: string, id?: string): MockVariableCollection {
  return {
    id: id || `collection-${name.replace(/[^a-zA-Z0-9]/g, '-')}`,
    name,
    variableIds: [],
    modes: [{ modeId: 'mode-default', name: 'Default' }]
  };
}

/**
 * Creates a complete mock Figma API with configurable behavior
 */
export function createMockFigmaAPI(options: {
  collections?: MockVariableCollection[];
  variables?: MockVariable[];
  shouldThrow?: boolean;
} = {}): MockFigmaAPI {
  const { collections = [], variables = [], shouldThrow = false } = options;

  const variableMap = new Map(variables.map(v => [v.id, v]));
  let createdVariables: MockVariable[] = [];
  let createdCollections: MockVariableCollection[] = [];

  const mockAPI: MockFigmaAPI = {
    variables: {
      createVariableCollection: jest.fn((name: string) => {
        if (shouldThrow) throw new Error('Mock creation failed');
        
        const collection = createMockCollection(name);
        createdCollections.push(collection);
        return collection;
      }),

      getLocalVariableCollections: jest.fn(() => {
        return [...collections, ...createdCollections];
      }),

      createVariable: jest.fn((name: string, collectionId: string, type: string) => {
        if (shouldThrow) throw new Error('Mock variable creation failed');
        
        const variable = createMockVariable(name);
        createdVariables.push(variable);
        
        // Add to collection if it exists
        const collection = [...collections, ...createdCollections]
          .find(c => c.id === collectionId);
        if (collection) {
          collection.variableIds.push(variable.id);
        }
        
        return variable;
      }),

      getVariableById: jest.fn((id: string) => {
        return variableMap.get(id) || 
               createdVariables.find(v => v.id === id) || 
               null;
      })
    }
  };

  return mockAPI;
}

/**
 * Sets up global figma mock for tests
 */
export function setupFigmaMock(mockAPI: MockFigmaAPI): void {
  (global as any).figma = mockAPI;
}

/**
 * Creates test data for swatch stores
 */
export function createTestSwatchStore(overrides: any = {}) {
  const defaultStore = {
    shade: { color: '000000', name: 'Black', id: 'shade' },
    tint: { color: 'FFFFFF', name: 'White', id: 'tint' },
    primaryColors: [
      { color: '3B82F6', name: 'Blue', id: 'blue' },
      { color: '10B981', name: 'Green', id: 'green' }
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
        base: { color: '10B981', name: 'Green', id: 'green' },
        swatches: [
          { color: '059669', step: 100 },
          { color: '047857', step: 200 }
        ]
      }
    ],
    numberOfSteps: 5,
    steps: [100, 200, 300, 400, 500],
    customSteps: new Set([50]),
    combinedSteps: new Set([50, 100, 200, 300, 400, 500]),
    shadeTintRampName: 'Gray',
    // Mock getters
    getShade: jest.fn(),
    getTint: jest.fn(),
    getPrimaryColors: jest.fn(),
    getSwatches: jest.fn(),
    getNumberOfSteps: jest.fn(),
    getCustomSteps: jest.fn(),
    getTotalUniqueSteps: jest.fn(),
    getCombinedSteps: jest.fn(),
    getSteps: jest.fn(),
    getShadeTintRampName: jest.fn(),
    // Mock setters
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
    setShadeTintRampName: jest.fn()
  };

  const merged = { ...defaultStore, ...overrides };
  
  // Set up getter return values
  merged.getShade.mockReturnValue(merged.shade);
  merged.getTint.mockReturnValue(merged.tint);
  merged.getPrimaryColors.mockReturnValue(merged.primaryColors);
  merged.getSwatches.mockReturnValue(merged.swatches);
  merged.getNumberOfSteps.mockReturnValue(merged.numberOfSteps);
  merged.getCustomSteps.mockReturnValue(merged.customSteps);
  merged.getTotalUniqueSteps.mockReturnValue(merged.combinedSteps.size);
  merged.getCombinedSteps.mockReturnValue(merged.combinedSteps);
  merged.getSteps.mockReturnValue(merged.steps);
  merged.getShadeTintRampName.mockReturnValue(merged.shadeTintRampName);

  return merged;
}

/**
 * Creates test data for token stores
 */
export function createTestTokenStore(overrides: any = {}) {
  const defaultStore = {
    caseTreatment: 'lower' as const,
    spaceTreatment: 'dash' as const,
    leadingCharsCount: 2,
    separatorCharsCount: 1,
    leadingCharType: 'dash' as const,
    separatorCharType: 'underscore' as const,
    appendSeparatorToPrimitive: false,
    // Mock setters
    setCaseTreatment: jest.fn(),
    setSpaceTreatment: jest.fn(),
    setLeadingCharsCount: jest.fn(),
    setSeparatorCharsCount: jest.fn(),
    setLeadingCharType: jest.fn(),
    setSeparatorCharType: jest.fn(),
    setAppendSeparatorToPrimitive: jest.fn(),
    // Mock actions
    incrementLeadingChars: jest.fn(),
    decrementLeadingChars: jest.fn(),
    incrementSeparatorChars: jest.fn(),
    decrementSeparatorChars: jest.fn(),
    toggleLeadingCharType: jest.fn(),
    toggleSeparatorCharType: jest.fn(),
    toggleAppendSeparatorToPrimitive: jest.fn()
  };

  return { ...defaultStore, ...overrides };
}

/**
 * Assertion helpers for variable creation tests
 */
export class VariableTestAssertions {
  constructor(private mockAPI: MockFigmaAPI) {}

  /**
   * Assert that a variable was created with specific parameters
   */
  expectVariableCreated(name: string, collectionId: string, type: string = 'COLOR'): void {
    expect(this.mockAPI.variables.createVariable).toHaveBeenCalledWith(name, collectionId, type);
  }

  /**
   * Assert that a primitive variable was created
   */
  expectPrimitiveCreated(name: string, collectionId: string): void {
    this.expectVariableCreated(`primitives/${name}`, collectionId);
  }

  /**
   * Assert that a mixed variable was created
   */
  expectMixedCreated(groupName: string, variableName: string, collectionId: string): void {
    this.expectVariableCreated(`mixed/${groupName}/${variableName}`, collectionId);
  }

  /**
   * Assert that the correct number of variables were created
   */
  expectVariableCount(count: number): void {
    expect(this.mockAPI.variables.createVariable).toHaveBeenCalledTimes(count);
  }

  /**
   * Assert that a collection was created
   */
  expectCollectionCreated(name: string): void {
    expect(this.mockAPI.variables.createVariableCollection).toHaveBeenCalledWith(name);
  }

  /**
   * Get all created variable names for inspection
   */
  getCreatedVariableNames(): string[] {
    return this.mockAPI.variables.createVariable.mock.calls.map(call => call[0]);
  }

  /**
   * Assert that variable names follow expected patterns
   */
  expectNamingPattern(pattern: RegExp, message?: string): void {
    const names = this.getCreatedVariableNames();
    names.forEach(name => {
      expect(name).toMatch(pattern);
    });
  }

  /**
   * Assert that RGB values were set correctly for a variable
   */
  expectRGBValue(variable: MockVariable, r: number, g: number, b: number, modeId: string = 'mode-default'): void {
    expect(variable.setValueForMode).toHaveBeenCalledWith(modeId, { r, g, b });
  }
}

/**
 * Factory function to create a complete test setup
 */
export function createVariableTestSetup(options: {
  collections?: MockVariableCollection[];
  variables?: MockVariable[];
  shouldThrow?: boolean;
  swatchStoreOverrides?: any;
  tokenStoreOverrides?: any;
} = {}) {
  const {
    collections = [],
    variables = [],
    shouldThrow = false,
    swatchStoreOverrides = {},
    tokenStoreOverrides = {}
  } = options;

  const mockAPI = createMockFigmaAPI({ collections, variables, shouldThrow });
  setupFigmaMock(mockAPI);

  const swatchStore = createTestSwatchStore(swatchStoreOverrides);
  const tokenStore = createTestTokenStore(tokenStoreOverrides);
  const assertions = new VariableTestAssertions(mockAPI);

  return {
    mockAPI,
    swatchStore,
    tokenStore,
    assertions,
    cleanup: () => {
      jest.clearAllMocks();
    }
  };
}