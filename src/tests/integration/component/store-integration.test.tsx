/**
 * Component Integration Tests
 * Tests how SwatchStore + TokenNameStore work together
 */

import { renderHook, act, render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import useSwatchStore from '../../../ui/store/useSwatchStore';
import useTokenNameStore from '../../../ui/store/useTokenNameStore';
import { prepareSwatchVariableData } from '../../../ui/helpers/variableDataPrep';
import EqualSteps from '../../../ui/components/Steps/EqualSteps';
import CustomStepBadges from '../../../ui/components/Steps/CustomStepBadges';

describe('Store Integration', () => {
  beforeEach(() => {
    // Reset stores to clean initial state
    useSwatchStore.setState({
      ...useSwatchStore.getState(),
      primaryColors: [],
      scaleStart: { color: '000000', name: 'Black', id: 'scaleStart' },
      scaleEnd: { color: 'FFFFFF', name: 'White', id: 'scaleEnd' },
      numberOfSteps: 9,
      customSteps: new Set<number>(),
      combinedSteps: new Set<number>(),
      swatches: [],
      colorScale: []
    });
    // Reinitialize steps array
    useSwatchStore.getState().createSteps();

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

  describe('Step Synchronization Between Neutral Scale and Primary Swatches', () => {
    beforeEach(() => {
      // Add a primary color for testing
      act(() => {
        useSwatchStore.getState().addPrimaryColor({
          color: 'FF0000',
          name: 'Red',
          id: '1'
        });
        useSwatchStore.getState().buildSwatches();
        useSwatchStore.getState().buildColorScale();
      });
    });

    it('should keep neutral scale and primary swatches in sync when increasing steps via UI', () => {
      // Get initial step counts
      const initialNumberOfSteps = useSwatchStore.getState().numberOfSteps;
      const initialNeutralSteps = useSwatchStore.getState().colorScale.length;
      const initialPrimarySteps = useSwatchStore.getState().swatches[0].swatches.length;

      expect(initialNeutralSteps).toBe(initialPrimarySteps);

      // Render the EqualSteps component and click increase
      const { getByTestId } = render(<EqualSteps />);

      act(() => {
        const increaseButton = getByTestId('increase-steps-button');
        fireEvent.click(increaseButton);
      });

      // Verify both scales updated together
      const afterNumberOfSteps = useSwatchStore.getState().numberOfSteps;
      const newNeutralSteps = useSwatchStore.getState().colorScale.length;
      const newPrimarySteps = useSwatchStore.getState().swatches[0].swatches.length;

      expect(afterNumberOfSteps).toBe(initialNumberOfSteps + 2);
      expect(newNeutralSteps).toBe(newPrimarySteps);
    });

    it('should keep neutral scale and primary swatches in sync when decreasing steps via UI', () => {
      // Get initial step counts
      const initialNeutralSteps = useSwatchStore.getState().colorScale.length;
      const initialPrimarySteps = useSwatchStore.getState().swatches[0].swatches.length;

      // Render the EqualSteps component and click decrease
      const { getByTestId } = render(<EqualSteps />);

      act(() => {
        const decreaseButton = getByTestId('decrease-steps-button');
        fireEvent.click(decreaseButton);
      });

      // Check that both scales updated with same number of steps
      const newNeutralSteps = useSwatchStore.getState().colorScale.length;
      const newPrimarySteps = useSwatchStore.getState().swatches[0].swatches.length;

      expect(newNeutralSteps).toBe(initialNeutralSteps - 2);
      expect(newPrimarySteps).toBe(initialPrimarySteps - 2);
      expect(newNeutralSteps).toBe(newPrimarySteps);
    });

    it('should keep neutral scale and primary swatches in sync when adding custom steps via UI', () => {
      // Get initial step counts
      const initialNeutralSteps = useSwatchStore.getState().colorScale.length;
      const initialPrimarySteps = useSwatchStore.getState().swatches[0].swatches.length;

      // Simulate adding a custom step (333) through the UI component behavior
      act(() => {
        useSwatchStore.getState().addCustomStep(333);
        useSwatchStore.getState().buildSwatches();
        useSwatchStore.getState().buildColorScale();
      });

      // Check that both scales updated with same number of steps
      const newNeutralSteps = useSwatchStore.getState().colorScale.length;
      const newPrimarySteps = useSwatchStore.getState().swatches[0].swatches.length;

      expect(newNeutralSteps).toBe(initialNeutralSteps + 1);
      expect(newPrimarySteps).toBe(initialPrimarySteps + 1);
      expect(newNeutralSteps).toBe(newPrimarySteps);

      // Verify both contain the custom step
      const neutralHas333 = useSwatchStore.getState().colorScale.some(s => s.step === 333);
      const primaryHas333 = useSwatchStore.getState().swatches[0].swatches.some(s => s.step === 333);
      expect(neutralHas333).toBe(true);
      expect(primaryHas333).toBe(true);
    });

    it('should keep neutral scale and primary swatches in sync when removing custom steps', () => {
      // First add a custom step
      act(() => {
        useSwatchStore.getState().addCustomStep(333);
        useSwatchStore.getState().buildSwatches();
        useSwatchStore.getState().buildColorScale();
      });

      const initialNeutralSteps = useSwatchStore.getState().colorScale.length;
      const initialPrimarySteps = useSwatchStore.getState().swatches[0].swatches.length;

      // Remove the custom step
      act(() => {
        useSwatchStore.getState().removeCustomStep(333);
        useSwatchStore.getState().buildSwatches();
        useSwatchStore.getState().buildColorScale();
      });

      // Check that both scales updated with same number of steps
      const newNeutralSteps = useSwatchStore.getState().colorScale.length;
      const newPrimarySteps = useSwatchStore.getState().swatches[0].swatches.length;

      expect(newNeutralSteps).toBe(initialNeutralSteps - 1);
      expect(newPrimarySteps).toBe(initialPrimarySteps - 1);
      expect(newNeutralSteps).toBe(newPrimarySteps);

      // Verify neither contains the removed step
      const neutralHas333 = useSwatchStore.getState().colorScale.some(s => s.step === 333);
      const primaryHas333 = useSwatchStore.getState().swatches[0].swatches.some(s => s.step === 333);
      expect(neutralHas333).toBe(false);
      expect(primaryHas333).toBe(false);
    });
  });
});
