/**
 * Service for creating and managing Figma variables from color swatches
 */

import { SwatchVariableData, VariableCreationResult } from "@common/networkSides";

/**
 * Convert hex color to RGB object with values 0-1 for Figma API
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  // Remove # if present
  const cleanHex = hex.replace('#', '');
  
  const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
  const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
  const b = parseInt(cleanHex.substring(4, 6), 16) / 255;
  
  return { r, g, b };
}

/**
 * Create or update a variable collection with collision handling
 */
function createOrUpdateCollection(name: string): VariableCollection {
  const existingCollections = figma.variables.getLocalVariableCollections();
  const existingCollection = existingCollections.find(collection => collection.name === name);
  
  if (existingCollection) {
    // Rename existing collection with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    existingCollection.name = `${name} (${timestamp})`;
  }
  
  return figma.variables.createVariableCollection(name);
}

/**
 * Check if a variable with the given name exists in the collection
 */
function findVariableByName(collection: VariableCollection, name: string): Variable | null {
  for (const variableId of collection.variableIds) {
    const variable = figma.variables.getVariableById(variableId);
    if (variable && variable.name === name) {
      return variable;
    }
  }
  return null;
}

/**
 * Create a color variable, replacing existing one if it exists
 */
function createColorVariable(
  collection: VariableCollection,
  name: string,
  hexColor: string
): Variable {
  const rgb = hexToRgb(hexColor);
  
  // Check if variable already exists and remove it
  const existingVariable = findVariableByName(collection, name);
  if (existingVariable) {
    existingVariable.remove();
  }
  
  // Create new variable
  const variable = figma.variables.createVariable(name, collection.id, "COLOR");
  
  // Set the color value for the default mode
  const modes = collection.modes;
  if (modes.length > 0) {
    variable.setValueForMode(modes[0].modeId, rgb);
  }
  
  return variable;
}

/**
 * Format step number with padding (following existing SwatchColorChip pattern)
 */
function formatStepNumber(step: number): string {
  return step.toString().padStart(3, '0');
}

/**
 * Create separator characters based on token settings
 */
function createSeparator(count: number, charType: 'dash' | 'underscore'): string {
  const char = charType === 'dash' ? '-' : '_';
  return char.repeat(count);
}

/**
 * Main function to create all swatch variables
 */
export async function createAllSwatchVariables(data: SwatchVariableData): Promise<VariableCreationResult> {
  try {
    let variableCount = 0;
    
    // 1. Create collection
    const collection = createOrUpdateCollection("Color Blending");
    
    // 2. Create primitive variables (using naming convention for organization)
    // Create shade variable
    createColorVariable(collection, `primitives/${data.shade.name}`, data.shade.color);
    variableCount++;
    
    // Create tint variable  
    createColorVariable(collection, `primitives/${data.tint.name}`, data.tint.color);
    variableCount++;
    
    // Create primary color variables
    for (const primaryColor of data.primaryColors) {
      createColorVariable(collection, `primitives/${primaryColor.name}`, primaryColor.color);
      variableCount++;
    }
    
    // 3. Create shade-tint ramp variables
    const separator = createSeparator(data.tokenSettings.separatorCharsCount, data.tokenSettings.separatorCharType);
    for (const swatch of data.shadeTintSwatches) {
      const variableName = `mixed/${data.shadeTintRampName}/${data.shadeTintRampName}${separator}${formatStepNumber(swatch.step)}`;
      createColorVariable(collection, variableName, swatch.color);
      variableCount++;
    }
    
    // 4. Create primary color ramp variables
    for (const primaryRamp of data.primarySwatches) {
      for (const swatch of primaryRamp.swatches) {
        const variableName = `mixed/${primaryRamp.name}/${primaryRamp.name}${separator}${formatStepNumber(swatch.step)}`;
        createColorVariable(collection, variableName, swatch.color);
        variableCount++;
      }
    }
    
    return {
      success: true,
      message: `Created ${variableCount} variables in 'Color Blending' collection`,
      count: variableCount
    };
    
  } catch (error) {
    return {
      success: false,
      message: "Failed to create variables",
      error: error instanceof Error ? error.message : String(error)
    };
  }
}