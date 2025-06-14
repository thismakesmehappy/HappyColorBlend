import * as SwatchesOutput from './index';
import SwatchGroupSwatches from './SwatchGroupSwatches';
import SwatchColorChip from './SwatchColorChip';
import ChipOutput from './ChipOutput';

describe('SwatchesOutput index exports', () => {
  test('exports SwatchGroupSwatches component', () => {
    expect(SwatchesOutput.SwatchGroupSwatches).toBe(SwatchGroupSwatches);
  });

  test('exports SwatchColorChip component', () => {
    expect(SwatchesOutput.SwatchColorChip).toBe(SwatchColorChip);
  });

  test('exports ChipOutput component', () => {
    expect(SwatchesOutput.ChipOutput).toBe(ChipOutput);
  });
});
