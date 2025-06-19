/**
 * Plugin message types with runtime validation for external data
 */

// Base plugin message types
export type PluginMessageType = 'hello' | 'ui-ready' | 'create-swatches' | 'create-styles' | 'create-variables' | 'error';

export interface BasePluginMessage {
  readonly type: PluginMessageType;
  readonly timestamp?: number;
}

export interface HelloMessage extends BasePluginMessage {
  readonly type: 'hello';
  readonly message: string;
}

export interface UiReadyMessage extends BasePluginMessage {
  readonly type: 'ui-ready';
}

export interface CreateSwatchesMessage extends BasePluginMessage {
  readonly type: 'create-swatches';
  readonly swatches: readonly {
    readonly name: string;
    readonly color: string;
  }[];
}

export interface CreateStylesMessage extends BasePluginMessage {
  readonly type: 'create-styles';
  readonly styles: readonly {
    readonly name: string;
    readonly color: string;
  }[];
}

export interface CreateVariablesMessage extends BasePluginMessage {
  readonly type: 'create-variables';
  readonly variables: readonly {
    readonly name: string;
    readonly color: string;
  }[];
}

export interface ErrorMessage extends BasePluginMessage {
  readonly type: 'error';
  readonly error: string;
  readonly details?: string;
}

export type PluginMessage = 
  | HelloMessage 
  | UiReadyMessage 
  | CreateSwatchesMessage 
  | CreateStylesMessage 
  | CreateVariablesMessage 
  | ErrorMessage;

// Plugin message wrapper
export interface PluginMessageWrapper {
  readonly pluginMessage: PluginMessage;
}

// Validation utilities
export const isValidPluginMessageType = (type: unknown): type is PluginMessageType => {
  return typeof type === 'string' && 
    ['hello', 'ui-ready', 'create-swatches', 'create-styles', 'create-variables', 'error'].includes(type);
};

export const isValidTimestamp = (timestamp: unknown): timestamp is number => {
  return typeof timestamp === 'number' && 
    Number.isInteger(timestamp) && 
    timestamp > 0 && 
    timestamp <= Date.now() + 1000; // Allow 1 second in the future for clock skew
};

// Type guards for specific message types
export const isHelloMessage = (message: BasePluginMessage): message is HelloMessage => {
  return message.type === 'hello' && 
    'message' in message && 
    typeof (message as any).message === 'string';
};

export const isUiReadyMessage = (message: BasePluginMessage): message is UiReadyMessage => {
  return message.type === 'ui-ready';
};

export const isCreateSwatchesMessage = (message: BasePluginMessage): message is CreateSwatchesMessage => {
  if (message.type !== 'create-swatches' || !('swatches' in message)) {
    return false;
  }

  const swatches = (message as any).swatches;
  return Array.isArray(swatches) && 
    swatches.every(swatch => 
      typeof swatch === 'object' && 
      swatch !== null &&
      typeof swatch.name === 'string' && 
      typeof swatch.color === 'string'
    );
};

export const isCreateStylesMessage = (message: BasePluginMessage): message is CreateStylesMessage => {
  if (message.type !== 'create-styles' || !('styles' in message)) {
    return false;
  }

  const styles = (message as any).styles;
  return Array.isArray(styles) && 
    styles.every(style => 
      typeof style === 'object' && 
      style !== null &&
      typeof style.name === 'string' && 
      typeof style.color === 'string'
    );
};

export const isCreateVariablesMessage = (message: BasePluginMessage): message is CreateVariablesMessage => {
  if (message.type !== 'create-variables' || !('variables' in message)) {
    return false;
  }

  const variables = (message as any).variables;
  return Array.isArray(variables) && 
    variables.every(variable => 
      typeof variable === 'object' && 
      variable !== null &&
      typeof variable.name === 'string' && 
      typeof variable.color === 'string'
    );
};

export const isErrorMessage = (message: BasePluginMessage): message is ErrorMessage => {
  return message.type === 'error' && 
    'error' in message && 
    typeof (message as any).error === 'string';
};

// Validation result types
export interface PluginMessageValidationResult {
  readonly isValid: boolean;
  readonly errorMessage?: string;
  readonly validatedMessage?: PluginMessage;
}

// Main validation function
export const validatePluginMessage = (data: unknown): PluginMessageValidationResult => {
  // Check if data is an object
  if (typeof data !== 'object' || data === null) {
    return {
      isValid: false,
      errorMessage: 'Plugin message must be an object',
    };
  }

  const messageData = data as Record<string, unknown>;

  // Check if type exists and is valid
  if (!isValidPluginMessageType(messageData.type)) {
    return {
      isValid: false,
      errorMessage: `Invalid message type: ${messageData.type}`,
    };
  }

  // Validate timestamp if present
  if (messageData.timestamp !== undefined && !isValidTimestamp(messageData.timestamp)) {
    return {
      isValid: false,
      errorMessage: `Invalid timestamp: ${messageData.timestamp}`,
    };
  }

  const baseMessage: BasePluginMessage = {
    type: messageData.type,
    timestamp: messageData.timestamp as number | undefined,
  };

  // Validate specific message types
  try {
    switch (messageData.type) {
      case 'hello':
        if (!isHelloMessage(messageData as any)) {
          return {
            isValid: false,
            errorMessage: 'Hello message must contain a string message field',
          };
        }
        return {
          isValid: true,
          validatedMessage: messageData as unknown as HelloMessage,
        };

      case 'ui-ready':
        return {
          isValid: true,
          validatedMessage: baseMessage as UiReadyMessage,
        };

      case 'create-swatches':
        if (!isCreateSwatchesMessage(messageData as any)) {
          return {
            isValid: false,
            errorMessage: 'Create swatches message must contain valid swatches array',
          };
        }
        return {
          isValid: true,
          validatedMessage: messageData as unknown as CreateSwatchesMessage,
        };

      case 'create-styles':
        if (!isCreateStylesMessage(messageData as any)) {
          return {
            isValid: false,
            errorMessage: 'Create styles message must contain valid styles array',
          };
        }
        return {
          isValid: true,
          validatedMessage: messageData as unknown as CreateStylesMessage,
        };

      case 'create-variables':
        if (!isCreateVariablesMessage(messageData as any)) {
          return {
            isValid: false,
            errorMessage: 'Create variables message must contain valid variables array',
          };
        }
        return {
          isValid: true,
          validatedMessage: messageData as unknown as CreateVariablesMessage,
        };

      case 'error':
        if (!isErrorMessage(messageData as any)) {
          return {
            isValid: false,
            errorMessage: 'Error message must contain a string error field',
          };
        }
        return {
          isValid: true,
          validatedMessage: messageData as unknown as ErrorMessage,
        };

      default:
        return {
          isValid: false,
          errorMessage: `Unhandled message type: ${messageData.type}`,
        };
    }
  } catch (error) {
    return {
      isValid: false,
      errorMessage: error instanceof Error ? error.message : 'Unknown validation error',
    };
  }
};

// Wrapper validation
export const validatePluginMessageWrapper = (data: unknown): PluginMessageValidationResult => {
  if (typeof data !== 'object' || data === null) {
    return {
      isValid: false,
      errorMessage: 'Plugin message wrapper must be an object',
    };
  }

  const wrapper = data as Record<string, unknown>;

  if (!('pluginMessage' in wrapper)) {
    return {
      isValid: false,
      errorMessage: 'Missing pluginMessage field in wrapper',
    };
  }

  return validatePluginMessage(wrapper.pluginMessage);
};

// Safe message handler type
export type SafeMessageHandler<T extends PluginMessage> = (message: T) => void;

// Message handler registry
export interface MessageHandlers {
  readonly hello?: SafeMessageHandler<HelloMessage>;
  readonly 'ui-ready'?: SafeMessageHandler<UiReadyMessage>;
  readonly 'create-swatches'?: SafeMessageHandler<CreateSwatchesMessage>;
  readonly 'create-styles'?: SafeMessageHandler<CreateStylesMessage>;
  readonly 'create-variables'?: SafeMessageHandler<CreateVariablesMessage>;
  readonly error?: SafeMessageHandler<ErrorMessage>;
}

// Safe message dispatcher
export const dispatchPluginMessage = (
  data: unknown,
  handlers: MessageHandlers,
  onValidationError?: (error: string) => void
): void => {
  const validation = validatePluginMessageWrapper(data);

  if (!validation.isValid) {
    if (onValidationError) {
      onValidationError(validation.errorMessage || 'Unknown validation error');
    }
    return;
  }

  const message = validation.validatedMessage!;
  const handler = handlers[message.type];

  if (handler) {
    handler(message as any);
  }
};
