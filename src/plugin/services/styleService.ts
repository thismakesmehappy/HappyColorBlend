/**
 * Service for creating and managing Figma paint styles from color swatches
 */

import { SwatchStyleData, StyleCreationResult } from "@common/networkSides";

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
 * Create a solid paint object from hex color
 */
function createSolidPaint(hexColor: string): SolidPaint {
  const rgb = hexToRgb(hexColor);
  return {
    type: "SOLID",
    color: rgb
  };
}

/**
 * Check if a paint style with the given name exists
 */
function findStyleByName(name: string): PaintStyle | null {
  const existingStyles = figma.getLocalPaintStyles();
  return existingStyles.find(style => style.name === name) || null;
}

/**
 * Handle style collision by renaming existing style
 */
function handleStyleCollision(name: string): void {
  const existingStyle = findStyleByName(name);
  if (existingStyle) {
    // Rename existing style with timestamp (default collision handling)
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    existingStyle.name = `${name} (${timestamp})`;
  }
}

/**
 * Create a paint style, handling collision by renaming existing
 */
function createColorStyle(name: string, hexColor: string): PaintStyle {
  // Handle collision by renaming existing style
  handleStyleCollision(name);
  
  // Create new style
  const style = figma.createPaintStyle();
  style.name = name;
  style.paints = [createSolidPaint(hexColor)];
  
  return style;
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
 * Main function to create all swatch styles
 */
export async function createAllSwatchStyles(data: SwatchStyleData): Promise<StyleCreationResult> {
  try {
    let styleCount = 0;
    const separator = createSeparator(data.tokenSettings.separatorCharsCount, data.tokenSettings.separatorCharType);

    // Create primitive styles
    createColorStyle(`primitives/${data.scaleStart.name}`, data.scaleStart.color);
    styleCount++;

    createColorStyle(`primitives/${data.scaleEnd.name}`, data.scaleEnd.color);
    styleCount++;

    // Create primary color primitive styles
    data.primaryColors.forEach(color => {
      createColorStyle(`primitives/${color.name}`, color.color);
      styleCount++;
    });

    // Create shade-tint mixed styles
    data.neutralScaleSwatches.forEach(swatch => {
      const stepString = formatStepNumber(swatch.step);
      const styleName = `mixed/${data.neutralScaleName}/${data.neutralScaleName}${separator}${stepString}`;
      createColorStyle(styleName, swatch.color);
      styleCount++;
    });

    // Create primary color mixed styles
    data.primarySwatches.forEach(ramp => {
      ramp.swatches.forEach(swatch => {
        const stepString = formatStepNumber(swatch.step);
        const styleName = `mixed/${ramp.name}/${ramp.name}${separator}${stepString}`;
        createColorStyle(styleName, swatch.color);
        styleCount++;
      });
    });

    return {
      success: true,
      message: `Created ${styleCount} paint styles`,
      count: styleCount
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to create paint styles",
      error: error instanceof Error ? error.message : String(error)
    };
  }
}