/**
 * Service for input validation and error handling
 */
export class ValidationService {
  /**
   * Validates numeric input
   */
  static validateNumericInput(
    input: string,
    min?: number,
    max?: number
  ): { isValid: boolean; errorMessage?: string } {
    if (!input.trim()) {
      return {
        isValid: false,
        errorMessage: 'Input cannot be empty'
      };
    }

    const numericRegex = /^[0-9]+$/;
    if (!numericRegex.test(input)) {
      return {
        isValid: false,
        errorMessage: 'Input must be numeric'
      };
    }

    const value = parseInt(input, 10);

    if (min !== undefined && value < min) {
      return {
        isValid: false,
        errorMessage: `Value must be at least ${min}`
      };
    }

    if (max !== undefined && value > max) {
      return {
        isValid: false,
        errorMessage: `Value must be at most ${max}`
      };
    }

    return { isValid: true };
  }

  /**
   * Validates text input
   */
  static validateTextInput(
    input: string,
    minLength?: number,
    maxLength?: number,
    pattern?: RegExp
  ): { isValid: boolean; errorMessage?: string } {
    if (minLength !== undefined && input.length < minLength) {
      return {
        isValid: false,
        errorMessage: `Input must be at least ${minLength} characters`
      };
    }

    if (maxLength !== undefined && input.length > maxLength) {
      return {
        isValid: false,
        errorMessage: `Input must be at most ${maxLength} characters`
      };
    }

    if (pattern && !pattern.test(input)) {
      return {
        isValid: false,
        errorMessage: 'Input format is invalid'
      };
    }

    return { isValid: true };
  }

  /**
   * Validates hex color input
   */
  static validateHexColorInput(input: string): { isValid: boolean; errorMessage?: string } {
    const cleanInput = input.replace('#', '').toUpperCase();
    
    if (cleanInput.length !== 6) {
      return {
        isValid: false,
        errorMessage: 'Hex color must be 6 characters long'
      };
    }

    const hexPattern = /^[0-9A-F]{6}$/;
    if (!hexPattern.test(cleanInput)) {
      return {
        isValid: false,
        errorMessage: 'Invalid hex color format'
      };
    }

    return { isValid: true };
  }

  /**
   * Validates step input for custom steps
   */
  static validateStepInput(
    input: string,
    existingSteps: Set<number>,
    reservedSteps: number[] = [0, 500, 1000]
  ): { isValid: boolean; errorMessage?: string } {
    const numericValidation = this.validateNumericInput(input, 1, 999);
    if (!numericValidation.isValid) {
      return numericValidation;
    }

    const step = parseInt(input, 10);

    if (reservedSteps.includes(step)) {
      return {
        isValid: false,
        errorMessage: 'Step value is reserved'
      };
    }

    if (existingSteps.has(step)) {
      return {
        isValid: false,
        errorMessage: 'Step already exists'
      };
    }

    return { isValid: true };
  }

  /**
   * Sanitizes text input
   */
  static sanitizeTextInput(input: string): string {
    return input.trim().replace(/[<>]/g, '');
  }

  /**
   * Sanitizes hex color input
   */
  static sanitizeHexColorInput(input: string): string {
    return input.replace('#', '').toUpperCase().substring(0, 6);
  }
}
