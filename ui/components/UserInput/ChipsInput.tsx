import ChipInput from "./ChipInput.tsx";
import {DEFAULT_DARK, DEFAULT_LIGHT} from "../../../consts/defaultConsts.ts";
import {isValidHex} from "../../helpers/convertColorModes.ts";
import useChipColors from "../../hooks/useChipColors.ts";

const ChipsInput = () => {
    const {lightColor, setLightColor, darkColor, setDarkColor, baseColor, setBaseColor} = useChipColors();
    return (
        <div className={"vstack gap-1 mb-0"}>
            <div className={'row'}>
                <div className={'col'}>
                    <ChipInput name="light-color"
                               label="Lightest Tint"
                               stepValue={0}
                               value={lightColor}
                               setValue={setLightColor}
                               defaultValue={DEFAULT_LIGHT}
                    />
                </div>
                <div className={'col'}>
                    <ChipInput name="base-color"
                               label="Base Color"
                               stepValue={500}
                               value={baseColor}
                               setValue={setBaseColor}
                    />
                </div>
                <div className={'col'}>
                    <ChipInput name="dark-color"
                               label="DarkestShade"
                               stepValue={1000}
                               value={darkColor}
                               setValue={setDarkColor}
                               defaultValue={DEFAULT_DARK}
                    />
                </div>
            </div>
            <div className={'row'}>
                {(!isValidHex(baseColor) || !isValidHex(lightColor) || !isValidHex(darkColor)) &&
                    <p className={'text-danger small mb-1'}>Color values should be valid hex colors (six characters, 0 - 9 or a - f); please omit the #</p>}
            </div>
        </div>
    );
};

export default ChipsInput