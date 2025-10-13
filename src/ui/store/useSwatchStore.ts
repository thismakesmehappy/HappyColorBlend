import {create} from 'zustand';
import {MINIMUM_STEPS} from "../../constants/uiConstants";
import {blendPrimaryColor, blendColor} from "../helpers/colorMethods";
import {IdentifiableColor} from "../interfaces/BaseInterfaces";

export const initialState = {
    // Scale properties
    scaleStart: {color: "000000", name: "Black", id: "scaleStart"},
    scaleEnd: {color: "FFFFFF", name: "White", id: "scaleEnd"},
    isDarkStart: true,
    neutralScaleName: "Neutral",
    // Common properties
    primaryColors: [],
    swatches: [],
    colorScale: [], // Add colorScale as stored field
    numberOfSteps: 9,
    steps: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    customSteps: new Set<number>([]),
    combinedSteps: new Set<number>(),
}
// Function to build swatches based on parameters
export const buildNewSwatches = (
    start: IdentifiableColor,
    end: IdentifiableColor,
    primaryColors: IdentifiableColor[],
    state: SwatchStoreState,
) => {
    // Don't call setCombinedSteps here - it should be called before this function
    const combinedSteps = state.getCombinedSteps();
    const swatches: SwatchStoreSwatches[] = [];

    // Always calculate from scaleStart(0) to scaleEnd(1000), no gradient direction logic
    for (let primary in primaryColors) {
        const swatch: SwatchStoreSwatches = {
            base: primaryColors[primary],
            swatches: []
        };

        for (let step of combinedSteps) {
            swatch.swatches.push({
                color: blendPrimaryColor(start.color, end.color, primaryColors[primary].color, step),
                step: step
            });
        }

        swatches.push(swatch);
    }

    return swatches;
};


export interface SwatchStoreInputSwatch extends IdentifiableColor {
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
export interface SwatchStoreState {
    // Scale properties
    scaleStart: SwatchStoreInputSwatch;
    scaleEnd: SwatchStoreInputSwatch;
    isDarkStart: boolean;
    neutralScaleName: string;

    // Common state properties
    primaryColors: SwatchStoreInputSwatch[];
    swatches: SwatchStoreSwatches[];
    colorScale: SwatchStoreSwatch[];
    numberOfSteps: number;
    steps: number[];
    customSteps: Set<number>;
    combinedSteps: Set<number>;

    // Scale getters
    getScaleStart: () => SwatchStoreInputSwatch;
    getScaleEnd: () => SwatchStoreInputSwatch;
    getNeutralScaleName: () => string;

    // Common getters
    getPrimaryColors: () => SwatchStoreInputSwatch[];
    getSwatches: () => SwatchStoreSwatches[];
    getColorScale: () => SwatchStoreSwatch[];
    getNumberOfSteps: () => number;
    getCustomSteps: () => Set<number>;
    getTotalUniqueSteps: () => number;
    getCombinedSteps: () => Set<number>;
    getSteps: () => number[];

    // Scale setters
    setScaleStart: (color: string, name: string) => void;
    setScaleEnd: (color: string, name: string) => void;
    setNeutralScaleName: (name: string) => void;
    setIsDarkStart: (isDarkStart: boolean) => void;
    swapScaleEndpoints: () => void;

    // Common methods
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
    buildColorScale: () => void;
    toggleIsDarkStart: () => void;
    colorExists: (hex: string) => boolean;
}


// Create the store
const useSwatchStore = create<SwatchStoreState>()(
    // persist(
    (set, get) => ({
        // Initial state
        ...initialState,

        // Scale getters
        getScaleStart: () => get().scaleStart,
        getScaleEnd: () => get().scaleEnd,
        getNeutralScaleName: () => get().neutralScaleName,

        // Common getters
        getPrimaryColors: () => get().primaryColors,
        getSwatches: () => get().swatches,
        getColorScale: () => get().colorScale,
        getNumberOfSteps: () => get().numberOfSteps,
        getCustomSteps: () => get().customSteps,
        getTotalUniqueSteps: () => get().combinedSteps.size,
        getCombinedSteps: () => get().combinedSteps,
        getSteps: () => get().steps,
        setCombinedSteps: () => {
            const {steps, customSteps} = get();
            set({combinedSteps: new Set([...steps, ...customSteps].sort((a, b) => a - b))});
        },

        // Common setters
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
        // Scale setters
        setScaleStart: (color: string, name: string) => {
            const colorUpper = color.toUpperCase();
            set({
                scaleStart: {
                    color: colorUpper,
                    name: name,
                    id: "scaleStart"
                }
            });
        },
        setScaleEnd: (color: string, name: string) => {
            const colorUpper = color.toUpperCase();
            set({
                scaleEnd: {
                    color: colorUpper,
                    name: name,
                    id: "scaleEnd"
                }
            });
        },
        setNeutralScaleName: (name: string) => {
            set({neutralScaleName: name});
        },
        setIsDarkStart: (isDarkStart: boolean) => {
            set({isDarkStart: isDarkStart});
        },
        toggleIsDarkStart: () => {
            set((state) => ({isDarkStart: !state.isDarkStart}));
        },
        swapScaleEndpoints: () => {
            const {scaleStart, scaleEnd} = get();
            set({
                scaleStart: {
                    color: scaleEnd.color,
                    name: scaleEnd.name,
                    id: "scaleStart"
                },
                scaleEnd: {
                    color: scaleStart.color,
                    name: scaleStart.name,
                    id: "scaleEnd"
                }
            });
        },
        addPrimaryColor: (primaryColor: SwatchStoreInputSwatch) => set((state) => ({primaryColors: [...state.primaryColors, primaryColor]})),
        updatePrimaryColor: (id: string, color: string, name: string) => set((state) => ({
            primaryColors: state.primaryColors.map((p) => {
                if (p.id === id) {
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
            // Call setCombinedSteps first, before both build functions
            state.setCombinedSteps();
            const newSwatches = buildNewSwatches(state.scaleStart, state.scaleEnd, state.primaryColors, state);

            // Update the swatches in the store
            set({swatches: newSwatches});

            return newSwatches;
        },

        buildColorScale: () => {
            const state = get();
            // Don't call setCombinedSteps here to avoid circular updates
            const combinedSteps = Array.from(state.getCombinedSteps());
            const scaleStart = state.scaleStart;
            const scaleEnd = state.scaleEnd;

            const colorScale: SwatchStoreSwatch[] = combinedSteps.map((step) => {
                return {
                    color: blendColor(scaleStart.color, scaleEnd.color, step),
                    step: step,
                }
            });

            set({colorScale});
        },
        colorExists: (hex: string) => {
            const state = get();
            const hexUpper = hex.toUpperCase();
            return state.primaryColors.some(color => color.color.toUpperCase() === hexUpper);
        }
    })
);


// Initialize steps array only
useSwatchStore.getState().createSteps();
// Don't call setCombinedSteps or buildSwatches on initialization

export default useSwatchStore;
