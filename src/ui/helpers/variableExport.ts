import {SwatchStoreState, SwatchStoreSwatch, SwatchStoreSwatches} from "@ui/store/useSwatchStore";
import {TokenNameStoreState} from "@ui/store/useTokenNameStore";
import {computeTokenName} from "./computeTokenName";
import {blendColor} from "@ui/helpers/colorMethods";

export interface VariableExportData {
    shade: { color: string; name: string };
    tint: { color: string; name: string };
    swatches: SwatchStoreSwatches[];
    shadeTintRampName: string;
}

const formatVariableName = (name: string, tokenStore: TokenNameStoreState, appendSeparator = tokenStore.appendSeparatorToPrimitive): string => {
    return computeTokenName(
        name,
        tokenStore.caseTreatment,
        tokenStore.spaceTreatment,
        tokenStore.leadingCharsCount,
        tokenStore.separatorCharsCount, // No separator chars (trailing)
        tokenStore.leadingCharType,
        tokenStore.separatorCharType,
        appendSeparator // Don't append separator
    );
};

export const generateVariables = (
    swatchStore: SwatchStoreState,
    tokenStore: TokenNameStoreState,
    indent: string = '',
    prepend: string = ''
): string => {
    const {shade, tint, swatches, shadeTintRampName, primaryColors, combinedSteps} = swatchStore;
    const lines: string[] = [];

    // TODO: Move logic to useSwatchStore
    const toneRamp: SwatchStoreSwatch[] = Array.from(combinedSteps).map((step) => {
        return {
            color: blendColor(shade.color, tint.color, step),
            step: step,
        }
    });


    // Add shade/tint variables
    lines.push(`${indent}/* Shade/Tint */`);
    if (shade?.color && shade?.name) {
        lines.push(`${indent}${prepend}${formatVariableName(shade.name.toLowerCase(), tokenStore)}: #${shade.color};`);
    }
    if (tint?.color && tint?.name) {
        lines.push(`${indent}${prepend}${formatVariableName(tint.name.toLowerCase(), tokenStore)}: #${tint.color};`);
    }
    lines.push('');

    if (primaryColors && primaryColors.length) {
        lines.push(`${indent}/* Primary Colors */`);
        for (const swatch of primaryColors) {
            lines.push(`${indent}${prepend}${formatVariableName(swatch.name.toLowerCase(), tokenStore)}: #${swatch.color};`);
        }
        lines.push('');
    }

    lines.push(`${indent}/* ${shadeTintRampName} */`);

    for (const colorSwatch of toneRamp) {
        if (colorSwatch?.color && colorSwatch?.step) {
            const tokenName = formatVariableName(shadeTintRampName, tokenStore, true) + colorSwatch.step;
            lines.push(`${indent}${prepend}${tokenName}: #${colorSwatch.color};`);
        }
    }

    lines.push('');

    // Add primary color swatches
    if (swatches && swatches.length > 0) {
        for (const swatch of swatches) {
            if (swatch?.base?.name) {
                lines.push(`${indent}/* ${swatch.base.name} */`);

                if (swatch.swatches && swatch.swatches.length > 0) {
                    for (const colorSwatch of swatch.swatches) {
                        if (colorSwatch?.color && colorSwatch?.step) {
                            const tokenName = formatVariableName(swatch.base.name, tokenStore, true) + colorSwatch.step;
                            lines.push(`${indent}${prepend}${tokenName}: #${colorSwatch.color};`);
                        }
                    }
                }
                lines.push('');
            }
        }
    } else {
        lines.push(`${indent}/* No color swatches available */`);
        lines.push('');
    }

    return lines.join('\n');
};

export const generateCSSVariables = (
    swatchStore: SwatchStoreState,
    tokenStore: TokenNameStoreState
): string => {
    let lines = ':root \n';
    lines += generateVariables(swatchStore, tokenStore, '    ', '--');
    lines += '}';

    return lines;
};

export const generateSCSSVariables = (
    swatchStore: SwatchStoreState,
    tokenStore: TokenNameStoreState
): string => {
    return generateVariables(swatchStore, tokenStore, '', '$');
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
    // First try the modern Clipboard API
    if (navigator.clipboard && window.isSecureContext) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (error) {
            console.warn('Clipboard API failed, trying fallback:', error);
        }
    }

    // Fallback method using document.execCommand
    try {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);

        if (successful) {
            return true;
        } else {
            console.error('execCommand copy failed');
            return false;
        }
    } catch (error) {
        console.error('Fallback copy method failed:', error);
        return false;
    }
};