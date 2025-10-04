import * as SwatchesInput from './index';
import Swatch from './Swatch';

describe('SwatchesInput index exports', () => {
    test('exports Swatch component', () => {
        expect(SwatchesInput.default).toBe(Swatch);
    });
});
