import { Networker } from "monorepo-networker";

export interface SwatchVariableData {
  // Primitives
  shade: { name: string; color: string };
  tint: { name: string; color: string };
  primaryColors: Array<{ name: string; color: string }>;
  
  // Mixed ramps
  shadeTintRampName: string;
  shadeTintSwatches: Array<{ color: string; step: number }>;
  primarySwatches: Array<{
    name: string;
    swatches: Array<{ color: string; step: number }>;
  }>;
  
  // Token naming settings for separator construction
  tokenSettings: {
    separatorCharsCount: number;
    separatorCharType: 'dash' | 'underscore';
  };
}

export interface VariableCreationResult {
  success: boolean;
  message: string;
  count?: number;
  error?: string;
}

export interface SwatchStyleData {
  // Primitives
  shade: { name: string; color: string };
  tint: { name: string; color: string };
  primaryColors: Array<{ name: string; color: string }>;
  
  // Mixed ramps
  shadeTintRampName: string;
  shadeTintSwatches: Array<{ color: string; step: number }>;
  primarySwatches: Array<{
    name: string;
    swatches: Array<{ color: string; step: number }>;
  }>;
  
  // Token naming settings for separator construction
  tokenSettings: {
    separatorCharsCount: number;
    separatorCharType: 'dash' | 'underscore';
  };
}

export interface StyleCreationResult {
  success: boolean;
  message: string;
  count?: number;
  error?: string;
}

export interface SwatchCreationData {
  // Primitives
  shade: { name: string; color: string };
  tint: { name: string; color: string };
  primaryColors: Array<{ name: string; color: string }>;
  
  // Mixed ramps
  shadeTintRampName: string;
  shadeTintSwatches: Array<{ color: string; step: number }>;
  primarySwatches: Array<{
    name: string;
    swatches: Array<{ color: string; step: number }>;
  }>;
  
  // Token naming settings
  tokenSettings: {
    separatorCharsCount: number;
    separatorCharType: 'dash' | 'underscore';
  };

  // Display settings
  displayWidth?: number;
  swatchSize?: number;
  fontSize?: number;
}

export interface SwatchCreationResult {
  success: boolean;
  message: string;
  count?: number;
  error?: string;
}

export const UI = Networker.createSide("UI-side").listens<{
  ping(): "pong";
  hello(text: string): void;
}>();

export const PLUGIN = Networker.createSide("Plugin-side").listens<{
  ping(): "pong";
  hello(text: string): void;
  createRect(width: number, height: number): void;
  exportSelection(): Promise<string>;
  extractColorsFromSelection(): Promise<Array<{ color: string; name: string }>>;
  createVariables(data: SwatchVariableData): Promise<VariableCreationResult>;
  createStyles(data: SwatchStyleData): Promise<StyleCreationResult>;
  createSwatches(data: SwatchCreationData): Promise<SwatchCreationResult>;
}>();
