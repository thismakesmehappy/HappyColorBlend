import {tokenName} from './tokenName';

describe('tokenName', () => {
    // Test the default behavior (keep spaces, no dashes, keep case)
    test('returns the input string unchanged with default parameters', () => {
        expect(tokenName('Primary Color')).toBe('Primary Color');
        expect(tokenName('Secondary  Color')).toBe('Secondary  Color');
        expect(tokenName('No Spaces')).toBe('No Spaces');
    });

    // Test space treatment options
    describe('space treatment', () => {
        test('keeps spaces when spaceTreatment is "keep"', () => {
            expect(tokenName('Primary Color', 'keep', 'keep')).toBe('Primary Color');
            expect(tokenName('Multiple   Spaces', 'keep', 'keep')).toBe('Multiple   Spaces');
        });

        test('replaces spaces with dashes when spaceTreatment is "dash"', () => {
            expect(tokenName('Primary Color', 'keep', 'dash')).toBe('Primary-Color');
            expect(tokenName('Multiple   Spaces', 'keep', 'dash')).toBe('Multiple---Spaces');
            expect(tokenName('No Spaces Here', 'keep', 'dash')).toBe('No-Spaces-Here');
        });

        test('replaces spaces with underscores when spaceTreatment is "underscore"', () => {
            expect(tokenName('Primary Color', 'keep', 'underscore')).toBe('Primary_Color');
            expect(tokenName('Multiple   Spaces', 'keep', 'underscore')).toBe('Multiple___Spaces');
            expect(tokenName('No Spaces Here', 'keep', 'underscore')).toBe('No_Spaces_Here');
        });

        test('removes spaces when spaceTreatment is "remove"', () => {
            expect(tokenName('Primary Color', 'keep', 'remove')).toBe('PrimaryColor');
            expect(tokenName('Multiple   Spaces', 'keep', 'remove')).toBe('MultipleSpaces');
            expect(tokenName('No Spaces Here', 'keep', 'remove')).toBe('NoSpacesHere');
        });
    });

    // Test leading characters
    describe('leading characters', () => {
        test('adds the specified number of leading dashes by default', () => {
            expect(tokenName('Color', 'keep', 'keep', 1)).toBe('-Color');
            expect(tokenName('Color', 'keep', 'keep', 3)).toBe('---Color');
            expect(tokenName('Color', 'keep', 'dash', 2)).toBe('--Color');
        });

        test('adds the specified number of leading underscores when leadingCharType is "underscore"', () => {
            expect(tokenName('Color', 'keep', 'keep', 1, 'dash', 0, 'underscore')).toBe('_Color');
            expect(tokenName('Color', 'keep', 'keep', 3, 'dash', 0, 'underscore')).toBe('___Color');
            expect(tokenName('Color', 'keep', 'dash', 2, 'dash', 0, 'underscore')).toBe('__Color');
        });

        test('handles zero leading characters', () => {
            expect(tokenName('Color', 'keep', 'keep', 0)).toBe('Color');
        });
    });

    // Test trailing characters
    describe('trailing characters', () => {
        test('adds the specified number of trailing dashes by default', () => {
            expect(tokenName('Color', 'keep', 'keep', 0, 'dash', 1)).toBe('Color-');
            expect(tokenName('Color', 'keep', 'keep', 0, 'dash', 3)).toBe('Color---');
            expect(tokenName('Color', 'keep', 'dash', 0, 'dash', 2)).toBe('Color--');
        });

        test('adds the specified number of trailing underscores when trailingCharType is "underscore"', () => {
            expect(tokenName('Color', 'keep', 'keep', 0, 'underscore', 1, 'dash')).toBe('Color_');
            expect(tokenName('Color', 'keep', 'keep', 0, 'underscore', 3, 'dash')).toBe('Color___');
            expect(tokenName('Color', 'keep', 'dash', 0, 'underscore', 2, 'dash')).toBe('Color__');
        });

        test('handles zero trailing characters', () => {
            expect(tokenName('Color', 'keep', 'keep', 0, 'dash', 0)).toBe('Color');
        });
    });

    // Test case treatment options
    describe('case treatment', () => {
        test('keeps original case when caseTreatment is "keep"', () => {
            expect(tokenName('Primary Color', 'keep', 'keep', 0, 'dash', 0)).toBe('Primary Color');
            expect(tokenName('MiXeD cAsE', 'keep', 'keep', 0, 'dash', 0)).toBe('MiXeD cAsE');
        });

        test('converts to lowercase when caseTreatment is "lower"', () => {
            expect(tokenName('Primary Color', 'lower', 'keep', 0, 'dash', 0)).toBe('primary color');
            expect(tokenName('MiXeD cAsE', 'lower', 'keep', 0, 'dash', 0)).toBe('mixed case');
            expect(tokenName('ALL CAPS', 'lower', 'keep', 0, 'dash', 0)).toBe('all caps');
        });

        test('converts to uppercase when caseTreatment is "upper"', () => {
            expect(tokenName('Primary Color', 'upper', 'keep', 0, 'dash', 0)).toBe('PRIMARY COLOR');
            expect(tokenName('MiXeD cAsE', 'upper', 'keep', 0, 'dash', 0)).toBe('MIXED CASE');
            expect(tokenName('lowercase', 'upper', 'keep', 0, 'dash', 0)).toBe('LOWERCASE');
        });

        test('converts to title case when caseTreatment is "title"', () => {
            expect(tokenName('primary color', 'title', 'keep', 0, 'dash', 0)).toBe('Primary Color');
            expect(tokenName('mixed case example', 'title', 'keep', 0, 'dash', 0)).toBe('Mixed Case Example');
            // Now the implementation should lowercase the rest of the letters
            expect(tokenName('ALL LOWERCASE NOW', 'title', 'keep', 0, 'dash', 0)).toBe('All Lowercase Now');
            // Test with mixed case input
            expect(tokenName('miXeD cAsE tExT', 'title', 'keep', 0, 'dash', 0)).toBe('Mixed Case Text');
        });
    });

    // Test combinations of parameters
    describe('combined parameters', () => {
        test('applies space treatment and adds leading and trailing characters', () => {
            expect(tokenName('Primary Color', 'keep', 'dash', 2, 'dash', 3)).toBe('--Primary-Color---');
            expect(tokenName('Primary Color', 'keep', 'remove', 1, 'dash', 2)).toBe('-PrimaryColor--');
            expect(tokenName('Multiple   Spaces', 'keep', 'dash', 3, 'dash', 1)).toBe('---Multiple---Spaces-');
        });

        test('applies space treatment, characters, and case treatment together', () => {
            expect(tokenName('Primary Color', 'lower', 'dash', 1, 'dash', 1)).toBe('-primary-color-');
            expect(tokenName('mixed case', 'upper', 'remove', 2, 'dash', 0)).toBe('--MIXEDCASE');
            expect(tokenName('all lowercase', 'title', 'dash', 0, 'dash', 2)).toBe('All-Lowercase--');
        });

        test('applies different character types for leading and trailing', () => {
            expect(tokenName('Primary Color', 'upper', 'underscore', 2, 'underscore', 2, 'dash')).toBe('--PRIMARY_COLOR__');
            expect(tokenName('mixed case', 'title', 'dash', 1, 'dash', 1, 'underscore')).toBe('_Mixed-Case-');
        });

        test('handles empty string input', () => {
            expect(tokenName('', 'keep', 'keep')).toBe('');
            expect(tokenName('', 'keep', 'dash', 2, 'dash', 3)).toBe('-----');
            expect(tokenName('', 'upper', 'remove', 1, 'dash', 1)).toBe('--');
            expect(tokenName('', 'keep', 'keep', 2, 'underscore', 2, 'underscore')).toBe('____');
        });
    });

    // Test edge cases
    describe('edge cases', () => {
        test('handles strings with only spaces', () => {
            expect(tokenName('   ', 'keep', 'keep')).toBe('   ');
            expect(tokenName('   ', 'keep', 'dash')).toBe('---');
            expect(tokenName('   ', 'keep', 'underscore')).toBe('___');
            expect(tokenName('   ', 'keep', 'remove')).toBe('');
        });

        test('handles strings with special characters', () => {
            expect(tokenName('Color-123', 'keep', 'keep')).toBe('Color-123');
            expect(tokenName('Color 123', 'keep', 'dash')).toBe('Color-123');
            expect(tokenName('Color 123', 'keep', 'underscore')).toBe('Color_123');
            expect(tokenName('Color 123', 'keep', 'remove')).toBe('Color123');
        });

        test('handles strings with leading/trailing spaces', () => {
            expect(tokenName(' Color ', 'keep', 'keep')).toBe(' Color ');
            expect(tokenName(' Color ', 'keep', 'dash')).toBe('-Color-');
            expect(tokenName(' Color ', 'keep', 'underscore')).toBe('_Color_');
            expect(tokenName(' Color ', 'keep', 'remove')).toBe('Color');
        });

        test('applies case treatment to special characters correctly', () => {
            expect(tokenName('color-123', 'upper', 'keep', 0, 'dash', 0)).toBe('COLOR-123');
            expect(tokenName('COLOR_test', 'lower', 'keep', 0, 'dash', 0)).toBe('color_test');
            // Now only spaces are considered word boundaries for title case
            expect(tokenName('special@chars', 'title', 'keep', 0, 'dash', 0)).toBe('Special@chars');
        });

        test('handles case treatment with multiple word separators', () => {
            // Now only spaces are considered word boundaries for title case
            expect(tokenName('word-with-dashes', 'title', 'keep', 0, 'dash', 0)).toBe('Word-with-dashes');
            expect(tokenName('word_with_underscores', 'title', 'keep', 0, 'dash', 0)).toBe('Word_with_underscores');
            expect(tokenName('word.with.periods', 'title', 'keep', 0, 'dash', 0)).toBe('Word.with.periods');
        });
    });

    // Test order of operations
    describe('order of operations', () => {
        test('applies operations in the correct order: case first, then space treatment, then characters', () => {
            // First case (upper), then space treatment (dash), then leading/trailing characters
            expect(tokenName('test example', 'upper', 'dash', 1, 'dash', 2)).toBe('-TEST-EXAMPLE--');

            // First case (lower), then space treatment (remove), then leading/trailing characters
            expect(tokenName('TEST EXAMPLE', 'lower', 'remove', 2, 'dash', 1)).toBe('--testexample-');

            // First case (title), then space treatment (dash), then leading/trailing characters
            expect(tokenName('test example here', 'title', 'dash', 0, 'dash', 3)).toBe('Test-Example-Here---');

            // With different character types
            expect(tokenName('test example', 'upper', 'underscore', 1, 'dash', 2, 'underscore')).toBe('_TEST_EXAMPLE--');
        });
    });
});
