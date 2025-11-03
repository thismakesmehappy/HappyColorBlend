/**
 * Service for creating visual color swatches on the Figma pasteboard
 */

import { SwatchCreationData, SwatchCreationResult } from "@common/networkSides";
import { 
  SWATCH_BOARD_GROUP_WIDTH, 
  SWATCH_BOARD_SWATCH_SIZE, 
  SWATCH_BOARD_FONT_SIZE,
  SWATCH_BOARD_COLUMN_GAP,
  SWATCH_BOARD_ROW_GAP,
  SWATCH_BOARD_GROUP_GAP
} from "../../constants/uiConstants";

// (removed - now using constants from uiConstants)

/**
 * Convert hex color to RGB object with values 0-1 for Figma API
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
  const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
  const b = parseInt(cleanHex.substring(4, 6), 16) / 255;
  return { r, g, b };
}

/**
 * Calculate text color (black or white) for optimal contrast on given background
 */
function getContrastColor(hexColor: string): RGB {
  const rgb = hexToRgb(hexColor);
  // Calculate relative luminance using WCAG formula
  const luminance = 0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b;
  // Use white text on dark backgrounds, black text on light backgrounds
  return luminance > 0.5 ? { r: 0, g: 0, b: 0 } : { r: 1, g: 1, b: 1 };
}

/**
 * Create a solid fill from hex color
 */
function createSolidFill(hexColor: string): SolidPaint {
  const rgb = hexToRgb(hexColor);
  return {
    type: "SOLID",
    color: rgb
  };
}

/**
 * Create a text node with given content and styling
 */
function createTextNode(
  content: string, 
  fontSize: number, 
  color: RGB = { r: 0, g: 0, b: 0 }
): TextNode {
  const textNode = figma.createText();
  textNode.characters = content;
  textNode.fontSize = fontSize;
  textNode.fills = [{ type: "SOLID", color }];
  textNode.fontName = { family: "Inter", style: "Regular" };
  return textNode;
}

/**
 * Create a circular swatch for primitives
 */
function createCircularSwatch(
  color: string, 
  name: string, 
  size: number, 
  fontSize: number
): GroupNode {
  // Create circular color swatch
  const circle = figma.createEllipse();
  circle.name = "Color";
  circle.resize(size, size);
  circle.fills = [createSolidFill(color)];

  // Create name label - handle wrapping for long names
  const nameText = createTextNode(name, fontSize);
  nameText.name = "Name";
  nameText.textAutoResize = "WIDTH_AND_HEIGHT";
  nameText.resize(size + 20, nameText.height); // Allow some extra width
  nameText.textAlignHorizontal = "CENTER";

  // Create color value label
  const colorText = createTextNode(`#${color.toUpperCase()}`, fontSize * 0.8, { r: 0.6, g: 0.6, b: 0.6 });
  colorText.name = "Color Value";
  colorText.textAutoResize = "WIDTH_AND_HEIGHT";
  colorText.textAlignHorizontal = "CENTER";

  // Position elements manually for better control
  circle.x = 0;
  circle.y = 0;
  
  nameText.x = circle.x + (size - nameText.width) / 2;
  nameText.y = circle.y + size + SWATCH_BOARD_ROW_GAP / 2;
  
  colorText.x = circle.x + (size - colorText.width) / 2;
  colorText.y = nameText.y + nameText.height + SWATCH_BOARD_ROW_GAP / 4;

  // Create group
  const group = figma.group([circle, nameText, colorText], figma.currentPage);
  group.name = `Primitive: ${name}`;

  return group;
}

/**
 * Create a rectangular swatch for mixed colors
 */
function createRectangularSwatch(
  color: string, 
  step: number, 
  size: number, 
  fontSize: number
): GroupNode {
  const swatchWidth = size * 1.2;
  const swatchHeight = size * 0.8;
  const contrastColor = getContrastColor(color);

  // Create background rectangle with padding
  const rect = figma.createRectangle();
  rect.name = "Background";
  rect.resize(swatchWidth, swatchHeight);
  rect.fills = [createSolidFill(color)];
  rect.cornerRadius = 4; // Small corner radius for better appearance

  // Create step label
  const stepText = createTextNode(step.toString().padStart(3, '0'), fontSize, contrastColor);
  stepText.name = "Step";
  stepText.textAutoResize = "WIDTH_AND_HEIGHT";
  stepText.textAlignHorizontal = "CENTER";

  // Create color value label
  const colorText = createTextNode(`#${color.toUpperCase()}`, fontSize * 0.7, contrastColor);
  colorText.name = "Color Value";
  colorText.textAutoResize = "WIDTH_AND_HEIGHT";
  colorText.textAlignHorizontal = "CENTER";

  // Position elements manually with proper padding
  rect.x = 0;
  rect.y = 0;
  
  stepText.x = rect.x + (swatchWidth - stepText.width) / 2;
  stepText.y = rect.y + (swatchHeight - stepText.height - colorText.height - 4) / 2; // Center both texts
  
  colorText.x = rect.x + (swatchWidth - colorText.width) / 2;
  colorText.y = stepText.y + stepText.height + 4;

  // Create group
  const group = figma.group([rect, stepText, colorText], figma.currentPage);
  group.name = `Step ${step}`;

  return group;
}

/**
 * Create separator characters based on token settings
 */
function createSeparator(count: number, charType: 'dash' | 'underscore'): string {
  const char = charType === 'dash' ? '-' : '_';
  return char.repeat(count);
}

/**
 * Format step number with padding
 */
function formatStepNumber(step: number): string {
  return step.toString().padStart(3, '0');
}

/**
 * Create a group of swatches for a primitive color
 */
function createPrimarySwatchGroup(
  data: {
    name: string;
    swatches: Array<{ color: string; step: number }>;
  },
  separator: string,
  swatchSize: number,
  fontSize: number,
  maxWidth: number
): GroupNode {
  const elements: SceneNode[] = [];
  const swatchWidth = swatchSize * 1.2;
  let currentX = 0;
  let currentY = 0;

  // Create title
  const titleText = createTextNode(data.name, fontSize * 1.2);
  titleText.name = "Title";
  titleText.x = currentX;
  titleText.y = currentY;
  elements.push(titleText);

  // Position swatches below title with padding
  currentY = titleText.y + titleText.height + SWATCH_BOARD_ROW_GAP;
  currentX = 0;

  // Calculate how many swatches fit per row
  const swatchesPerRow = Math.floor(maxWidth / (swatchWidth + SWATCH_BOARD_COLUMN_GAP));
  let swatchCount = 0;

  // Create individual swatches with wrapping
  data.swatches.forEach((swatch, index) => {
    if (swatchCount >= swatchesPerRow) {
      currentY += (swatchSize * 0.8) + (fontSize * 1.7) + SWATCH_BOARD_ROW_GAP;
      currentX = 0;
      swatchCount = 0;
    }

    const swatchNode = createRectangularSwatch(
      swatch.color,
      swatch.step,
      swatchSize,
      fontSize
    );
    
    swatchNode.x = currentX;
    swatchNode.y = currentY;
    elements.push(swatchNode);
    
    currentX += swatchWidth + SWATCH_BOARD_COLUMN_GAP;
    swatchCount++;
  });

  // Create group with all elements
  const group = figma.group(elements, figma.currentPage);
  group.name = `Primary Group: ${data.name}`;
  return group;
}

/**
 * Create the main swatch display
 */
function createSwatchDisplay(data: SwatchCreationData): GroupNode {
  const displayWidth = data.displayWidth || SWATCH_BOARD_GROUP_WIDTH;
  const swatchSize = data.swatchSize || SWATCH_BOARD_SWATCH_SIZE;
  const fontSize = data.fontSize || SWATCH_BOARD_FONT_SIZE;
  const separator = createSeparator(data.tokenSettings.separatorCharsCount, data.tokenSettings.separatorCharType);

  const allElements: SceneNode[] = [];
  let currentY = 0;

  // 1. Create main title with timestamp
  const now = new Date();
  const timestamp = now.getFullYear() + '-' +
    String(now.getMonth() + 1).padStart(2, '0') + '-' +
    String(now.getDate()).padStart(2, '0') + ' ' +
    String(now.getHours()).padStart(2, '0') + ':' +
    String(now.getMinutes()).padStart(2, '0') + ':' +
    String(now.getSeconds()).padStart(2, '0');

  const mainTitle = createTextNode(`Color Swatches (${timestamp})`, fontSize * 1.8);
  mainTitle.name = "Main Title";
  mainTitle.x = 0;
  mainTitle.y = currentY;
  allElements.push(mainTitle);

  currentY = mainTitle.y + mainTitle.height + SWATCH_BOARD_GROUP_GAP;

  // 2. Create primitives section
  const primitivesTitle = createTextNode("Primitives", fontSize * 1.5);
  primitivesTitle.name = "Primitives Title";
  primitivesTitle.x = 0;
  primitivesTitle.y = currentY;
  allElements.push(primitivesTitle);

  // Position primitives below title
  currentY = primitivesTitle.y + primitivesTitle.height + SWATCH_BOARD_ROW_GAP;
  let currentX = 0;

  // Calculate how many swatches fit per row
  const swatchesPerRow = Math.floor(displayWidth / (swatchSize + SWATCH_BOARD_COLUMN_GAP));
  let swatchCount = 0;
  let maxRowHeight = 0;

  // Collect all primitive swatches
  const allPrimitives = [
    { color: data.scaleStart.color, name: data.scaleStart.name },
    { color: data.scaleEnd.color, name: data.scaleEnd.name },
    ...data.primaryColors
  ];

  // Place all primitive swatches with wrapping
  allPrimitives.forEach(primitive => {
    if (swatchCount >= swatchesPerRow) {
      currentY += maxRowHeight + SWATCH_BOARD_ROW_GAP;
      currentX = 0;
      swatchCount = 0;
      maxRowHeight = 0;
    }

    const swatch = createCircularSwatch(primitive.color, primitive.name, swatchSize, fontSize);
    swatch.x = currentX;
    swatch.y = currentY;
    allElements.push(swatch);
    
    // Account for circle + text height
    const totalSwatchHeight = swatchSize + (fontSize * 2) + SWATCH_BOARD_ROW_GAP;
    maxRowHeight = Math.max(maxRowHeight, totalSwatchHeight);
    currentX += swatchSize + SWATCH_BOARD_COLUMN_GAP;
    swatchCount++;
  });

  // Move to next section
  currentY += maxRowHeight + SWATCH_BOARD_ROW_GAP + SWATCH_BOARD_GROUP_GAP;

  // 3. Create mixed section title
  const mixedTitle = createTextNode("Mixed", fontSize * 1.5);
  mixedTitle.name = "Mixed Title";
  mixedTitle.x = 0;
  mixedTitle.y = currentY;
  allElements.push(mixedTitle);

  currentY += mixedTitle.height + SWATCH_BOARD_ROW_GAP;

  // 4. Create neutral scale ramp section
  if (data.neutralScaleSwatches.length > 0) {
    const rampGroup = createPrimarySwatchGroup(
      {
        name: data.neutralScaleName,
        swatches: data.neutralScaleSwatches
      },
      separator,
      swatchSize,
      fontSize,
      displayWidth
    );
    rampGroup.x = 0;
    rampGroup.y = currentY;
    allElements.push(rampGroup);
    
    // Use actual group height for next positioning
    currentY += rampGroup.height + SWATCH_BOARD_GROUP_GAP;
  }

  // 5. Create primary color groups
  data.primarySwatches.forEach(primarySwatch => {
    const swatchGroup = createPrimarySwatchGroup(
      primarySwatch,
      separator,
      swatchSize,
      fontSize,
      displayWidth
    );
    swatchGroup.x = 0;
    swatchGroup.y = currentY;
    allElements.push(swatchGroup);
    
    // Use actual group height for next positioning
    currentY += swatchGroup.height + SWATCH_BOARD_GROUP_GAP;
  });

  // Create main group
  const mainGroup = figma.group(allElements, figma.currentPage);
  mainGroup.name = "Color Swatches";
  return mainGroup;
}

/**
 * Main function to create all swatches on the pasteboard
 */
export async function createAllSwatches(data: SwatchCreationData): Promise<SwatchCreationResult> {
  try {
    // Load fonts before creating text
    await figma.loadFontAsync({ family: "Inter", style: "Regular" });

    // Create the swatch display
    const swatchDisplay = createSwatchDisplay(data);

    // Position the display in the center of the viewport
    const viewportCenter = figma.viewport.center;
    swatchDisplay.x = viewportCenter.x - (swatchDisplay.width / 2);
    swatchDisplay.y = viewportCenter.y - (swatchDisplay.height / 2);

    // Select the created swatches
    figma.currentPage.selection = [swatchDisplay];

    // Zoom to fit the swatches
    figma.viewport.scrollAndZoomIntoView([swatchDisplay]);

    // Count total swatches created
    const totalSwatches = 
      2 + // shade + tint
      data.primaryColors.length + // primary colors
      data.neutralScaleSwatches.length + // neutral scale swatches
      data.primarySwatches.reduce((sum, ramp) => sum + ramp.swatches.length, 0); // primary swatches

    return {
      success: true,
      message: `Created ${totalSwatches} swatches on the pasteboard`,
      count: totalSwatches
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to create swatches",
      error: error instanceof Error ? error.message : String(error)
    };
  }
}