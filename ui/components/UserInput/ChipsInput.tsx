import ChipInput from "./ChipInput.tsx";
import {DEFAULT_DARK, DEFAULT_LIGHT} from "../../../consts/defaultConsts.ts";
import {isValidHex} from "../../helpers/convertColorModes.ts";
import useChipColors from "../../hooks/useChipColors.ts";
import {useEffect, useState} from "react";
import {randomColor} from "../../helpers/randomColor.ts";

const ChipsInput = () => {
    const {setLightColor, setBaseColor, setDarkColor} = useChipColors();
    const [lightColorCheck, setLightColorCheck] = useState(DEFAULT_LIGHT);
    const [baseColorCheck, setBaseColorCheck] = useState(randomColor());
    const [darkColorCheck, setDarkColorCheck] = useState(DEFAULT_DARK);

    useEffect(() => {
        if (isValidHex(lightColorCheck))
            setLightColor(lightColorCheck);
    }, [lightColorCheck])

    useEffect(() => {
        if (isValidHex(baseColorCheck))
            setBaseColor(baseColorCheck)
    }, [baseColorCheck])

    useEffect(() => {
        if (isValidHex(darkColorCheck))
            setDarkColor(darkColorCheck)
    }, [darkColorCheck])
    return (
        <div className={"vstack gap-1 mb-0"}>
            <div className={'row'}>
                <div className={'col'}>
                    <ChipInput name="light-color"
                               label="Lightest Tint"
                               stepValue={0}
                               value={lightColorCheck}
                               setValue={setLightColorCheck}
                               defaultValue={DEFAULT_LIGHT}
                    />
                </div>
                <div className={'col'}>
                    <ChipInput name="base-color"
                               label="Base Color"
                               stepValue={500}
                               value={baseColorCheck}
                               setValue={setBaseColorCheck}
                    />
                </div>
                <div className={'col'}>
                    <ChipInput name="dark-color"
                               label="Darkest Shade"
                               stepValue={1000}
                               value={darkColorCheck}
                               setValue={setDarkColorCheck}
                               defaultValue={DEFAULT_DARK}
                    />
                </div>
            </div>
            <div className={'row'}>
                {(!isValidHex(baseColorCheck) || !isValidHex(lightColorCheck) || !isValidHex(darkColorCheck)) &&
                    <p className={'text-danger small mb-1'}>Color values should be valid hex colors (six characters, 0 - 9 or a - f); please omit the #</p>}
            </div>
        </div>
    );
};

export default ChipsInput