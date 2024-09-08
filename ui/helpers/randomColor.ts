import {rgbToHex} from "./convertColorModes.ts";

export const randomColor = () => {
    const r = randomChannel();
    const g = randomChannel();
    const b = randomChannel();

    return rgbToHex(r, g, b);
}

const randomChannel = () => {
    return Math.floor(Math.random() * 256);
}
