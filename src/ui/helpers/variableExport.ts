import { SwatchStoreState, SwatchStoreSwatches } from "@ui/store/useSwatchStore";
import { TokenNameStoreState } from "@ui/store/useTokenNameStore";
import { computeTokenName } from "./computeTokenName";

export interface VariableExportData {
    shade: { color: string; name: string };
    tint: { color: string; name: string };
    swatches: SwatchStoreSwatches[];
    shadeTintRampName: string;
}

const formatVariableName = (name: string, tokenStore: TokenNameStoreState): string => {
    return computeTokenName(
        name,
        tokenStore.caseTreatment,
        tokenStore.spaceTreatment,
        tokenStore.leadingCharsCount,
        0, // No separator chars (trailing)
        tokenStore.leadingCharType,
        tokenStore.separatorCharType,
        false // Don't append separator
    );
};

export const generateCSSVariables = (
    swatchStore: SwatchStoreState,
    tokenStore: TokenNameStoreState
): string => {
    const { shade, tint, swatches, shadeTintRampName } = swatchStore;
    const lines: string[] = [];
    
    lines.push(':root {');
    
    // Add shade/tint variables
    lines.push(`  /* ${shadeTintRampName || 'Gray'} Shade/Tint */`);
    if (shade?.color && shade?.name) {
        lines.push(`  --${formatVariableName(shade.name.toLowerCase(), tokenStore)}: #${shade.color};`);
    }
    if (tint?.color && tint?.name) {
        lines.push(`  --${formatVariableName(tint.name.toLowerCase(), tokenStore)}: #${tint.color};`);
    }
    lines.push('');
    
    // Add primary color swatches
    if (swatches && swatches.length > 0) {
        for (const swatch of swatches) {
            if (swatch?.base?.name) {
                lines.push(`  /* ${swatch.base.name} Colors */`);
                
                if (swatch.swatches && swatch.swatches.length > 0) {
                    for (const colorSwatch of swatch.swatches) {
                        if (colorSwatch?.color && colorSwatch?.step) {
                            const tokenName = formatVariableName(`${swatch.base.name}-${colorSwatch.step}`, tokenStore);
                            lines.push(`  --${tokenName}: #${colorSwatch.color};`);
                        }
                    }
                }
                lines.push('');
            }
        }
    } else {
        lines.push('  /* No color swatches available */');
        lines.push('');
    }
    
    lines.push('}');
    
    return lines.join('\n');
};

export const generateSCSSVariables = (
    swatchStore: SwatchStoreState,
    tokenStore: TokenNameStoreState
): string => {
    const { shade, tint, swatches, shadeTintRampName } = swatchStore;
    const lines: string[] = [];
    
    // Add shade/tint variables
    lines.push(`// ${shadeTintRampName || 'Gray'} Shade/Tint`);
    if (shade?.color && shade?.name) {
        lines.push(`$${formatVariableName(shade.name.toLowerCase(), tokenStore)}: #${shade.color};`);
    }
    if (tint?.color && tint?.name) {
        lines.push(`$${formatVariableName(tint.name.toLowerCase(), tokenStore)}: #${tint.color};`);
    }
    lines.push('');
    
    // Add primary color swatches
    if (swatches && swatches.length > 0) {
        for (const swatch of swatches) {
            if (swatch?.base?.name) {
                lines.push(`// ${swatch.base.name} Colors`);
                
                if (swatch.swatches && swatch.swatches.length > 0) {
                    for (const colorSwatch of swatch.swatches) {
                        if (colorSwatch?.color && colorSwatch?.step) {
                            const tokenName = formatVariableName(`${swatch.base.name}-${colorSwatch.step}`, tokenStore);
                            lines.push(`$${tokenName}: #${colorSwatch.color};`);
                        }
                    }
                }
                lines.push('');
            }
        }
    } else {
        lines.push('// No color swatches available');
        lines.push('');
    }
    
    return lines.join('\n');
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