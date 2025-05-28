import {create} from 'zustand';
import {MINIMUM_STEPS} from "../../constants/uiConstants";
import {blendColor} from "../helpers/colorMethods";

// Function to build swatches based on parameters
export const buildNewSwatches = (
    dark: SwatchStoreInputSwatch,
    light: SwatchStoreInputSwatch,
    bases: SwatchStoreInputSwatch[],
    steps: number[],
    customSteps: Set<number>,
    includeDarkLight: boolean
) => {
    const combinedSteps = new Set([...steps, ...customSteps].sort((a, b) => a - b));
    const swatches: SwatchStoreSwatches[] = [];

    for (let base in bases) {
        const swatch: SwatchStoreSwatches = {
            base: bases[base],
            swatches: []
        };


        for (let step of combinedSteps) {
            swatch.swatches.push({color: blendColor(dark.color, light.color, bases[base].color, step), step: step});
        }

        swatches.push(swatch);
    }

    // Stub implementation - will be expanded later
    console.log("buildSwatches called with:", {dark, light, bases, steps, customSteps, includeDarkLight});
    console.log(swatches)
    return swatches;
};


export interface SwatchStoreInputSwatch {
    color: string;
    name: string;
    id?: string;
}

interface SwatchStoreSwatch {
    color: string;
    step: number;
}

interface SwatchStoreSwatches {
    base: SwatchStoreInputSwatch;
    swatches: SwatchStoreSwatch[];
}

// Define the store state interface
interface SwatchStoreState {
    // State properties
    dark: SwatchStoreInputSwatch;
    light: SwatchStoreInputSwatch;
    bases: SwatchStoreInputSwatch[];
    swatches: SwatchStoreSwatches[];
    numberOfSteps: number;
    steps: number[];
    customSteps: Set<number>;
    includeDarkLight: boolean;

    // Getters
    getDark: () => SwatchStoreInputSwatch;
    getLight: () => SwatchStoreInputSwatch;
    getBases: () => SwatchStoreInputSwatch[];
    getSwatches: () => SwatchStoreSwatches[];
    getNumberOfSteps: () => number;
    getCustomSteps: () => Set<number>;
    getIncludeDarkLight: () => boolean;

    // Setters
    setDark: (dark: SwatchStoreInputSwatch) => void;
    setLight: (dark: SwatchStoreInputSwatch) => void;
    increaseSteps: () => void;
    decreaseSteps: () => void;
    setSteps: (steps: number) => void;
    addBase: (base: SwatchStoreInputSwatch) => void;
    updateBase: (id: string, color: string, name: string) => void;
    removeBase: (id: string) => void;
    flipIncludeDarkLight: () => void;
    createSteps: () => number[];
    addCustomStep: (step: number) => void;
    removeCustomStep: (step: number) => void;
    buildSwatches: () => SwatchStoreSwatches[];
}

// Create the store
const useSwatchStore = create<SwatchStoreState>((set, get) => ({
    // Initial state
    dark: {color: "000000", name: "Black", id: "dark"},
    light: {color: "FFFFFF", name: "White", id: "light"},
    bases: [],
    swatches: [],
    numberOfSteps: 3,
    steps: [],
    customSteps: new Set<number>(),
    includeDarkLight: true,

    // Getters
    getDark: () => get().dark,
    getLight: () => get().light,
    getBases: () => get().bases,
    getSwatches: () => get().swatches,
    getNumberOfSteps: () => get().numberOfSteps,
    getCustomSteps: () => get().customSteps,
    getIncludeDarkLight: () => get().includeDarkLight,

    // Setters
    setDark: (dark: SwatchStoreInputSwatch) => set({dark}),
    setLight: (light: SwatchStoreInputSwatch) => set({light}),
    increaseSteps: () => {
        set((state) => ({numberOfSteps: state.numberOfSteps + 2}));
        get().createSteps();
    },
    decreaseSteps: () => {
        if (get().numberOfSteps > MINIMUM_STEPS) {
            set((state) => ({numberOfSteps: state.numberOfSteps - 2}));
            get().createSteps();
        }
    },
    setSteps: (steps: number) => {
        set({numberOfSteps: steps});
        get().createSteps();
    },
    addBase: (base: SwatchStoreInputSwatch) => set((state) => ({bases: [...state.bases, base]})),
    updateBase: (id: string, color: string, name: string) => set((state) => ({
        bases: state.bases.map((b) => {
            if (b.id === id) {
                console.log("updated id " + id);
                return {color: color, name: name, id: id};
            }
            return b;
        })
    })),
    removeBase: (id: string) => set((state) => ({bases: state.bases.filter((b) => b.id !== id)})),
    createSteps: () => {
        const state = get();
        const {numberOfSteps, includeDarkLight} = state;
        let steps: number[] = [];

        if (includeDarkLight) {
            // Calculate steps including 0 and 1000
            for (let i = 0; i <= numberOfSteps + 1; i++) {
                const step = Math.round((i * 1000) / (numberOfSteps + 1));
                steps.push(step);
            }
        } else {
            // Calculate steps excluding 0 and 1000
            for (let i = 1; i <= numberOfSteps; i++) {
                const step = Math.round((i * 1000) / (numberOfSteps + 1));
                steps.push(step);
            }
        }

        set({steps});
        return steps;
    },
    flipIncludeDarkLight: () => {
        set((state) => ({includeDarkLight: !state.includeDarkLight}));
        get().createSteps();
    },

    addCustomStep: (step: number) => {
        set((state) => {
            const newCustomSteps = new Set(state.customSteps);
            newCustomSteps.add(step);
            return {customSteps: newCustomSteps};
        });
    },
    removeCustomStep: (step: number) => {
        set((state) => {
            const newCustomSteps = new Set(state.customSteps);
            newCustomSteps.delete(step);
            return {customSteps: newCustomSteps};
        });
    },

    buildSwatches: () => {
        const state = get();
        const newSwatches = buildNewSwatches(
            state.dark,
            state.light,
            state.bases,
            state.steps,
            state.customSteps,
            state.includeDarkLight
        );

        // Update the swatches in the store
        set({ swatches: newSwatches });

        return newSwatches;
    }
}));


// Initialize steps array
useSwatchStore.getState().createSteps();

export default useSwatchStore;
