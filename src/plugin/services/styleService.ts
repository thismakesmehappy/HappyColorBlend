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
 * Archive existing styles by moving them to archived groups
 */
function archiveExistingStyles(): void {
  const existingStyles = figma.getLocalPaintStyles();
  const archiveDate = new Date().toISOString().split('T')[0];

  // Archive timestamped primitives and mixed styles
  existingStyles.forEach(style => {
    if (style.name.match(/^primitives \(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\)\//)) {
      const fullPath = style.name.replace(/^primitives \(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\)\//, '');
      const timestamp = style.name.match(/\((\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})\)/)[1];
      style.name = `archived/archived ${archiveDate}/primitives (${timestamp})/${fullPath}`;
    } else if (style.name.match(/^mixed \(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\)\//)) {
      const fullPath = style.name.replace(/^mixed \(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\)\//, '');
      const timestamp = style.name.match(/\((\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})\)/)[1];
      style.name = `archived/archived ${archiveDate}/mixed (${timestamp})/${fullPath}`;
    }
  });
}

/**
 * Create timestamped group names
 */
function createTimestampedGroups(): { primitives: string; mixed: string } {
  const now = new Date();
  const timestamp = now.getFullYear() + '-' +
    String(now.getMonth() + 1).padStart(2, '0') + '-' +
    String(now.getDate()).padStart(2, '0') + ' ' +
    String(now.getHours()).padStart(2, '0') + ':' +
    String(now.getMinutes()).padStart(2, '0') + ':' +
    String(now.getSeconds()).padStart(2, '0');

  return {
    primitives: `primitives (${timestamp})`,
    mixed: `mixed (${timestamp})`
  };
}

/**
 * Create a paint style, handling collision by renaming existing
 */
function createColorStyle(name: string, hexColor: string): PaintStyle {
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

    // Archive existing styles first
    archiveExistingStyles();

    // Create timestamped group names
    const groups = createTimestampedGroups();

    // Create primitive styles
    createColorStyle(`${groups.primitives}/${data.scaleStart.name}`, data.scaleStart.color);
    styleCount++;

    createColorStyle(`${groups.primitives}/${data.scaleEnd.name}`, data.scaleEnd.color);
    styleCount++;

    // Create primary color primitive styles
    data.primaryColors.forEach(color => {
      createColorStyle(`${groups.primitives}/${color.name}`, color.color);
      styleCount++;
    });

    // Create shade-tint mixed styles
    data.neutralScaleSwatches.forEach(swatch => {
      const stepString = formatStepNumber(swatch.step);
      const styleName = `${groups.mixed}/${data.neutralScaleName}/${data.neutralScaleName}${separator}${stepString}`;
      createColorStyle(styleName, swatch.color);
      styleCount++;
    });

    // Create primary color mixed styles
    data.primarySwatches.forEach(ramp => {
      ramp.swatches.forEach(swatch => {
        const stepString = formatStepNumber(swatch.step);
        const styleName = `${groups.mixed}/${ramp.name}/${ramp.name}${separator}${stepString}`;
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