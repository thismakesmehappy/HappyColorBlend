type spaceTreatment = 'keep' | 'dash' | 'underscore' | 'remove';
type caseTreatment = 'lower' | 'upper' | 'title' | 'keep';
type charType = 'dash' | 'underscore';

const treatSpace = (input: string, spaceTreatment: spaceTreatment) => {
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

const treatCase = (input: string, casing: caseTreatment) => {
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

const addLeadingChars = (input: string, count: number, charType: charType = 'dash') => {
    const char = charType === 'dash' ? '-' : '_';
    const chars = char.repeat(count);
    return chars + input;
}

const addTrailingChars = (input: string, count: number, charType: charType = 'dash') => {
    const char = charType === 'dash' ? '-' : '_';
    const chars = char.repeat(count);
    return input + chars;
}

export const tokenName = (
    input: string,
    caseTreatment: caseTreatment = 'keep',
    spaceTreatment: spaceTreatment = 'keep',
    leadingCharsCount: number = 0,
    trailingCharType: charType = 'dash',
    trailingCharsCount: number = 0,
    leadingCharType: charType = 'dash'
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