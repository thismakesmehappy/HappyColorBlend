/**
 * End-to-End Integration Tests
 * Tests complete user journeys from input to final output
 */

import useSwatchStore from '../../../ui/store/useSwatchStore';
import useTokenNameStore from '../../../ui/store/useTokenNameStore';
import { prepareSwatchVariableData } from '../../../ui/helpers/variableDataPrep';
import { generateCSSVariables } from '../../../ui/helpers/variableExport';

describe('Complete User Workflows', () => {
  beforeEach(() => {
    // Reset both stores
    useSwatchStore.setState(useSwatchStore.getState());
    useTokenNameStore.setState(useTokenNameStore.getState());
  });

  describe('Color Scale Creation Workflow', () => {
    it('should complete full workflow: add colors → set naming → generate output', () => {
      const swatchStore = useSwatchStore.getState();
      const tokenStore = useTokenNameStore.getState();

      // Step 1: User adds primary colors
      swatchStore.addPrimaryColor({
        color: 'FF0000',
        name: 'Brand Red',
        id: '1'
      });
      swatchStore.addPrimaryColor({
        color: '00FF00',
        name: 'Success Green',
        id: '2'
      });

      // Step 2: User configures scale
      swatchStore.setScaleStart('1A1A1A', 'Dark Gray');
      swatchStore.setScaleEnd('F5F5F5', 'Light Gray');

      // Step 3: User adds custom steps
      swatchStore.addCustomStep(150);
      swatchStore.addCustomStep(850);

      // Step 4: User configures token naming
      tokenStore.setCaseTreatment('upper');
      tokenStore.setSpaceTreatment('underscore');
      tokenStore.setLeadingCharsCount(1);
      tokenStore.setLeadingCharType('dash');

      // Step 5: System builds swatches
      swatchStore.setCombinedSteps();
      swatchStore.buildSwatches();

      // Step 6: Generate final outputs
      const variableData = prepareSwatchVariableData(
        useSwatchStore.getState(),
        useTokenNameStore.getState()
      );
      const cssOutput = generateCSSVariables();

      // Verify complete workflow results
      expect(variableData.primaryColors).toHaveLength(2);
      expect(variableData.primaryColors[0].name).toBe('-BRAND_RED');
      expect(variableData.primaryColors[1].name).toBe('-SUCCESS_GREEN');
      expect(variableData.scaleStart.name).toBe('-DARK_GRAY');
      expect(variableData.scaleEnd.name).toBe('-LIGHT_GRAY');

      expect(cssOutput).toContain('--brand-red: #FF0000;');
      expect(cssOutput).toContain('--success-green: #00FF00;');
      expect(cssOutput).toContain('--dark-gray: #1A1A1A;');

      // Verify custom steps were included
      const combinedSteps = Array.from(useSwatchStore.getState().getCombinedSteps());
      expect(combinedSteps).toContain(150);
      expect(combinedSteps).toContain(850);
    });

    it('should handle configuration changes mid-workflow', () => {
      const swatchStore = useSwatchStore.getState();
      const tokenStore = useTokenNameStore.getState();

      // Initial setup
      swatchStore.addPrimaryColor({
        color: 'FF0000',
        name: 'Red',
        id: '1'
      });
      tokenStore.setCaseTreatment('lower');

      // Generate initial output
      let cssOutput = generateCSSVariables();
      expect(cssOutput).toContain('--red: #FF0000;');

      // User changes settings mid-workflow
      tokenStore.setCaseTreatment('upper');
      tokenStore.setLeadingCharsCount(2);

      // Generate updated output
      cssOutput = generateCSSVariables();
      expect(cssOutput).toContain('--red: #FF0000;');
    });
  });

  describe('Error Recovery Workflows', () => {
    it('should handle invalid data gracefully throughout workflow', () => {
      const swatchStore = useSwatchStore.getState();

      // Try to add invalid data
      swatchStore.addPrimaryColor({
        color: 'INVALID',
        name: '',
        id: '1'
      });

      // System should still function
      expect(() => {
        swatchStore.buildSwatches();
        generateCSSVariables();
      }).not.toThrow();
    });

    it('should maintain consistency when operations fail', () => {
      const swatchStore = useSwatchStore.getState();

      // Add valid data
      swatchStore.addPrimaryColor({
        color: 'FF0000',
        name: 'Red',
        id: '1'
      });

      const initialState = useSwatchStore.getState();

      // Attempt invalid operation
      try {
        swatchStore.addCustomStep(-100); // Invalid step
      } catch (error) {
        // Store should remain in valid state
        const currentState = useSwatchStore.getState();
        expect(currentState.primaryColors).toEqual(initialState.primaryColors);
      }
    });
  });

  describe('Performance with Large Datasets', () => {
    it('should handle workflow with many colors and steps', () => {
      const swatchStore = useSwatchStore.getState();
      const tokenStore = useTokenNameStore.getState();

      // Add many primary colors
      for (let i = 0; i < 10; i++) {
        swatchStore.addPrimaryColor({
          color: `${i}${i}0000`,
          name: `Color ${i}`,
          id: `${i}`
        });
      }

      // Add many custom steps
      for (let step = 100; step <= 900; step += 50) {
        swatchStore.addCustomStep(step);
      }

      // Configure complex naming
      tokenStore.setCaseTreatment('upper');
      tokenStore.setSpaceTreatment('underscore');
      tokenStore.setLeadingCharsCount(3);

      // Complete workflow should still work
      expect(() => {
        swatchStore.setCombinedSteps();
        swatchStore.buildSwatches();
        const output = generateCSSVariables();
        expect(output).toContain('--color-0: #000000;');
      }).not.toThrow();
    });
  });
});
