import {SwatchStoreState, SwatchStoreSwatch, SwatchStoreSwatches} from "@ui/store/useSwatchStore";
import {TokenNameStoreState} from "@ui/store/useTokenNameStore";
import {computeTokenName} from "./computeTokenName";

export interface VariableExportData {
    scaleStart: { color: string; name: string };
    scaleEnd: { color: string; name: string };
    swatches: SwatchStoreSwatches[];
    neutralScaleName: string;
}

const formatVariableName = (name: string, tokenStore: TokenNameStoreState, appendSeparator = tokenStore.appendSeparatorToPrimitive): string => {
    return computeTokenName(
        name,
        tokenStore.caseTreatment,
        tokenStore.spaceTreatment,
        tokenStore.leadingCharsCount,
        tokenStore.separatorCharsCount,
        tokenStore.leadingCharType,
        tokenStore.separatorCharType,
        appendSeparator,
        !tokenStore.keepCSSClean
    );
};

export const generateVariables = (
    swatchStore: SwatchStoreState,
    tokenStore: TokenNameStoreState,
    indent: string = '',
    prepend: string = ''
): string => {
    const {dark, light, isDarkStart, swatches, neutralScaleName, primaryColors} = swatchStore;
    const scaleStart = isDarkStart ? dark : light;
    const scaleEnd = isDarkStart ? light : dark;
    const lines: string[] = [];

    const colorScale: SwatchStoreSwatch[] = swatchStore.buildColorScale();


    // Add scale endpoint variables (primitives group)
    lines.push(`${indent}/* Primitives */`);
    if (scaleStart?.color && scaleStart?.name) {
        lines.push(`${indent}${prepend}${formatVariableName(scaleStart.name.toLowerCase(), tokenStore)}: #${scaleStart.color};`);
    }
    if (scaleEnd?.color && scaleEnd?.name) {
        lines.push(`${indent}${prepend}${formatVariableName(scaleEnd.name.toLowerCase(), tokenStore)}: #${scaleEnd.color};`);
    }

    if (primaryColors && primaryColors.length) {
        for (const swatch of primaryColors) {
            lines.push(`${indent}${prepend}${formatVariableName(swatch.name.toLowerCase(), tokenStore)}: #${swatch.color};`);
        }
        lines.push('');
    }

    lines.push('');
    lines.push(`${indent}/* ${neutralScaleName} */`);

    for (const colorSwatch of colorScale) {
        if (colorSwatch?.color && colorSwatch?.step) {
            const tokenName = formatVariableName(neutralScaleName, tokenStore, true) + colorSwatch.step;
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
    let lines = ':root {\n';
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