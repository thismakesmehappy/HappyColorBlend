import { BaseColor } from "../ui/interfaces/BaseInterfaces";

export interface BaseSwatchData {
    scaleStart: BaseColor;
    scaleEnd: BaseColor;
    primaryColors: BaseColor[];
    neutralScaleName: string;
    neutralScaleSwatches: Array<{ color: string; step: number }>;
    primarySwatches: Array<{
        name: string;
        swatches: Array<{ color: string; step: number }>;
    }>;
    tokenSettings: {
        separatorCharsCount: number;
        separatorCharType: 'dash' | 'underscore';
    };
}

export interface BaseCreationResult {
    success: boolean;
    message: string;
    count?: number;
    error?: string;
}
