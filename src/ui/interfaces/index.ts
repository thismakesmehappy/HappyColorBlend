/**
 * Centralized exports for all type-safe interfaces
 */

// Re-export existing interfaces
export * from './AlertLevel';
export * from './ClassAndStyle';
export * from './OptionalClassName';

// Export new type-safe interfaces
export * from './ColorTypes';
export * from './StepTypes';
export * from './SwatchTypes';
export * from './PluginMessageTypes';

// Legacy SwatchProps - keep for backward compatibility but mark as deprecated
export { default as SwatchProps } from './SwatchProps';

// Convenience re-exports for commonly used types
export type {
  HexColor,
  RgbColor,
  HslColor,
} from './ColorTypes';

export type {
  StepValue,
  StepCount,
  StepConfiguration,
  StepValidationResult,
} from './StepTypes';

export type {
  TypeSafeInputSwatch,
  TypeSafeSwatch,
  TypeSafeSwatchGroup,
  SwatchValidationResult,
} from './SwatchTypes';

export type {
  PluginMessage,
  PluginMessageType,
  PluginMessageWrapper,
  MessageHandlers,
  SafeMessageHandler,
} from './PluginMessageTypes';