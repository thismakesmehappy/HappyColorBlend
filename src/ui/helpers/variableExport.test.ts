import { generateCSSVariables, generateSCSSVariables } from './variableExport';
import { SwatchStoreState } from '@ui/store/useSwatchStore';
import { TokenNameStoreState } from '@ui/store/useTokenNameStore';

// Mock the store hooks
jest.mock('@ui/store/useSwatchStore', () => ({
    __esModule: true,
    default: jest.fn()
}));

jest.mock('@ui/store/useTokenNameStore', () => ({
    __esModule: true,
    default: jest.fn()
}));

import useSwatchStore from '@ui/store/useSwatchStore';
import useTokenNameStore from '@ui/store/useTokenNameStore';

const mockUseSwatchStore = useSwatchStore as jest.MockedFunction<typeof useSwatchStore>;
const mockUseTokenNameStore = useTokenNameStore as jest.MockedFunction<typeof useTokenNameStore>;

// Mock swatch store data
const mockSwatchStore: Partial<SwatchStoreState> = {
    scaleStart: { color: '000000', name: 'Black', id: 'scaleStart' },
    scaleEnd: { color: 'FFFFFF', name: 'White', id: 'scaleEnd' },
    neutralScaleName: 'Neutral',
    primaryColors: [
        { color: '3B82F6', name: 'Blue', id: 'blue' }
    ],
    combinedSteps: new Set([400, 500, 600]),
    colorScale: [
        { color: '666666', step: 400 },
        { color: '808080', step: 500 },
        { color: '999999', step: 600 }
    ],
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
    beforeEach(() => {
        // Mock the getState method
        (mockUseSwatchStore as any).getState = jest.fn().mockReturnValue(mockSwatchStore);
        (mockUseTokenNameStore as any).getState = jest.fn().mockReturnValue(mockTokenStore);
    });

    describe('generateCSSVariables', () => {
        it('should generate CSS variables with correct format', () => {
            const result = generateCSSVariables();

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
            const result = generateSCSSVariables();

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