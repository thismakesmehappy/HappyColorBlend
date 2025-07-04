import { generateCSSVariables, generateSCSSVariables } from './variableExport';
import { SwatchStoreState } from '@ui/store/useSwatchStore';
import { TokenNameStoreState } from '@ui/store/useTokenNameStore';

// Mock swatch store data
const mockSwatchStore: Partial<SwatchStoreState> = {
    shade: { color: '000000', name: 'Black', id: 'shade' },
    tint: { color: 'FFFFFF', name: 'White', id: 'tint' },
    shadeTintRampName: 'Gray',
    swatches: [
        {
            base: { color: '3B82F6', name: 'Blue', id: 'blue' },
            swatches: [
                { color: '60A5FA', step: 400 },
                { color: '3B82F6', step: 500 },
                { color: '2563EB', step: 600 }
            ]
        }
    ]
};

// Mock token store data
const mockTokenStore: Partial<TokenNameStoreState> = {
    caseTreatment: 'lower',
    spaceTreatment: 'dash',
    leadingCharsCount: 0,
    separatorCharsCount: 0,
    leadingCharType: 'dash',
    separatorCharType: 'dash',
    appendSeparatorToPrimitive: false
};

describe('variableExport', () => {
    describe('generateCSSVariables', () => {
        it('should generate CSS variables with correct format', () => {
            const result = generateCSSVariables(
                mockSwatchStore as SwatchStoreState,
                mockTokenStore as TokenNameStoreState
            );

            expect(result).toContain(':root {');
            expect(result).toContain('/* Gray Shade/Tint */');
            expect(result).toContain('--black: #000000;');
            expect(result).toContain('--white: #FFFFFF;');
            expect(result).toContain('/* Blue Colors */');
            expect(result).toContain('--blue-400: #60A5FA;');
            expect(result).toContain('--blue-500: #3B82F6;');
            expect(result).toContain('--blue-600: #2563EB;');
            expect(result).toContain('}');
        });
    });

    describe('generateSCSSVariables', () => {
        it('should generate SCSS variables with correct format', () => {
            const result = generateSCSSVariables(
                mockSwatchStore as SwatchStoreState,
                mockTokenStore as TokenNameStoreState
            );

            expect(result).toContain('// Gray Shade/Tint');
            expect(result).toContain('$black: #000000;');
            expect(result).toContain('$white: #FFFFFF;');
            expect(result).toContain('// Blue Colors');
            expect(result).toContain('$blue-400: #60A5FA;');
            expect(result).toContain('$blue-500: #3B82F6;');
            expect(result).toContain('$blue-600: #2563EB;');
        });
    });
});