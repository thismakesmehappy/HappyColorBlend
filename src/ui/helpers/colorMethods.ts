// Validate if a string is a valid 6-digit hex color
export const isValidHexColor = (color: string): boolean => {
    return /^[0-9A-Fa-f]{6}$/.test(color);
};

/**
 * Converts a hex color string to RGB values
 * @param hex - Hex color string without the # (e.g., "FF0000")
 * @returns An object with r, g, b values
 */
const hexToRgb = (hex: string): { r: number, g: number, b: number } => {
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return {r, g, b};
};

/**
 * Converts RGB values to a hex color string
 * @param r - Red value (0-255)
 * @param g - Green value (0-255)
 * @param b - Blue value (0-255)
 * @returns Hex color string without the # (e.g., "FF0000")
 */
const rgbToHex = (r: number, g: number, b: number): string => {
    return [r, g, b]
        .map(x => {
            const hex = Math.round(x).toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        })
        .join('').toUpperCase();
};

/**
 * Interpolates between two colors based on a factor
 * @param color1 - First color in RGB format
 * @param color2 - Second color in RGB format
 * @param factor - Interpolation factor (0-1)
 * @returns Interpolated color in RGB format
 */
const interpolateColors = (
    color1: { r: number, g: number, b: number },
    color2: { r: number, g: number, b: number },
    factor: number
): { r: number, g: number, b: number } => {
    return {
        r: color1.r + factor * (color2.r - color1.r),
        g: color1.g + factor * (color2.g - color1.g),
        b: color1.b + factor * (color2.b - color1.b)
    };
};

/**
 * Blends colors based on a step value
 * @param shade - Shade hex color without the # (e.g., "000000")
 * @param tint - Tint hex color without the # (e.g., "FFFFFF")
 * @param base - Base hex color without the # (e.g., "808080")
 * @param step - Step value between 0 and 1000
 * @returns Blended hex color without the #
 */
export const blendColor = (shade: string, tint: string, base: string, step: number): string => {
    // Ensure step is within bounds
    step = Math.max(0, Math.min(1000, step));

    // Convert hex colors to RGB
    const shadeRgb = hexToRgb(shade);
    const tintRgb = hexToRgb(tint);
    const baseRgb = hexToRgb(base);

    let resultRgb;

    if (step < 500) {
        // Interpolate between shade and base
        const factor = step / 500; // 0 = 100% shade, 1 = 100% base
        resultRgb = interpolateColors(shadeRgb, baseRgb, factor);
    } else {
        // Interpolate between base and tint
        const factor = (step - 500) / 500; // 0 = 100% base, 1 = 100% tint
        resultRgb = interpolateColors(baseRgb, tintRgb, factor);
    }

    // Convert back to hex
    return rgbToHex(resultRgb.r, resultRgb.g, resultRgb.b);
};
