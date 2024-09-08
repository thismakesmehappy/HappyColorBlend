import ColorRGB from "../interfaces/ColorRGB";

export const hexToRgb = (hex: string): ColorRGB => {
    const hexPrefix = "0x";

    if (!isValidHex(hex)) {
        throw new Error("Input must be a valid hex color; with six characters (omitting the #)");
    }

    const rX = hexPrefix + hex.substring(0, 2);
    const gX = hexPrefix + hex.substring(2, 4);
    const bX = hexPrefix + hex.substring(4);

    const r = parseInt(rX, 16);
    const g = parseInt(gX, 16);
    const b = parseInt(bX, 16);

    return {r: r, g: g, b: b}
}

export const rgbToHex = (r: number, g: number, b: number): string => {
    const isInvalidRgb: boolean = r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255;
    if (isInvalidRgb) {
        throw new Error("Input must be a valid RGB color; each channel must be a value between 0 and 255");
    }

    const rDec = r.toString(16).padStart(2, "0").toUpperCase();
    const gDec = g.toString(16).padStart(2, "0").toUpperCase();
    const bDec = b.toString(16).padStart(2, "0").toUpperCase();

    return rDec + gDec + bDec
}

export const isValidHex = (hex:string) => {
    return (hex.length === 6 && /^[0-9a-fA-F]+$/.test(hex));
    }