/**
 * Service for creating and managing Figma variables from color swatches
 */

import {SwatchVariableData, VariableCreationResult} from "@common/networkSides";
import {OUTPUT_NAME_PREFIX} from "../../constants/uiConstants";

/**
 * Convert hex color to RGB object with values 0-1 for Figma API
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } {
    // Remove # if present
    const cleanHex = hex.replace('#', '');

    const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
    const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
    const b = parseInt(cleanHex.substring(4, 6), 16) / 255;

    return {r, g, b};
}

/**
 * Create or update a variable collection with collision handling
 */
async function createOrUpdateCollection(name: string): Promise<VariableCollection> {
    const existingCollections = await figma.variables.getLocalVariableCollectionsAsync();

    // Find the active collection (exact name match, not archived)
    const activeCollection = existingCollections.find(collection => collection.name === name);

    if (activeCollection) {
        // Get current date for archiving
        const now = new Date();
        const archiveDate = now.getFullYear() + '-' +
            String(now.getMonth() + 1).padStart(2, '0') + '-' +
            String(now.getDate()).padStart(2, '0');

        // Find all existing archived collections for today
        const archivedToday = existingCollections.filter(collection => 
            collection.name.includes(`(archived ${archiveDate}`)
        );

        const nextNumber = archivedToday.length + 1;
        activeCollection.name = `${name} (archived ${archiveDate} ${nextNumber})`;
    }

    // Create new collection without timestamp
    return figma.variables.createVariableCollection(name);
}

/**
 * Check if a variable with the given name exists in the collection
 */
async function findVariableByName(collection: VariableCollection, name: string): Promise<Variable | null> {
    for (const variableId of collection.variableIds) {
        const variable = await figma.variables.getVariableByIdAsync(variableId);
        if (variable && variable.name === name) {
            return variable;
        }
    }
    return null;
}

/**
 * Create a color variable, replacing existing one if it exists
 */
async function createColorVariable(
    collection: VariableCollection,
    name: string,
    hexColor: string
): Promise<Variable> {
    const rgb = hexToRgb(hexColor);

    // Check if variable already exists and remove it
    const existingVariable = await findVariableByName(collection, name);
    if (existingVariable) {
        existingVariable.remove();
    }

    // Create new variable
    const variable = figma.variables.createVariable(name, collection, "COLOR");

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
        const collection = await createOrUpdateCollection(OUTPUT_NAME_PREFIX);

        // 2. Create primitive variables (using naming convention for organization)
        // Create scale start variable
        await createColorVariable(collection, `primitives/${data.scaleStart.name}`, data.scaleStart.color);
        variableCount++;

        // Create scale end variable
        await createColorVariable(collection, `primitives/${data.scaleEnd.name}`, data.scaleEnd.color);
        variableCount++;

        // Create primary color variables
        for (const primaryColor of data.primaryColors) {
            await createColorVariable(collection, `primitives/${primaryColor.name}`, primaryColor.color);
            variableCount++;
        }

        // 3. Create shade-tint ramp variables
        const separator = createSeparator(data.tokenSettings.separatorCharsCount, data.tokenSettings.separatorCharType);
        for (const swatch of data.neutralScaleSwatches) {
            const variableName = `mixed/${data.neutralScaleName}/${data.neutralScaleName}${separator}${formatStepNumber(swatch.step)}`;
            await createColorVariable(collection, variableName, swatch.color);
            variableCount++;
        }

        // 4. Create primary color ramp variables
        for (const primaryRamp of data.primarySwatches) {
            for (const swatch of primaryRamp.swatches) {
                const variableName = `mixed/${primaryRamp.name}/${primaryRamp.name}${separator}${formatStepNumber(swatch.step)}`;
                await createColorVariable(collection, variableName, swatch.color);
                variableCount++;
            }
        }

        return {
            success: true,
            message: `Created ${variableCount} variables in '${OUTPUT_NAME_PREFIX}' collection`,
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