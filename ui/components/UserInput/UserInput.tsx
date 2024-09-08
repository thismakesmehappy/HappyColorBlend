import {useState} from "react";
import {DEFAULT_DARK, DEFAULT_LIGHT} from "../../../consts/defaultValues.ts";
import {randomColor} from "../../helpers/randomColor.ts";
import UserInputChip from "./UserInputChip.tsx";
import '../../styles/index.scss';
import {isValidHex} from "../../helpers/convertColorModes.ts";

const UserInput = () => {
    const [lightColor, setLightColor] = useState(DEFAULT_LIGHT);
    const [darkColor, setDarkColor] = useState(DEFAULT_DARK);
    const [baseColor, setBaseColor] = useState(randomColor());

    return (
        <>
            <div className={'row mb-1'}>
                <div className={'col'}>
                    <UserInputChip name="light-color"
                                   label="Lightest Tint"
                                   stepValue={0}
                                   value={lightColor}
                                   setValue={setLightColor}
                                   defaultValue={DEFAULT_LIGHT}
                    />
                </div>
                <div className={'col'}>
                    <UserInputChip name="base-color"
                                   label="Base Color"
                                   stepValue={500}
                                   value={baseColor}
                                   setValue={setBaseColor}
                    />
                </div>
                <div className={'col mb-0'}>
                    <UserInputChip name="light-color"
                                   label="DarkestShade"
                                   stepValue={1000}
                                   value={darkColor}
                                   setValue={setDarkColor}
                                   defaultValue={DEFAULT_DARK}
                    />
                </div>
            </div>
            <div className={'row mb-0'}>
                {(!isValidHex(baseColor) || !isValidHex(lightColor) || !isValidHex(darkColor)) &&
                    <p className={'text-danger small mb-1'}>Color values should be valid hex colors (six characters, 0 - 9 or a - f); please omit the #</p>}
            </div>
        </>
    );
};

export default UserInput;