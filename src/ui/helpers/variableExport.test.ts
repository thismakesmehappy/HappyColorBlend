import { generateCSSVariables, generateSCSSVariables } from './variableExport';
import { SwatchStoreState } from '@ui/store/useSwatchStore';
import { TokenNameStoreState } from '@ui/store/useTokenNameStore';

// Mock swatch store data
const mockSwatchStore: Partial<SwatchStoreState> = {
    scaleStart: { color: '000000', name: 'Black', id: 'scaleStart' },
    scaleEnd: { color: 'FFFFFF', name: 'White', id: 'scaleEnd' },
    neutralScaleName: 'Neutral',
    primaryColors: [
        { color: '3B82F6', name: 'Blue', id: 'blue' }
    ],
    combinedSteps: new Set([400, 500, 600]),
    swatches: [
        {
            base: { color: '3B82F6', name: 'Blue', id: 'blue' },
            swatches: [
                { color: '60A5FA', step: 400 },
                { color: '3B82F6', step: 500 },
                { color: '2563EB', step: 600 }
            ]
        }
    ],
    buildColorScale: () => [
        { color: '666666', step: 400 },
        { color: '808080', step: 500 },
        { color: '999999', step: 600 }
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
    appendSeparatorToPrimitive: false,
    keepCSSClean: true
};

describe('variableExport', () => {
    describe('generateCSSVariables', () => {
        it('should generate CSS variables with correct format', () => {
            const result = generateCSSVariables(
                mockSwatchStore as SwatchStoreState,
                mockTokenStore as TokenNameStoreState
            );

            expect(result).toContain(':root');
            expect(result).toContain('/* Primitives */');
            expect(result).toContain('--black: #000000;');
            expect(result).toContain('--white: #FFFFFF;');
            expect(result).toContain('--blue: #3B82F6;');
            expect(result).toContain('--blue: #3B82F6;');
            expect(result).toContain('/* Neutral */');
            expect(result).toContain('/* Blue */');
            expect(result).toContain('}');
        });
    });

    describe('generateSCSSVariables', () => {
        it('should generate SCSS variables with correct format', () => {
            const result = generateSCSSVariables(
                mockSwatchStore as SwatchStoreState,
                mockTokenStore as TokenNameStoreState
            );

            expect(result).toContain('/* Primitives */');
            expect(result).toContain('$black: #000000;');
            expect(result).toContain('$white: #FFFFFF;');
            expect(result).toContain('$blue: #3B82F6;');
            expect(result).toContain('$blue: #3B82F6;');
            expect(result).toContain('/* Neutral */');
            expect(result).toContain('/* Blue */');
        });
    });
});