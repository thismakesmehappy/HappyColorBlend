import ColorRGB from "../../../ui/interfaces/ColorRGB";
import {interpolateColors} from "../../../ui/helpers/mixColors";
import {compareColorRGB} from "../../_testHelpers/compareHelpers";

describe("mixColors", () => {
    describe("interpolateColors", () => {
        test.each(
            [
                // percentOfStart, expected
                [0, {r: 0, g: 0, b: 0}],
                [10, {r: 0, g: 0, b: 0}],
                [40, {r: 0, g: 0, b: 0}],
                [50, {r: 0, g: 0, b: 0}],
                [83, {r: 0, g: 0, b: 0}],
                [90, {r: 0, g: 0, b: 0}],
                [100, {r: 0, g: 0, b: 0}],
            ]
        )
        ("blend returns correct blend with start {0, 0, 0}, end {0, 0, 0}, and percent %i", (percent: number, expected: ColorRGB) => {
            const start: ColorRGB = {r: 0, g: 0, b: 0};
            const end: ColorRGB = {r: 0, g: 0, b: 0};
            const obtained = interpolateColors(start, end, percent);
            compareColorRGB(obtained, expected);
        })

        test.each(
            [
                // percentOfStart, expected
                [0, {r: 255, g: 255, b: 255}],
                [10, {r: 255, g: 255, b: 255}],
                [40, {r: 255, g: 255, b: 255}],
                [50, {r: 255, g: 255, b: 255}],
                [83, {r: 255, g: 255, b: 255}],
                [90, {r: 255, g: 255, b: 255}],
                [100, {r: 255, g: 255, b: 255}],
            ]
        )
        ("blend returns correct blend with start {255, 255, 255}, end {255, 255, 255}, and percent %i", (percent: number, expected: ColorRGB) => {
            const start: ColorRGB = {r: 255, g: 255, b: 255};
            const end: ColorRGB = {r: 255, g: 255, b: 255};
            const obtained = interpolateColors(start, end, percent);
            compareColorRGB(obtained, expected);
        })

        test.each(
            [
                // percentOfStart, expected
                [0, {r: 255, g: 255, b: 255}],
                [10, {r: 229, g: 229, b: 229}],
                [40, {r: 153, g: 153, b: 153}],
                [50, {r: 127, g: 127, b: 127}],
                [83, {r: 43, g: 43, b: 43}],
                [90, {r: 25, g: 25, b: 25}],
                [100, {r: 0, g: 0, b: 0}],
            ]
        )
        ("blend returns correct blend with start {0, 0, 0}, end {255, 255, 255}, and percent %i", (percent: number, expected: ColorRGB) => {
            const start: ColorRGB = {r: 0, g: 0, b: 0};
            const end: ColorRGB = {r: 255, g: 255, b: 255};
            const obtained = interpolateColors(start, end, percent);
            compareColorRGB(obtained, expected);
        })

        test.each(
            [
                // percentOfStart, expected
                [0, {r: 0, g: 0, b: 0}],
                [10, {r: 25, g: 25, b: 25}],
                [40, {r: 102, g: 102, b: 102}],
                [50, {r: 127, g: 127, b: 127}],
                [83, {r: 211, g: 211, b: 211}],
                [90, {r: 229, g: 229, b: 229}],
                [100, {r: 255, g: 255, b: 255}],
            ]
        )
        ("blend returns correct blend with start {255, 255, 255}, end {0, 0, 0}, and percent %i", (percent: number, expected: ColorRGB) => {
            const start: ColorRGB = {r: 255, g: 255, b: 255};
            const end: ColorRGB = {r: 0, g: 0, b: 0};
            const obtained = interpolateColors(start, end, percent);
            compareColorRGB(obtained, expected);
        })

        test("blend returns error when percentOfStart is negative", () => {
            const start: ColorRGB = {r: 0, g: 0, b: 0};
            const end: ColorRGB = {r: 0, g: 0, b: 0};
            const percentOfStart = -10;
            expect(() => {
                interpolateColors(start, end, percentOfStart)
            }).toThrow()
        })

        test("blend returns error when percentOfStart to big", () => {
            const start: ColorRGB = {r: 0, g: 0, b: 0};
            const end: ColorRGB = {r: 0, g: 0, b: 0};
            const percentOfStart = 101;
            expect(() => {
                interpolateColors(start, end, percentOfStart)
            }).toThrow()
        })
    })
})