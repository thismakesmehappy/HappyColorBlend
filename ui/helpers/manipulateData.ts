import {STEPS_MAX_VALUE, STEPS_MIN_VALUE} from "../../consts/valueConsts.ts";

export const commaSeparatedToListOfNumbers = (commaSeparated: string) => {
    const list = commaSeparated.split(",");
    const listNumber = list.filter(str => !isNaN(Number(str)))
        .map(str => Number(str))
        .filter(num => num >= STEPS_MIN_VALUE && num <= STEPS_MAX_VALUE);
    listNumber.sort((a, b) => a - b);
    return listNumber;
}