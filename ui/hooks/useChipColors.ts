import {create} from 'zustand'
import {DEFAULT_DARK, DEFAULT_LIGHT} from "../../consts/defaultConsts.ts";
import {randomColor} from "../helpers/randomColor.ts";

interface ChipsColorStore {
    lightColor: string;
    setLightColor: (lightColor: string) => void;
    darkColor: string;
    setDarkColor: (darkColor: string) => void;
    baseColor: string;
    setBaseColor: (baseColor: string) => void;
}

const useChipColors = create<ChipsColorStore>((set) => ({
    lightColor: DEFAULT_LIGHT,
    setLightColor: (lightColor: string) => {
        set({lightColor: lightColor})
    },
    darkColor: DEFAULT_DARK,
    setDarkColor: (darkColor: string) => {
        set({darkColor: darkColor})
    },
    baseColor: randomColor(),
    setBaseColor: (baseColor: string) => {
        set({baseColor: baseColor})
    },
}))

export default useChipColors;