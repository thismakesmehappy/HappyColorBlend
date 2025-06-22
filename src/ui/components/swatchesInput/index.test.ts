import * as SwatchesInput from './index';
import Swatch from './Swatch';
import Chip from './Chip';
import SwatchControls from './SwatchControls';
import SwatchLabels from './SwatchLabels';

describe('SwatchesInput index exports', () => {
  test('exports Swatch component', () => {
    expect(SwatchesInput.default).toBe(Swatch);
  });
});
