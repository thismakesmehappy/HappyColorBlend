import { Networker } from "monorepo-networker";
import { BaseSwatchData, BaseCreationResult } from "./BaseNetworkInterfaces";
import { BaseColor } from "../ui/interfaces/BaseInterfaces";

export interface SwatchVariableData extends BaseSwatchData {}

export interface VariableCreationResult extends BaseCreationResult {}

export interface SwatchStyleData extends BaseSwatchData {}

export interface StyleCreationResult extends BaseCreationResult {}

export interface SwatchCreationData extends BaseSwatchData {
  displayWidth?: number;
  swatchSize?: number;
  fontSize?: number;
}

export interface SwatchCreationResult extends BaseCreationResult {}

export const UI = Networker.createSide("UI-side").listens<{
  ping(): "pong";
  hello(text: string): void;
}>();

export const PLUGIN = Networker.createSide("Plugin-side").listens<{
  ping(): "pong";
  hello(text: string): void;
  createRect(width: number, height: number): void;
  exportSelection(): Promise<string>;
  extractColorsFromSelection(): Promise<BaseColor[]>;
  extractSingleColorFromSelection(): Promise<BaseColor>;
  createVariables(data: SwatchVariableData): Promise<VariableCreationResult>;
  createStyles(data: SwatchStyleData): Promise<StyleCreationResult>;
  createSwatches(data: SwatchCreationData): Promise<SwatchCreationResult>;
  saveState(state: any): Promise<void>;
  loadState(): Promise<any>;
}>();
