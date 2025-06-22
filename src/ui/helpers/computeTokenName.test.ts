import {computeTokenName} from './computeTokenName';

describe('tokenName', () => {
    // Test the default behavior (keep spaces, no dashes, keep case)
    test('returns the input string unchanged with default parameters', () => {
        expect(computeTokenName('Primary Color')).toBe('Primary Color');
        expect(computeTokenName('Secondary  Color')).toBe('Secondary  Color');
        expect(computeTokenName('No Spaces')).toBe('No Spaces');
    });

    // Test space treatment options
    describe('space treatment', () => {
        test('keeps spaces when spaceTreatment is "keep"', () => {
            expect(computeTokenName('Primary Color', 'keep', 'keep')).toBe('Primary Color');
            expect(computeTokenName('Multiple   Spaces', 'keep', 'keep')).toBe('Multiple   Spaces');
        });

        test('replaces spaces with dashes when spaceTreatment is "dash"', () => {
            expect(computeTokenName('Primary Color', 'keep', 'dash')).toBe('Primary-Color');
            expect(computeTokenName('Multiple   Spaces', 'keep', 'dash')).toBe('Multiple---Spaces');
            expect(computeTokenName('No Spaces Here', 'keep', 'dash')).toBe('No-Spaces-Here');
        });

        test('replaces spaces with underscores when spaceTreatment is "underscore"', () => {
            expect(computeTokenName('Primary Color', 'keep', 'underscore')).toBe('Primary_Color');
            expect(computeTokenName('Multiple   Spaces', 'keep', 'underscore')).toBe('Multiple___Spaces');
            expect(computeTokenName('No Spaces Here', 'keep', 'underscore')).toBe('No_Spaces_Here');
        });

        test('removes spaces when spaceTreatment is "remove"', () => {
            expect(computeTokenName('Primary Color', 'keep', 'remove')).toBe('PrimaryColor');
            expect(computeTokenName('Multiple   Spaces', 'keep', 'remove')).toBe('MultipleSpaces');
            expect(computeTokenName('No Spaces Here', 'keep', 'remove')).toBe('NoSpacesHere');
        });
    });

    // Test leading characters
    describe('leading characters', () => {
        test('adds the specified number of leading dashes by default', () => {
            expect(computeTokenName('Color', 'keep', 'keep', 1)).toBe('-Color');
            expect(computeTokenName('Color', 'keep', 'keep', 3)).toBe('---Color');
            expect(computeTokenName('Color', 'keep', 'dash', 2)).toBe('--Color');
        });

        test('adds the specified number of leading underscores when leadingCharType is "underscore"', () => {
            expect(computeTokenName('Color', 'keep', 'keep', 1, 0, 'underscore')).toBe('_Color');
            expect(computeTokenName('Color', 'keep', 'keep', 3, 0, 'underscore')).toBe('___Color');
            expect(computeTokenName('Color', 'keep', 'dash', 2, 0, 'underscore')).toBe('__Color');
        });

        test('handles zero leading characters', () => {
            expect(computeTokenName('Color', 'keep', 'keep', 0)).toBe('Color');
        });
    });

    // Test trailing characters
    describe('trailing characters', () => {
        test('adds the specified number of trailing dashes by default', () => {
            expect(computeTokenName('Color', 'keep', 'keep', 0, 1)).toBe('Color-');
            expect(computeTokenName('Color', 'keep', 'keep', 0, 3)).toBe('Color---');
            expect(computeTokenName('Color', 'keep', 'dash', 0, 2)).toBe('Color--');
        });

        test('adds the specified number of trailing underscores when trailingCharType is "underscore"', () => {
            expect(computeTokenName('Color', 'keep', 'keep', 0, 1, 'dash', 'underscore')).toBe('Color_');
            expect(computeTokenName('Color', 'keep', 'keep', 0, 3, 'dash', 'underscore')).toBe('Color___');
            expect(computeTokenName('Color', 'keep', 'dash', 0, 2, 'dash', 'underscore')).toBe('Color__');
        });

        test('handles zero trailing characters', () => {
            expect(computeTokenName('Color', 'keep', 'keep', 0, 0)).toBe('Color');
        });
    });

    // Test case treatment options
    describe('case treatment', () => {
        test('keeps original case when caseTreatment is "keep"', () => {
            expect(computeTokenName('Primary Color', 'keep', 'keep')).toBe('Primary Color');
            expect(computeTokenName('MiXeD cAsE', 'keep', 'keep')).toBe('MiXeD cAsE');
        });

        test('converts to lowercase when caseTreatment is "lower"', () => {
            expect(computeTokenName('Primary Color', 'lower', 'keep')).toBe('primary color');
            expect(computeTokenName('MiXeD cAsE', 'lower', 'keep')).toBe('mixed case');
            expect(computeTokenName('ALL CAPS', 'lower', 'keep')).toBe('all caps');
        });

        test('converts to uppercase when caseTreatment is "upper"', () => {
            expect(computeTokenName('Primary Color', 'upper', 'keep')).toBe('PRIMARY COLOR');
            expect(computeTokenName('MiXeD cAsE', 'upper', 'keep')).toBe('MIXED CASE');
            expect(computeTokenName('lowercase', 'upper', 'keep')).toBe('LOWERCASE');
        });

        test('converts to title case when caseTreatment is "title"', () => {
            expect(computeTokenName('primary color', 'title', 'keep')).toBe('Primary Color');
            expect(computeTokenName('mixed case example', 'title', 'keep')).toBe('Mixed Case Example');
            // Now the implementation should lowercase the rest of the letters
            expect(computeTokenName('ALL LOWERCASE NOW', 'title', 'keep')).toBe('All Lowercase Now');
            // Test with mixed case input
            expect(computeTokenName('miXeD cAsE tExT', 'title', 'keep')).toBe('Mixed Case Text');
        });
    });

    // Test combinations of parameters
    describe('combined parameters', () => {
        test('applies space treatment and adds leading and trailing characters', () => {
            expect(computeTokenName('Primary Color', 'keep', 'dash', 2, 3)).toBe('--Primary-Color---');
            expect(computeTokenName('Primary Color', 'keep', 'remove', 1, 2)).toBe('-PrimaryColor--');
            expect(computeTokenName('Multiple   Spaces', 'keep', 'dash', 3, 1)).toBe('---Multiple---Spaces-');
        });

        test('applies space treatment, characters, and case treatment together', () => {
            expect(computeTokenName('Primary Color', 'lower', 'dash', 1, 1)).toBe('-primary-color-');
            expect(computeTokenName('mixed case', 'upper', 'remove', 2, 0)).toBe('--MIXEDCASE');
            expect(computeTokenName('all lowercase', 'title', 'dash', 0, 2)).toBe('All-Lowercase--');
        });

        test('applies different character types for leading and trailing', () => {
            expect(computeTokenName('Primary Color', 'upper', 'underscore', 2, 2, 'dash', 'underscore')).toBe('--PRIMARY_COLOR__');
            expect(computeTokenName('mixed case', 'title', 'dash', 1, 1, 'underscore', 'dash')).toBe('_Mixed-Case-');
        });

        test('handles empty string input', () => {
            expect(computeTokenName('')).toBe('');
            expect(computeTokenName('', 'keep', 'dash', 2, 3)).toBe('-----');
            expect(computeTokenName('', 'upper', 'remove', 1, 1)).toBe('--');
            expect(computeTokenName('', 'keep', 'keep', 2, 2, 'underscore', 'underscore')).toBe('____');
        });
    });

    // Test edge cases
    describe('edge cases', () => {
        test('handles strings with only spaces', () => {
            expect(computeTokenName('   ', 'keep', 'keep')).toBe('   ');
            expect(computeTokenName('   ', 'keep', 'dash')).toBe('---');
            expect(computeTokenName('   ', 'keep', 'underscore')).toBe('___');
            expect(computeTokenName('   ', 'keep', 'remove')).toBe('');
        });

        test('handles strings with special characters', () => {
            expect(computeTokenName('Color-123', 'keep', 'keep')).toBe('Color-123');
            expect(computeTokenName('Color 123', 'keep', 'dash')).toBe('Color-123');
            expect(computeTokenName('Color 123', 'keep', 'underscore')).toBe('Color_123');
            expect(computeTokenName('Color 123', 'keep', 'remove')).toBe('Color123');
        });

        test('handles strings with leading/trailing spaces', () => {
            expect(computeTokenName(' Color ', 'keep', 'keep')).toBe(' Color ');
            expect(computeTokenName(' Color ', 'keep', 'dash')).toBe('-Color-');
            expect(computeTokenName(' Color ', 'keep', 'underscore')).toBe('_Color_');
            expect(computeTokenName(' Color ', 'keep', 'remove')).toBe('Color');
        });

        test('applies case treatment to special characters correctly', () => {
            expect(computeTokenName('color-123', 'upper', 'keep')).toBe('COLOR-123');
            expect(computeTokenName('COLOR_test', 'lower', 'keep')).toBe('color_test');
            // Now only spaces are considered word boundaries for title case
            expect(computeTokenName('special@chars', 'title', 'keep')).toBe('Special@chars');
        });

        test('handles case treatment with multiple word separators', () => {
            // Now only spaces are considered word boundaries for title case
            expect(computeTokenName('word-with-dashes', 'title', 'keep')).toBe('Word-with-dashes');
            expect(computeTokenName('word_with_underscores', 'title', 'keep')).toBe('Word_with_underscores');
            expect(computeTokenName('word.with.periods', 'title', 'keep')).toBe('Word.with.periods');
        });
    });

    // Test order of operations
    describe('order of operations', () => {
        test('applies operations in the correct order: case first, then space treatment, then characters', () => {
            // First case (upper), then space treatment (dash), then leading/trailing characters
            expect(computeTokenName('test example', 'upper', 'dash', 1, 2)).toBe('-TEST-EXAMPLE--');

            // First case (lower), then space treatment (remove), then leading/trailing characters
            expect(computeTokenName('TEST EXAMPLE', 'lower', 'remove', 2, 1)).toBe('--testexample-');

            // First case (title), then space treatment (dash), then leading/trailing characters
            expect(computeTokenName('test example here', 'title', 'dash', 0, 3)).toBe('Test-Example-Here---');

            // With different character types
            expect(computeTokenName('test example', 'upper', 'underscore', 1, 2, 'underscore', 'dash')).toBe('_TEST_EXAMPLE--');
        });
    });
});
