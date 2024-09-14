import {useState} from "react";
import {DEFAULT_DARK, DEFAULT_LIGHT} from "../../../consts/defaultConsts.ts";

import {randomColor} from "../../helpers/randomColor.ts";
import ChipsInput from "./ChipsInput.tsx";
import StepsInput from "./StepsInput.tsx";

const UserInput = () => {
    const [lightColor, setLightColor] = useState(DEFAULT_LIGHT);
    const [darkColor, setDarkColor] = useState(DEFAULT_DARK);
    const [baseColor, setBaseColor] = useState(randomColor());
    return (
        <>
            <ChipsInput lightColor={lightColor}
                        setLightColor={setLightColor}
                        darkColor={darkColor}
                        setDarkColor={setDarkColor}
                        baseColor={baseColor}
                        setBaseColor={setBaseColor} />
            <hr />
            <StepsInput />
        </>
    );
};

export default UserInput;