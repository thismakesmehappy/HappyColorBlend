import {create} from 'zustand';
import {MINIMUM_STEPS} from "../../constants/uiConstants";
import {blendPrimaryColor} from "../helpers/colorMethods";
import steps from "../components/Steps";

export const initialState = {
    shade: {color: "000000", name: "Black", id: "shade"},
    tint: {color: "FFFFFF", name: "White", id: "tint"},
    primaryColors: [],
    swatches: [],
    numberOfSteps: 9,
    steps: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    customSteps: new Set<number>([50, 950]),
    combinedSteps: new Set<number>(),
}
// Function to build swatches based on parameters
export const buildNewSwatches = (
    shade: SwatchStoreInputSwatch,
    tint: SwatchStoreInputSwatch,
    primaryColors: SwatchStoreInputSwatch[],
    state: SwatchStoreState,
) => {
    state.setCombinedSteps();
    const combinedSteps = state.getCombinedSteps();
    const swatches: SwatchStoreSwatches[] = [];

    for (let primary in primaryColors) {
        const swatch: SwatchStoreSwatches = {
            base: primaryColors[primary],
            swatches: []
        };


        for (let step of combinedSteps) {
            swatch.swatches.push({
                color: blendPrimaryColor(shade.color, tint.color, primaryColors[primary].color, step),
                step: step
            });
        }

        swatches.push(swatch);
    }

    // Stub implementation - will be expanded later
    return swatches;
};


export interface SwatchStoreInputSwatch {
    color: string;
    name: string;
    id?: string;
}

export interface SwatchStoreSwatch {
    color: string;
    step: number;
}

export interface SwatchStoreSwatches {
    base: SwatchStoreInputSwatch;
    swatches: SwatchStoreSwatch[];
}

// Define the store state interface
interface SwatchStoreState {
    // State properties
    shade: SwatchStoreInputSwatch;
    tint: SwatchStoreInputSwatch;
    primaryColors: SwatchStoreInputSwatch[];
    swatches: SwatchStoreSwatches[];
    numberOfSteps: number;
    steps: number[];
    customSteps: Set<number>;
    combinedSteps: Set<number>;

    // Getters
    getShade: () => SwatchStoreInputSwatch;
    getTint: () => SwatchStoreInputSwatch;
    getPrimaryColors: () => SwatchStoreInputSwatch[];
    getSwatches: () => SwatchStoreSwatches[];
    getNumberOfSteps: () => number;
    getCustomSteps: () => Set<number>;
    getTotalUniqueSteps: () => number;
    getCombinedSteps: () => Set<number>;
    getSteps: () => number[];

    // Setters
    setShade: (color: string, name: string) => void;
    setTint: (color: string, name: string) => void;
    increaseSteps: () => void;
    decreaseSteps: () => void;
    setSteps: (steps: number) => void;
    setNumberOfSteps: (numberOfSteps: number) => void;
    setCombinedSteps: () => void;
    addPrimaryColor: (primaryColor: SwatchStoreInputSwatch) => void;
    updatePrimaryColor: (id: string, color: string, name: string) => void;
    removePrimaryColor: (id: string) => void;
    createSteps: () => number[];
    addCustomStep: (step: number) => void;
    removeCustomStep: (step: number) => void;
    buildSwatches: () => SwatchStoreSwatches[];
}


// Create the store
const useSwatchStore = create<SwatchStoreState>()(
    // persist(
    (set, get) => ({
        // Initial state
        ...initialState,

        // Getters
        getShade: () => get().shade,
        getTint: () => get().tint,
        getPrimaryColors: () => get().primaryColors,
        getSwatches: () => get().swatches,
        getNumberOfSteps: () => get().numberOfSteps,
        getCustomSteps: () => get().customSteps,
        getTotalUniqueSteps: () => get().combinedSteps.size,
        getCombinedSteps: () => get().combinedSteps,
        getSteps: () => get().steps,
        setCombinedSteps: () => {
            const {steps, customSteps} = get();
            set({combinedSteps: new Set([...steps, ...customSteps].sort((a, b) => a - b))});
        },

        // Setters
        setShade: (color: string, name: string) => {
            const colorUpper = color.toUpperCase();
            set({
                shade: {
                    color: colorUpper,
                    name: name,
                }
            })
        },
        setTint: (color: string, name: string) => {
            const colorUpper = color.toUpperCase()
            set({
                tint: {
                    color: colorUpper,
                    name: name,
                }
            })
        },
        setNumberOfSteps: (steps) => {
            set({numberOfSteps: steps});
            get().createSteps();
        },
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
        addPrimaryColor: (primaryColor: SwatchStoreInputSwatch) => set((state) => ({primaryColors: [...state.primaryColors, primaryColor]})),
        updatePrimaryColor: (id: string, color: string, name: string) => set((state) => ({
            primaryColors: state.primaryColors.map((p) => {
                if (p.id === id) {
                    console.log("updated id " + id);
                    return {
                        color: color,
                        name: name,
                        id: id,
                    };
                }
                return p;
            })
        })),
        removePrimaryColor: (id: string) => set((state) => ({primaryColors: state.primaryColors.filter((p) => p.id !== id)})),
        createSteps: () => {
            const state = get();
            const {numberOfSteps} = state;
            let steps: number[] = [];

            // Calculate steps excluding 0 and 1000
            for (let i = 1; i <= numberOfSteps; i++) {
                const step = Math.round((i * 1000) / (numberOfSteps + 1));
                steps.push(step);
            }

            set({steps});
            return steps;
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
            const newSwatches = buildNewSwatches(state.shade, state.tint, state.primaryColors, state);

            // Update the swatches in the store
            set({swatches: newSwatches});

            return newSwatches;
        }
    })
);


// Initialize steps array
useSwatchStore.getState().createSteps();
useSwatchStore.getState().setCombinedSteps();
useSwatchStore.getState().buildSwatches();

export default useSwatchStore;
