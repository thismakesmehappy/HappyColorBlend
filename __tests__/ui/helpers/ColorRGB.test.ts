import ColorRGB from "../../../ui/interfaces/ColorRGB";

describe('ColorRGB', () => {
   test('Should create a new ColorRGB', () => {
        const r:number = 100;
        const g:number = 100;
        const b:number = 100;

        const color: ColorRGB = {r, g, b};

        expect(color.r).toBe(r);
        expect(color.g).toBe(g);
        expect(color.b).toBe(b);
    })
})