// Validate if a string is a valid 6-digit hex color
export const isValidHexColor = (color: string): boolean => {
    return /^[0-9A-Fa-f]{6}$/.test(color);
};