/**
 * Component Integration Tests
 * Tests how SwatchStore + TokenNameStore work together
 */

import { renderHook, act } from '@testing-library/react';
import useSwatchStore from '../../../ui/store/useSwatchStore';
import useTokenNameStore from '../../../ui/store/useTokenNameStore';
import { prepareSwatchVariableData } from '../../../ui/helpers/variableDataPrep';

describe('Store Integration', () => {
  beforeEach(() => {
    // Reset stores to clean initial state
    useSwatchStore.setState({
      ...useSwatchStore.getState(),
      primaryColors: [],
      scaleStart: { color: '000000', name: 'Black', id: 'scaleStart' },
      scaleEnd: { color: 'FFFFFF', name: 'White', id: 'scaleEnd' }
    });
    useTokenNameStore.setState({
      ...useTokenNameStore.getState(),
      caseTreatment: 'lower',
      spaceTreatment: 'dash',
      leadingCharsCount: 0,
      separatorCharsCount: 0
    });
  });

  describe('Token Settings Affect Swatch Naming', () => {
    it('should apply token case changes to all swatch names', () => {
      const swatchStore = useSwatchStore;
      const tokenStore = useTokenNameStore;

      // Add swatch data
      act(() => {
        swatchStore.getState().addPrimaryColor({
          color: 'FF0000',
          name: 'Forest Green',
          id: '1'
        });
        swatchStore.getState().setScaleStart('000000', 'deep black');
      });

      // Change token settings
      act(() => {
        tokenStore.getState().setCaseTreatment('upper');
        tokenStore.getState().setSpaceTreatment('underscore');
        tokenStore.getState().setLeadingCharsCount(2); // Add leading chars
        tokenStore.getState().setLeadingCharType('dash');
      });

      // Test integration through data prep
      const result = prepareSwatchVariableData(
        swatchStore.getState(),
        tokenStore.getState()
      );

      expect(result.scaleStart.name).toBe('--DEEP_BLACK');
      expect(result.primaryColors[0].name).toBe('--FOREST_GREEN');
    });

    it('should apply leading characters to all names', () => {
      const swatchStore = useSwatchStore;
      const tokenStore = useTokenNameStore;

      act(() => {
        swatchStore.getState().addPrimaryColor({
          color: 'FF0000',
          name: 'Red',
          id: '1'
        });
        swatchStore.getState().setScaleStart('000000', 'Black');
        
        // Reset to lowercase first, then set leading chars
        tokenStore.getState().setCaseTreatment('lower');
        tokenStore.getState().setLeadingCharsCount(2);
        tokenStore.getState().setLeadingCharType('dash');
      });

      const result = prepareSwatchVariableData(
        swatchStore.getState(),
        tokenStore.getState()
      );

      expect(result.scaleStart.name).toBe('--black');
      expect(result.primaryColors[0].name).toBe('--red');
    });
  });

  describe('Color Changes Trigger System Updates', () => {
    it('should rebuild color scale when scale colors change', () => {
      const swatchStore = useSwatchStore;

      // Add primary color and build initial color scale
      act(() => {
        swatchStore.getState().addPrimaryColor({
          color: 'FF0000',
          name: 'Red',
          id: '1'
        });
        swatchStore.getState().setCombinedSteps();
        swatchStore.getState().buildColorScale();
      });

      const initialColorScale = swatchStore.getState().colorScale;
      expect(initialColorScale.length).toBeGreaterThan(0);

      // Change scale colors and rebuild
      act(() => {
        swatchStore.getState().setScaleStart('333333', 'Gray');
        swatchStore.getState().buildColorScale();
      });

      const updatedColorScale = swatchStore.getState().colorScale;
      expect(updatedColorScale[0].color).not.toBe(initialColorScale[0].color);
    });

    it('should combine regular and custom steps correctly', () => {
      const swatchStore = useSwatchStore;

      act(() => {
        swatchStore.getState().addCustomStep(150);
        swatchStore.getState().addCustomStep(750);
        swatchStore.getState().setCombinedSteps();
      });

      const combinedSteps = Array.from(swatchStore.getState().getCombinedSteps()).sort((a, b) => a - b);
      
      expect(combinedSteps).toContain(150);
      expect(combinedSteps).toContain(750);
      expect(combinedSteps.length).toBeGreaterThan(2);
    });
  });
});
