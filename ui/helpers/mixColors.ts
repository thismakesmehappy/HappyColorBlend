import ColorRGB from "../interfaces/ColorRGB";

export const interpolateColors = (start: ColorRGB, end: ColorRGB, percentOfStart:number) => {
    if (percentOfStart < 0 || percentOfStart > 100) {
        throw new Error("Percent must be between 0 and 100");
    }

    const blend = (startValue:number, endValue:number) => {
        const startPercent = percentOfStart/100;
        const endPercent = 1 - startPercent;
        return Math.floor(startValue * startPercent + endValue * endPercent)
    }

    return {
        r: blend(start.r, end.r),
        g: blend(start.g, end.g),
        b: blend(start.b, end.b)
    }
}