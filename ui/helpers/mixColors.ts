import ColorRGB from "../interfaces/ColorRGB";
import {STEPS_BASE_VALUE, STEPS_MAX_VALUE, STEPS_MIN_VALUE} from "../../consts/valueConsts.ts";
import {hexToRgb, rgbToHex} from "./convertColorModes.ts";

export const interpolateColors = (start: ColorRGB, end: ColorRGB, percent:number) => {
    if (percent < 0 || percent > 100) {
        throw new Error("Percent must be between 0 and 100");
    }

    const blend = (startValue:number, endValue:number) => {
        const startPercent = 1 - percent/100;
        const endPercent = percent/100;
        return Math.floor(startValue * startPercent + endValue * endPercent)
    }

    return {
        r: blend(start.r, end.r),
        g: blend(start.g, end.g),
        b: blend(start.b, end.b)
    }
}

export const mixColors = (lightColor: string, baseColor: string, darkColor: string, step:number) => {
    if (step < STEPS_MIN_VALUE || step > STEPS_MAX_VALUE) {
        throw new Error(`Step must be between ${STEPS_MIN_VALUE} and ${STEPS_MAX_VALUE}`);
    }

    let startColor, endColor, percent;
    if (step <= STEPS_BASE_VALUE) {
        startColor = hexToRgb(lightColor);
        endColor = hexToRgb(baseColor);
        percent = Math.floor(step / 10 * 2);
    } else {
        startColor = hexToRgb(baseColor);
        endColor = hexToRgb(darkColor);
        percent = Math.floor((step - STEPS_BASE_VALUE) / 10 * 2);
    }

    const rgbColor = interpolateColors(startColor, endColor, percent)


    return rgbToHex(rgbColor.r, rgbColor.g, rgbColor.b);
}