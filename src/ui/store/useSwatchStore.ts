import {create} from 'zustand';
import {MINIMUM_STEPS} from "../../constants/uiConstants";
import {blendColor} from "../helpers/colorMethods";
import {persist, createJSONStorage} from 'zustand/middleware'

// Function to build swatches based on parameters
export const buildNewSwatches = (
    shade: SwatchStoreInputSwatch,
    tint: SwatchStoreInputSwatch,
    bases: SwatchStoreInputSwatch[],
    steps: number[],
    customSteps: Set<number>,
    includeShadeTint: boolean
) => {
    const combinedSteps = new Set([...steps, ...customSteps].sort((a, b) => a - b));
    const swatches: SwatchStoreSwatches[] = [];

    for (let base in bases) {
        const swatch: SwatchStoreSwatches = {
            base: bases[base],
            swatches: []
        };


        for (let step of combinedSteps) {
            swatch.swatches.push({color: blendColor(shade.color, tint.color, bases[base].color, step), step: step});
        }

        swatches.push(swatch);
    }

    // Stub implementation - will be expanded later
    console.log("buildSwatches called with:", {shade, tint, bases, steps, customSteps, includeShadeTint});
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
    shade: SwatchStoreInputSwatch;
    tint: SwatchStoreInputSwatch;
    bases: SwatchStoreInputSwatch[];
    swatches: SwatchStoreSwatches[];
    numberOfSteps: number;
    steps: number[];
    customSteps: Set<number>;
    includeShadeTint: boolean;

    // Getters
    getShade: () => SwatchStoreInputSwatch;
    getTint: () => SwatchStoreInputSwatch;
    getBases: () => SwatchStoreInputSwatch[];
    getSwatches: () => SwatchStoreSwatches[];
    getNumberOfSteps: () => number;
    getCustomSteps: () => Set<number>;
    getIncludeShadeTint: () => boolean;

    // Setters
    setShade: (shade: SwatchStoreInputSwatch) => void;
    setTint: (tint: SwatchStoreInputSwatch) => void;
    increaseSteps: () => void;
    decreaseSteps: () => void;
    setSteps: (steps: number) => void;
    addBase: (base: SwatchStoreInputSwatch) => void;
    updateBase: (id: string, color: string, name: string) => void;
    removeBase: (id: string) => void;
    flipIncludeShadeTint: () => void;
    createSteps: () => number[];
    addCustomStep: (step: number) => void;
    removeCustomStep: (step: number) => void;
    buildSwatches: () => SwatchStoreSwatches[];
}

// Create the store
const useSwatchStore = create<SwatchStoreState>()(
  persist(
    (set, get) => ({
    // Initial state
    shade: {color: "000000", name: "Black", id: "shade"},
    tint: {color: "FFFFFF", name: "White", id: "tint"},
    bases: [],
    swatches: [],
    numberOfSteps: 3,
    steps: [],
    customSteps: new Set<number>(),
    includeShadeTint: true,

    // Getters
    getShade: () => get().shade,
    getTint: () => get().tint,
    getBases: () => get().bases,
    getSwatches: () => get().swatches,
    getNumberOfSteps: () => get().numberOfSteps,
    getCustomSteps: () => get().customSteps,
    getIncludeShadeTint: () => get().includeShadeTint,

    // Setters
    setShade: (shade: SwatchStoreInputSwatch) => set({shade}),
    setTint: (tint: SwatchStoreInputSwatch) => set({tint}),
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
        const {numberOfSteps, includeShadeTint} = state;
        let steps: number[] = [];

        if (includeShadeTint) {
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
    flipIncludeShadeTint: () => {
        set((state) => ({includeShadeTint: !state.includeShadeTint}));
        get().createSteps();
    },

    addCustomStep: (step: number) => {
        set((state) => {
            const customSteps = Array.from(state.customSteps);
            customSteps.push(step);
            customSteps.sort((a, b) => a - b)
            return {customSteps: new Set(customSteps)};
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
            state.shade,
            state.tint,
            state.bases,
            state.steps,
            state.customSteps,
            state.includeShadeTint
        );

        // Update the swatches in the store
        set({swatches: newSwatches});

        return newSwatches;
    }
}), {
    name: 'swatches-storage',
    storage: createJSONStorage(() => localStorage),
    partialize: (state) => ({
        ...state,
        customSteps: Array.from(state.customSteps)
    }),
    onRehydrateStorage: (state) => {
        return (rehydratedState, error) => {
            if (error) {
                console.error('Error rehydrating swatches storage:', error);
            } else if (rehydratedState) {
                // Convert the array back to a Set
                if (Array.isArray(rehydratedState.customSteps)) {
                    rehydratedState.customSteps = new Set(rehydratedState.customSteps);
                }
            }
        };
    }
}));


// Initialize steps array
useSwatchStore.getState().createSteps();

export default useSwatchStore;
