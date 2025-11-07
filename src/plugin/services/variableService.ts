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
function createOrUpdateCollection(name: string): VariableCollection {
    const existingCollections = figma.variables.getLocalVariableCollections();

    // Find existing collection with exact name or archived pattern
    const existingCollection = existingCollections.find(collection => {
        return collection.name === name ||
            collection.name.match(new RegExp(`^${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')} \\(archived \\d{4}-\\d{2}-\\d{2}( \\d+)?\\)$`)) ||
            collection.name.match(new RegExp(`^${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')} \\(\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}\\)$`));
    });

    if (existingCollection) {
        // Get current date for archiving
        const now = new Date();
        const archiveDate = now.getFullYear() + '-' +
            String(now.getMonth() + 1).padStart(2, '0') + '-' +
            String(now.getDate()).padStart(2, '0');

        // Check if there's already an archived collection for this date
        const baseArchiveName = `${name} (archived ${archiveDate})`;
        const hasCollision = existingCollections.some(collection => collection.name === baseArchiveName);

        if (hasCollision) {
            // Find next sequential number for this date
            const archivedCollections = existingCollections.filter(collection =>
                collection.name.match(new RegExp(`^${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')} \\(archived ${archiveDate.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')} \\d+\\)$`))
            );
            const nextNumber = archivedCollections.length + 2; // +2 because we start at 2 (1 is the base name without number)
            existingCollection.name = `${name} (archived ${archiveDate} ${nextNumber})`;
        } else {
            existingCollection.name = baseArchiveName;
        }
    }

    // Create new collection without timestamp
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
        const collection = createOrUpdateCollection(OUTPUT_NAME_PREFIX);

        // 2. Create primitive variables (using naming convention for organization)
        // Create scale start variable
        createColorVariable(collection, `primitives/${data.scaleStart.name}`, data.scaleStart.color);
        variableCount++;

        // Create scale end variable
        createColorVariable(collection, `primitives/${data.scaleEnd.name}`, data.scaleEnd.color);
        variableCount++;

        // Create primary color variables
        for (const primaryColor of data.primaryColors) {
            createColorVariable(collection, `primitives/${primaryColor.name}`, primaryColor.color);
            variableCount++;
        }

        // 3. Create shade-tint ramp variables
        const separator = createSeparator(data.tokenSettings.separatorCharsCount, data.tokenSettings.separatorCharType);
        for (const swatch of data.neutralScaleSwatches) {
            const variableName = `mixed/${data.neutralScaleName}/${data.neutralScaleName}${separator}${formatStepNumber(swatch.step)}`;
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