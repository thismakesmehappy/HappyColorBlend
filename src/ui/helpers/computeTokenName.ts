export type SpaceTreatment = 'keep' | 'dash' | 'underscore' | 'remove';
export type CaseTreatment = 'lower' | 'upper' | 'title' | 'keep';
export type CharType = 'dash' | 'underscore';

const treatSpace = (input: string, spaceTreatment: SpaceTreatment) => {
    switch (spaceTreatment) {
        case 'dash':
            return input.replace(/\s/g, '-');
        case 'underscore':
            return input.replace(/\s/g, '_');
        case 'remove':
            return input.replace(/\s/g, '');
        default:
            return input;
    }
}

const treatCase = (input: string, casing: CaseTreatment) => {
    switch (casing) {
        case 'lower':
            return input.toLowerCase();
        case 'upper':
            return input.toUpperCase();
        case 'title':
            // First lowercase the entire string, then capitalize the first letter of each word
            // Only consider spaces as word boundaries
            return input.toLowerCase().replace(/(?:^|\s)(\w)/g, (match, char) => {
                return match.replace(char, char.toUpperCase());
            });
        default:
            return input;
    }
}

const addLeadingChars = (input: string, count: number, charType: CharType = 'dash') => {
    const char = charType === 'dash' ? '-' : '_';
    const chars = char.repeat(count);
    return chars + input;
}

const addTrailingChars = (input: string, count: number, charType: CharType = 'dash') => {
    const char = charType === 'dash' ? '-' : '_';
    const chars = char.repeat(count);
    return input + chars;
}

export const computeTokenName = (
    input: string,
    caseTreatment: CaseTreatment = 'keep',
    spaceTreatment: SpaceTreatment = 'keep',
    leadingCharsCount: number = 0,
    trailingCharsCount: number = 0,
    leadingCharType: CharType = 'dash',
    trailingCharType: CharType = 'dash'
) => {
    // First change the casing
    const casing = treatCase(input, caseTreatment);
    // Then treat spaces
    const treatedInput = treatSpace(casing, spaceTreatment);
    // Then add leading and trailing characters
    const leading = addLeadingChars(treatedInput, leadingCharsCount, leadingCharType);
    const trailing = addTrailingChars(leading, trailingCharsCount, trailingCharType);
    return trailing;
}