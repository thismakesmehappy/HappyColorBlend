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
 * Archive existing styles by moving them to archived groups with sequential numbering
 */
function archiveExistingStyles(): void {
  const existingStyles = figma.getLocalPaintStyles();
  const now = new Date();
  const archiveDate = now.getFullYear() + '-' +
    String(now.getMonth() + 1).padStart(2, '0') + '-' +
    String(now.getDate()).padStart(2, '0');

  // Find all existing archived folders for this date by looking at style paths
  const archivedFolders = new Set<string>();
  existingStyles.forEach(style => {
    // Look for archived folder patterns in style names
    const baseMatch = style.name.match(new RegExp(`Color Scales/archived/(?:primitives|mixed) \\(archived ${archiveDate.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\)/`));
    const numberedMatch = style.name.match(new RegExp(`Color Scales/archived/(?:primitives|mixed) \\(archived ${archiveDate.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')} (\\d+)\\)/`));
    
    if (baseMatch) {
      archivedFolders.add(`(archived ${archiveDate})`);
    }
    if (numberedMatch) {
      archivedFolders.add(`(archived ${archiveDate} ${numberedMatch[1]})`);
    }
  });

  let archiveSuffix;
  if (archivedFolders.size > 0) {
    // Find the highest existing number
    let maxNumber = 0;
    archivedFolders.forEach(folder => {
      const match = folder.match(new RegExp(`\\(archived ${archiveDate.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')} (\\d+)\\)`));
      if (match) {
        maxNumber = Math.max(maxNumber, parseInt(match[1]));
      }
    });
    const nextNumber = maxNumber + 1;
    archiveSuffix = `(archived ${archiveDate} ${nextNumber})`;
  } else {
    archiveSuffix = `(archived ${archiveDate} 1)`;
  }

  // Archive current Color Scales styles
  existingStyles.forEach(style => {
    if (style.name.startsWith('Color Scales/primitives/')) {
      const styleName = style.name.replace('Color Scales/primitives/', '');
      style.name = `Color Scales/archived/primitives ${archiveSuffix}/${styleName}`;
    } else if (style.name.startsWith('Color Scales/mixed/')) {
      const remainingPath = style.name.replace('Color Scales/mixed/', '');
      style.name = `Color Scales/archived/mixed ${archiveSuffix}/${remainingPath}`;
    }
    // Also handle old timestamped styles for backward compatibility
    else if (style.name.match(/^primitives \(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\)\//)) {
      const fullPath = style.name.replace(/^primitives \(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\)\//, '');
      style.name = `Color Scales/archived/primitives ${archiveSuffix}/${fullPath}`;
    } else if (style.name.match(/^mixed \(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\)\//)) {
      const fullPath = style.name.replace(/^mixed \(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\)\//, '');
      style.name = `Color Scales/archived/mixed ${archiveSuffix}/${fullPath}`;
    }
  });
}

/**
 * Create group names without timestamps
 */
function createGroups(): { primitives: string; mixed: string } {
  return {
    primitives: 'Color Scales/primitives',
    mixed: 'Color Scales/mixed'
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

    // Create group names
    const groups = createGroups();

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