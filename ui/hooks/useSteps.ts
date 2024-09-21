import {create} from 'zustand'
import {commaSeparatedToListOfNumbers} from "../helpers/manipulateData.ts";
import {PRESETS} from "../../consts/valueConsts.ts";

interface StepsStore {
    steps: number[];
    addSteps: (stepList: string) => void;
    addStep: (step: number) => void;
    removeStep: (step: number) => void;
}

const useStepsStore = create<StepsStore>((set) => ({
    steps: commaSeparatedToListOfNumbers(PRESETS[0].values),
    addSteps: (stepList: string) => {
        set((state) => {
            const newSteps = commaSeparatedToListOfNumbers(stepList);
            newSteps.push(...state.steps);
            return {steps: [...new Set(newSteps)].sort((a, b) => a - b)};
        });
    },
    addStep: (step: number) => {
        set((state) => {
            const newSteps = [...state.steps];
            newSteps.push(step);
            return {steps: [... new Set(newSteps)].sort((a, b) => a - b)};
        });
    },
    removeStep: (step: number) => {
        set((state) => {
            const newSteps = new Set(state.steps);
            newSteps.delete(step);
            return {steps: [...newSteps].sort((a, b) => a - b)};
        });
    },
}))

export default useStepsStore;