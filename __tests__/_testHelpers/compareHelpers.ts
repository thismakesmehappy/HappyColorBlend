import ColorRGB from "../../ui/interfaces/ColorRGB";

export const compareColorRGB = (obtained: ColorRGB, expected: ColorRGB) => {
    expect(obtained.r).toBe(expected.r);
    expect(obtained.g).toBe(expected.g);
    expect(obtained.b).toBe(expected.b);
}