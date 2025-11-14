/**
 * Service Integration Tests
 * Tests data preparation → service layer integration
 */

import { prepareSwatchVariableData } from '../../../ui/helpers/variableDataPrep';
import { generateCSSVariables, generateSCSSVariables } from '../../../ui/helpers/variableExport';
import useSwatchStore from '../../../ui/store/useSwatchStore';
import useTokenNameStore from '../../../ui/store/useTokenNameStore';

jest.mock('../../../ui/store/useSwatchStore');
jest.mock('../../../ui/store/useTokenNameStore');

describe('Data to Service Integration', () => {
  const mockSwatchStore = {
    scaleStart: { color: '000000', name: 'Black', id: 'start' },
    scaleEnd: { color: 'FFFFFF', name: 'White', id: 'end' },
    neutralScaleName: 'Neutral',
    primaryColors: [{ color: 'FF0000', name: 'Red Alert', id: '1' }],
    colorScale: [{ color: '666666', step: 500 }],
    swatches: [{
      base: { color: 'FF0000', name: 'Red Alert', id: '1' },
      swatches: [{ color: 'FF0000', step: 500 }]
    }],
    getCombinedSteps: () => new Set([500]),
    buildColorScale: jest.fn().mockReturnValue([{ color: '666666', step: 500 }])
  };

  const mockTokenStore = {
    caseTreatment: 'lower' as const,
    spaceTreatment: 'dash' as const,
    leadingCharsCount: 2,
    leadingCharType: 'dash' as const,
    keepCSSClean: true
  };

  beforeEach(() => {
    (useSwatchStore as any).getState = jest.fn().mockReturnValue(mockSwatchStore);
    (useTokenNameStore as any).getState = jest.fn().mockReturnValue(mockTokenStore);
  });

  it('should maintain consistent naming across all output formats', () => {
    const variableData = prepareSwatchVariableData(mockSwatchStore as any, mockTokenStore as any);
    const css = generateCSSVariables();
    const scss = generateSCSSVariables();

    expect(variableData.scaleStart.name).toBe('--black');
    expect(css).toContain('--black: #000000;');
    expect(scss).toContain('$black: #000000;');
  });

  it('should handle token setting changes consistently', () => {
    const upperCaseTokenStore = {
      ...mockTokenStore,
      caseTreatment: 'upper' as const,
      spaceTreatment: 'underscore' as const,
      separatorCharsCount: 0,
      separatorCharType: 'dash' as const,
      appendSeparatorToPrimitive: false
    };

    (useTokenNameStore as any).getState = jest.fn().mockReturnValue(upperCaseTokenStore);

    const variableData = prepareSwatchVariableData(mockSwatchStore as any, upperCaseTokenStore as any);
    const css = generateCSSVariables();

    expect(variableData.scaleStart.name).toBe('--BLACK');
    expect(variableData.primaryColors[0].name).toBe('--RED_ALERT');
    expect(css).toContain('--black: #000000;'); // CSS uses original mock store
  });
});
