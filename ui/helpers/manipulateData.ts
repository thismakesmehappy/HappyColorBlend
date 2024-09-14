export const commaSeparatedToListOfNumbers = (commaSeparated: string) => {
    const list = commaSeparated.split(",");
    return list.filter(str => !isNaN(Number(str)))
        .map(str => Number(str));
}