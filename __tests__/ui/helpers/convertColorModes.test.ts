import {hexToRgb, rgbToHex} from "../../../ui/helpers/convertColorModes";
import {compareColorRGB} from "../../_testHelpers/compareHelpers";

describe("convertColorModes", () => {
    describe("hexToRgb", () => {
            test.each(
                [
                    ["000000", {r: 0, g: 0, b: 0}]
                ]
            )("hexToRgb returns valid color %i", (hex, expectedRGB) => {
                const obtainedRGB = hexToRgb(hex);
                compareColorRGB(obtainedRGB, expectedRGB);
            })

            test("hexToRgb returns valid color FFFFFF", () => {
                const hex = "FFFFFF";
                const obtainedRGB = hexToRgb(hex);
                const expectedRGB = {r: 255, g: 255, b: 255};
                compareColorRGB(obtainedRGB, expectedRGB);
            })

            test("hexToRgb returns valid color 808080", () => {
                const hex = "808080";
                const obtainedRGB = hexToRgb(hex);
                const expectedRGB = {r: 128, g: 128, b: 128};
                compareColorRGB(obtainedRGB, expectedRGB);
            })

            test("hexToRgb returns error when length is incorrect", () => {
                const hex = "80880";
                expect(() => {
                    hexToRgb(hex)
                }).toThrow();
            })

            test("hexToRgb returns error when character incorrect", () => {
                const hex = "80880-";
                expect(() => {
                    hexToRgb(hex)
                }).toThrow();
            })
        }
    )

    describe("rgbToHex", () => {
            test("rgbToHex returns valid color 0 0 0", () => {
                const rgb = {r: 0, g: 0, b: 0};
                const expectedHex = "000000";
                const obtainedHex = rgbToHex(rgb.r, rgb.g, rgb.b);
                expect(obtainedHex).toBe(expectedHex);
            })

            test("rgbToHex returns valid color 255 255 255", () => {
                const rgb = {r: 255, g: 255, b: 255};
                const expectedHex = "FFFFFF";
                const obtainedHex = rgbToHex(rgb.r, rgb.g, rgb.b);
                expect(obtainedHex).toBe(expectedHex);
            })

            test("rgbToHex returns valid color 128 128 128", () => {
                const rgb = {r: 128, g: 128, b: 128};
                const expectedHex = "808080";
                const obtainedHex = rgbToHex(rgb.r, rgb.g, rgb.b);
                expect(obtainedHex).toBe(expectedHex);
            })

            test.each([
                {r: -1, g: 128, b: 128},
                {r: 128, g: -1, b: 128},
                {r: 128, g: 128, b: -1},
                {r: 256, g: 128, b: 128},
                {r: 128, g: 256, b: 128},
                {r: 128, g: 128, b: 256}
            ])("rgbToHex returns error with out of bound value", (input) => {
                expect(() => {
                    rgbToHex(input.r, input.g, input.b)
                }).toThrow();
            })
        }
    )
})