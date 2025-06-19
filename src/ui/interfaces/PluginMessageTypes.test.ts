/**
 * Tests for PluginMessageTypes with runtime validation
 */

import {
  PluginMessageType,
  HelloMessage,
  UiReadyMessage,
  CreateSwatchesMessage,
  ErrorMessage,
  isValidPluginMessageType,
  isValidTimestamp,
  isHelloMessage,
  isUiReadyMessage,
  isCreateSwatchesMessage,
  isErrorMessage,
  validatePluginMessage,
  validatePluginMessageWrapper,
  dispatchPluginMessage,
  MessageHandlers,
} from './PluginMessageTypes';

describe('PluginMessageTypes', () => {
  describe('isValidPluginMessageType', () => {
    test('validates correct message types', () => {
      expect(isValidPluginMessageType('hello')).toBe(true);
      expect(isValidPluginMessageType('ui-ready')).toBe(true);
      expect(isValidPluginMessageType('create-swatches')).toBe(true);
      expect(isValidPluginMessageType('create-styles')).toBe(true);
      expect(isValidPluginMessageType('create-variables')).toBe(true);
      expect(isValidPluginMessageType('error')).toBe(true);
    });

    test('rejects invalid message types', () => {
      expect(isValidPluginMessageType('invalid')).toBe(false);
      expect(isValidPluginMessageType('')).toBe(false);
      expect(isValidPluginMessageType(123)).toBe(false);
      expect(isValidPluginMessageType(null)).toBe(false);
      expect(isValidPluginMessageType(undefined)).toBe(false);
    });
  });

  describe('isValidTimestamp', () => {
    test('validates correct timestamps', () => {
      const now = Date.now();
      expect(isValidTimestamp(now)).toBe(true);
      expect(isValidTimestamp(now - 1000)).toBe(true);
      expect(isValidTimestamp(1000000000000)).toBe(true); // Valid past timestamp
    });

    test('rejects invalid timestamps', () => {
      expect(isValidTimestamp(-1)).toBe(false);
      expect(isValidTimestamp(0)).toBe(false);
      expect(isValidTimestamp(Date.now() + 2000)).toBe(false); // Too far in future
      expect(isValidTimestamp(123.456)).toBe(false); // Not integer
      expect(isValidTimestamp('123')).toBe(false);
      expect(isValidTimestamp(null)).toBe(false);
    });
  });

  describe('Message type guards', () => {
    describe('isHelloMessage', () => {
      test('validates correct hello messages', () => {
        const message = { type: 'hello' as const, message: 'Hello World' };
        expect(isHelloMessage(message)).toBe(true);
      });

      test('rejects invalid hello messages', () => {
        expect(isHelloMessage({ type: 'hello' as const })).toBe(false); // Missing message
        expect(isHelloMessage({ type: 'hello' as const, message: 123 } as any)).toBe(false); // Wrong type
        expect(isHelloMessage({ type: 'ui-ready' as const, message: 'Hello' } as any)).toBe(false); // Wrong type
      });
    });

    describe('isUiReadyMessage', () => {
      test('validates correct ui-ready messages', () => {
        const message = { type: 'ui-ready' as const };
        expect(isUiReadyMessage(message)).toBe(true);
      });

      test('rejects invalid ui-ready messages', () => {
        expect(isUiReadyMessage({ type: 'hello' as const })).toBe(false);
      });
    });

    describe('isCreateSwatchesMessage', () => {
      test('validates correct create-swatches messages', () => {
        const message = {
          type: 'create-swatches' as const,
          swatches: [
            { name: 'Red', color: 'FF0000' },
            { name: 'Blue', color: '0000FF' }
          ]
        };
        expect(isCreateSwatchesMessage(message)).toBe(true);
      });

      test('rejects invalid create-swatches messages', () => {
        expect(isCreateSwatchesMessage({ type: 'create-swatches' as const })).toBe(false); // Missing swatches
        expect(isCreateSwatchesMessage({ 
          type: 'create-swatches' as const, 
          swatches: 'invalid' 
        } as any)).toBe(false); // Wrong type
        expect(isCreateSwatchesMessage({ 
          type: 'create-swatches' as const, 
          swatches: [{ name: 'Red' }] // Missing color
        } as any)).toBe(false);
      });
    });

    describe('isErrorMessage', () => {
      test('validates correct error messages', () => {
        const message = { type: 'error' as const, error: 'Something went wrong' };
        expect(isErrorMessage(message)).toBe(true);
      });

      test('rejects invalid error messages', () => {
        expect(isErrorMessage({ type: 'error' as const })).toBe(false); // Missing error
        expect(isErrorMessage({ type: 'error' as const, error: 123 } as any)).toBe(false); // Wrong type
      });
    });
  });

  describe('validatePluginMessage', () => {
    test('validates correct hello message', () => {
      const messageData = {
        type: 'hello',
        message: 'Hello World',
        timestamp: Date.now()
      };

      const result = validatePluginMessage(messageData);
      expect(result.isValid).toBe(true);
      expect(result.validatedMessage).toBeDefined();
      expect(result.validatedMessage!.type).toBe('hello');
      expect((result.validatedMessage as HelloMessage).message).toBe('Hello World');
    });

    test('validates correct ui-ready message', () => {
      const messageData = {
        type: 'ui-ready',
        timestamp: Date.now()
      };

      const result = validatePluginMessage(messageData);
      expect(result.isValid).toBe(true);
      expect(result.validatedMessage).toBeDefined();
      expect(result.validatedMessage!.type).toBe('ui-ready');
    });

    test('validates correct create-swatches message', () => {
      const messageData = {
        type: 'create-swatches',
        swatches: [
          { name: 'Red', color: 'FF0000' },
          { name: 'Blue', color: '0000FF' }
        ]
      };

      const result = validatePluginMessage(messageData);
      expect(result.isValid).toBe(true);
      expect(result.validatedMessage).toBeDefined();
      expect(result.validatedMessage!.type).toBe('create-swatches');
    });

    test('rejects invalid message data', () => {
      const result1 = validatePluginMessage(null);
      expect(result1.isValid).toBe(false);
      expect(result1.errorMessage).toContain('must be an object');

      const result2 = validatePluginMessage({ type: 'invalid' });
      expect(result2.isValid).toBe(false);
      expect(result2.errorMessage).toContain('Invalid message type');

      const result3 = validatePluginMessage({ type: 'hello' }); // Missing message field
      expect(result3.isValid).toBe(false);
      expect(result3.errorMessage).toContain('string message field');
    });

    test('validates timestamps when present', () => {
      const result1 = validatePluginMessage({
        type: 'ui-ready',
        timestamp: Date.now() + 2000 // Too far in future
      });
      expect(result1.isValid).toBe(false);
      expect(result1.errorMessage).toContain('Invalid timestamp');

      const result2 = validatePluginMessage({
        type: 'ui-ready',
        timestamp: Date.now() // Valid timestamp
      });
      expect(result2.isValid).toBe(true);
    });
  });

  describe('validatePluginMessageWrapper', () => {
    test('validates correct wrapper', () => {
      const wrapper = {
        pluginMessage: {
          type: 'hello',
          message: 'Hello World'
        }
      };

      const result = validatePluginMessageWrapper(wrapper);
      expect(result.isValid).toBe(true);
      expect(result.validatedMessage).toBeDefined();
    });

    test('rejects invalid wrapper', () => {
      const result1 = validatePluginMessageWrapper(null);
      expect(result1.isValid).toBe(false);
      expect(result1.errorMessage).toContain('wrapper must be an object');

      const result2 = validatePluginMessageWrapper({});
      expect(result2.isValid).toBe(false);
      expect(result2.errorMessage).toContain('Missing pluginMessage field');

      const result3 = validatePluginMessageWrapper({
        pluginMessage: { type: 'invalid' }
      });
      expect(result3.isValid).toBe(false);
      expect(result3.errorMessage).toContain('Invalid message type');
    });
  });

  describe('dispatchPluginMessage', () => {
    test('dispatches valid messages to correct handlers', () => {
      const helloHandler = jest.fn();
      const uiReadyHandler = jest.fn();
      const errorHandler = jest.fn();

      const handlers: MessageHandlers = {
        hello: helloHandler,
        'ui-ready': uiReadyHandler,
        error: errorHandler,
      };

      // Test hello message
      const helloWrapper = {
        pluginMessage: {
          type: 'hello',
          message: 'Hello World'
        }
      };

      dispatchPluginMessage(helloWrapper, handlers);
      expect(helloHandler).toHaveBeenCalledWith({
        type: 'hello',
        message: 'Hello World'
      });
      expect(uiReadyHandler).not.toHaveBeenCalled();

      // Test ui-ready message
      const uiReadyWrapper = {
        pluginMessage: {
          type: 'ui-ready'
        }
      };

      dispatchPluginMessage(uiReadyWrapper, handlers);
      expect(uiReadyHandler).toHaveBeenCalledWith({
        type: 'ui-ready'
      });
    });

    test('calls validation error handler for invalid messages', () => {
      const validationErrorHandler = jest.fn();
      const handlers: MessageHandlers = {};

      const invalidWrapper = {
        pluginMessage: {
          type: 'invalid'
        }
      };

      dispatchPluginMessage(invalidWrapper, handlers, validationErrorHandler);
      expect(validationErrorHandler).toHaveBeenCalledWith(
        expect.stringContaining('Invalid message type')
      );
    });

    test('handles missing handlers gracefully', () => {
      const handlers: MessageHandlers = {}; // No handlers

      const validWrapper = {
        pluginMessage: {
          type: 'hello',
          message: 'Hello World'
        }
      };

      // Should not throw
      expect(() => {
        dispatchPluginMessage(validWrapper, handlers);
      }).not.toThrow();
    });

    test('handles validation errors without error handler', () => {
      const handlers: MessageHandlers = {};

      const invalidWrapper = {
        pluginMessage: {
          type: 'invalid'
        }
      };

      // Should not throw even without validation error handler
      expect(() => {
        dispatchPluginMessage(invalidWrapper, handlers);
      }).not.toThrow();
    });
  });

  describe('Type safety', () => {
    test('Message types enforce correct structure', () => {
      // This test verifies that TypeScript compilation would catch these errors
      const helloMessage: HelloMessage = {
        type: 'hello',
        message: 'Hello World'
      };

      const uiReadyMessage: UiReadyMessage = {
        type: 'ui-ready'
      };

      // These would cause TypeScript errors if uncommented:
      // const invalidHello: HelloMessage = { type: 'hello' }; // Error: Missing message
      // const invalidType: HelloMessage = { type: 'ui-ready', message: 'Hello' }; // Error: Wrong type

      expect(helloMessage.type).toBe('hello');
      expect(uiReadyMessage.type).toBe('ui-ready');
    });

    test('Handler types enforce correct message types', () => {
      const handlers: MessageHandlers = {
        hello: (message: HelloMessage) => {
          // TypeScript ensures message has correct type
          expect(message.message).toBeDefined();
          expect(typeof message.message).toBe('string');
        },
        'ui-ready': (message: UiReadyMessage) => {
          // TypeScript ensures message has correct type
          expect(message.type).toBe('ui-ready');
        }
      };

      // These would cause TypeScript errors if uncommented:
      // handlers.hello = (message: UiReadyMessage) => {}; // Error: Wrong message type
      // handlers['ui-ready'] = (message: HelloMessage) => {}; // Error: Wrong message type

      expect(handlers.hello).toBeDefined();
      expect(handlers['ui-ready']).toBeDefined();
    });
  });
});
