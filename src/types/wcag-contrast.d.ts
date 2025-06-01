declare module 'wcag-contrast' {
    /**
     * Calculates the contrast ratio between two colors according to WCAG 2.0
     * @param color1 - RGB color array [r, g, b] where r, g, b are in range 0-255
     * @param color2 - RGB color array [r, g, b] where r, g, b are in range 0-255
     * @returns The contrast ratio between the two colors (1-21)
     */
    export function rgb(color1: [number, number, number], color2: [number, number, number]): number;

    /**
     * Calculates the contrast ratio between two hex colors according to WCAG 2.0
     * @param color1 - Hex color string (e.g., "#FFFFFF")
     * @param color2 - Hex color string (e.g., "#000000")
     * @returns The contrast ratio between the two colors (1-21)
     */
    export function hex(color1: string, color2: string): number;

    /**
     * Calculates the relative luminance of an RGB color
     * @param color - RGB color array [r, g, b] where r, g, b are in range 0-255
     * @returns The relative luminance value (0-1)
     */
    export function luminance(color: [number, number, number]): number;
}