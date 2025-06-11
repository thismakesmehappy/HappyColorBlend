import {test, expect} from '@playwright/test';
import {isValidHexColor, blendPrimaryColor, blendColor} from './colorMethods';

test.describe('isValidHexColor', () => {
    // Success cases
    test('validates correct 6-digit hex color', () => {
        expect(isValidHexColor('FF0000')).toBe(true);
        expect(isValidHexColor('00FF00')).toBe(true);
        expect(isValidHexColor('0000FF')).toBe(true);
        expect(isValidHexColor('123456')).toBe(true);
        expect(isValidHexColor('FFFFFF')).toBe(true);
        expect(isValidHexColor('000000')).toBe(true);
    });

    test('validates lowercase hex colors', () => {
        expect(isValidHexColor('ff0000')).toBe(true);
        expect(isValidHexColor('00ff00')).toBe(true);
        expect(isValidHexColor('abcdef')).toBe(true);
    });

    test('validates number with the right format', () => {
        expect(isValidHexColor(123456 as any)).toBe(true);
    });


    // Failure cases
    test('rejects invalid hex colors', () => {
        expect(isValidHexColor('GG0000')).toBe(false);
        expect(isValidHexColor('GGGGGG')).toBe(false);
        expect(isValidHexColor('ZZZZZZ')).toBe(false);
    });

    // Edge cases
    test('rejects hex colors with wrong length', () => {
        expect(isValidHexColor('')).toBe(false);
        expect(isValidHexColor('F')).toBe(false);
        expect(isValidHexColor('FF')).toBe(false);
        expect(isValidHexColor('FFF')).toBe(false);
        expect(isValidHexColor('FFFF')).toBe(false);
        expect(isValidHexColor('FFFFF')).toBe(false);
        expect(isValidHexColor('FFFFFFF')).toBe(false);
    });

    test('rejects hex colors with # symbol', () => {
        expect(isValidHexColor('#FF0000')).toBe(false);
        expect(isValidHexColor('#000000')).toBe(false);
        expect(isValidHexColor('000000#')).toBe(false);
    });

    test('rejects non-string inputs', () => {
        expect(isValidHexColor(null as any)).toBe(false);
        expect(isValidHexColor(undefined as any)).toBe(false);
        expect(isValidHexColor({} as any)).toBe(false);
        expect(isValidHexColor([] as any)).toBe(false);
    });
});

test.describe('blendPrimaryColor', () => {
    // Success cases
    test('blends colors correctly at midpoint (500)', () => {
        expect(blendPrimaryColor('000000', 'FFFFFF', 'FF0000', 500)).toBe('FF0000');
        expect(blendPrimaryColor('000000', 'FFFFFF', '00FF00', 500)).toBe('00FF00');
        expect(blendPrimaryColor('000000', 'FFFFFF', '0000FF', 500)).toBe('0000FF');
    });

    test('returns shade color at step 0', () => {
        expect(blendPrimaryColor('000000', 'FFFFFF', 'FF0000', 0)).toBe('000000');
        expect(blendPrimaryColor('FFFFFF', 'FFFFFF', '808080', 0)).toBe('FFFFFF');
        expect(blendPrimaryColor('808080', 'FFFFFF', '123456', 0)).toBe('808080');
    });

    test('returns tint color at step 1000', () => {
        expect(blendPrimaryColor('000000', 'FFFFFF', 'FF0000', 1000)).toBe('FFFFFF');
        expect(blendPrimaryColor('AAAAAA', '000000', '123456', 1000)).toBe('000000');
        expect(blendPrimaryColor('000000', '123456', 'ABCDEF', 1000)).toBe('123456');
    });

    test('blends between shade and primary color correctly', () => {
        // At 250, should be halfway between shade and primary
        const result = blendPrimaryColor('000000', 'FFFFFF', 'FF00FF', 250);
        expect(result).toBe('800080');
    });

    test('blends between primary color and tint correctly', () => {
        // At 750, should be halfway between primary and tint
        const result = blendPrimaryColor('BBBBBB', 'FFFFFF', '000000', 750);
        expect(result).toBe('808080');
    });

    // Edge cases
    test('handles step values below 0', () => {
        expect(blendPrimaryColor('000000', 'FFFFFF', 'FF0000', -100)).toBe('000000');
    });

    test('handles step values above 1000', () => {
        expect(blendPrimaryColor('000000', 'FFFFFF', 'FF0000', 1100)).toBe('FFFFFF');
    });

    test('handles same colors for shade and tint', () => {
        expect(blendPrimaryColor('FF0000', 'FF0000', 'FF0000', 500)).toBe('FF0000');
    });
});

test.describe('blendColor', () => {
    // Success cases
    test('blends two colors correctly at midpoint', () => {
        expect(blendColor('000000', 'FFFFFF', 500)).toBe('808080');
    });

    test('returns first color at step 0', () => {
        expect(blendColor('FF0000', '0000FF', 0)).toBe('FF0000');
    });

    test('returns second color at step 1000', () => {
        expect(blendColor('FF0000', '0000FF', 1000)).toBe('0000FF');
    });

    test('blends colors correctly at quarter point', () => {
        expect(blendColor('000000', 'FFFFFF', 250)).toBe('404040');
    });

    test('blends colors correctly at three-quarter point', () => {
        expect(blendColor('000000', 'FFFFFF', 750)).toBe('BFBFBF');
    });

    // Edge cases
    test('handles step values below 0', () => {
        expect(blendColor('FF0000', '0000FF', -100)).toBe('FF0000');
    });

    test('handles step values above 1000', () => {
        expect(blendColor('FF0000', '0000FF', 1100)).toBe('0000FF');
    });

    test('handles same colors', () => {
        expect(blendColor('FF0000', 'FF0000', 500)).toBe('FF0000');
    });

    test('maintains color integrity for complementary colors', () => {
        const result = blendColor('FF0000', '00FF00', 500);
        expect(result).toBe('808000');
    });
});