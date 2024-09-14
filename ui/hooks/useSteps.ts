import {create} from 'zustand'
import {PRESETS} from "../../consts/valueConsts.ts";
import {commaSeparatedToListOfNumbers} from "../helpers/manipulateData.ts";

interface StepsStore {
    steps: string;
    stepsArray: number[];
    setSteps: (steps: string) => void;
    setStepsClean: (steps: string) => void;
}

const useStepsStore = create<StepsStore>((set) => ({
    steps: PRESETS[0].values,
    stepsArray: commaSeparatedToListOfNumbers(PRESETS[0].values),
    setSteps: (steps: string) => set({steps: steps}),
    setStepsClean: (steps: string) => {
        const stepsArray = commaSeparatedToListOfNumbers(steps);
        set({steps: stepsArray.join(", ")})
        set({stepsArray: stepsArray})
        console.log(stepsArray);
    }
}))

export default useStepsStore;