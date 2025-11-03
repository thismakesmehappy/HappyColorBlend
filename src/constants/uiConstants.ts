export const WINDOW_WIDTH = 800;
export const WINDOW_HEIGHT = 700;
export const TOAST_DURATION = 3000
export const MINIMUM_STEPS = 3;
export const SWATCH_COLUMNS_PER_ROW = 5;
export const CHIPS_COLUMNS_PER_ROW = 4;

// Swatch display configuration
export const SWATCH_BOARD_GROUP_WIDTH = 1200;
export const SWATCH_BOARD_SWATCH_SIZE = 64;
export const SWATCH_BOARD_FONT_SIZE = 12;

// Toast messages
export const INVALID_HEX_COLOR_MESSAGE = "Input should be a six digits hex color without the #";
export const INVALID_CUSTOM_STEP_NON_NUMERIC = "Custom step must be a number";
export const INVALID_CUSTOM_STEP_OUT_OF_RANGE = "Custom step must be between 1 and 999";
export const INVALID_CUSTOM_STEP_RESERVED = "Values 0, 500, and 1000 are already included by default";
export const INVALID_CUSTOM_STEP_DUPLICATED = "Custom step already exists";

export const OUTPUT_NAME_PREFIX = "Color Scales";

export const SCSS_CONSTANTS = {
    WINDOW_WIDTH,
    WINDOW_HEIGHT,
    SWATCH_COLUMNS_PER_ROW,
    CHIPS_COLUMNS_PER_ROW,
} as const;

export const generateSCSSConstants = (): string => {
    return Object.entries(SCSS_CONSTANTS)
        .map(([key, value]) => `$${key.toLowerCase().replace(/_/g, '-')}: ${value};`)
        .join('\n');
}