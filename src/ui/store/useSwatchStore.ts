import {create} from 'zustand';
import {MINIMUM_STEPS} from "../../constants/uiConstants";
import {blendPrimaryColor, blendColor} from "../helpers/colorMethods";
import {IdentifiableColor} from "../interfaces/BaseInterfaces";

export const initialState = {
    // Scale properties
    scaleStart: {color: "000000", name: "Black", id: "scaleStart"},
    scaleEnd: {color: "FFFFFF", name: "White", id: "scaleEnd"},
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
    const combinedSteps = state.combinedSteps;
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
    neutralScaleName: string;

    // Common state properties
    primaryColors: SwatchStoreInputSwatch[];
    swatches: SwatchStoreSwatches[];
    colorScale: SwatchStoreSwatch[];
    numberOfSteps: number;
    steps: number[];
    customSteps: Set<number>;
    combinedSteps: Set<number>;

    // Common getters
    getCombinedSteps: () => Set<number>;

    // Scale setters
    setScaleStart: (color: string, name: string) => void;
    setScaleEnd: (color: string, name: string) => void;
    setNeutralScaleName: (name: string) => void;
    swapScaleEndpoints: () => void;

    // Common methods
    increaseSteps: () => void;
    decreaseSteps: () => void;
    setCombinedSteps: () => void;
    addPrimaryColor: (primaryColor: SwatchStoreInputSwatch) => void;
    removePrimaryColor: (id: string) => void;
    createSteps: () => number[];
    addCustomStep: (step: number) => void;
    removeCustomStep: (step: number) => void;
    buildSwatches: () => SwatchStoreSwatches[];
    buildColorScale: () => void;
    colorExists: (hex: string) => boolean;
    reset: () => void;
    saveState: () => Promise<void>;
    loadState: () => Promise<void>;
}


// Create the store
const useSwatchStore = create<SwatchStoreState>()(
    // persist(
    (set, get) => ({
        // Initial state
        ...initialState,

        // Common getters
        getCombinedSteps: () => get().combinedSteps,
        setCombinedSteps: () => {
            const {steps, customSteps} = get();
            set({combinedSteps: new Set([...steps, ...customSteps].sort((a, b) => a - b))});
        },

        // Common setters
        increaseSteps: () => {
            set((state) => ({numberOfSteps: state.numberOfSteps + 2}));
            get().createSteps();
            get().setCombinedSteps();
        },
        decreaseSteps: () => {
            if (get().numberOfSteps > MINIMUM_STEPS) {
                set((state) => ({numberOfSteps: state.numberOfSteps - 2}));
                get().createSteps();
                get().setCombinedSteps();
            }
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
            get().setCombinedSteps();
        },
        removeCustomStep: (step: number) => {
            set((state) => {
                const newCustomSteps = new Set(state.customSteps);
                newCustomSteps.delete(step);
                return {customSteps: newCustomSteps};
            });
            get().setCombinedSteps();
        },

        buildSwatches: () => {
            // Call setCombinedSteps first, before both build functions
            get().setCombinedSteps();

            // Get fresh state after setCombinedSteps has updated combinedSteps
            const state = get();
            const newSwatches = buildNewSwatches(state.scaleStart, state.scaleEnd, state.primaryColors, state);

            // Update the swatches in the store
            set({swatches: newSwatches});

            return newSwatches;
        },

        buildColorScale: () => {
            // Update combinedSteps first to ensure we have latest steps
            get().setCombinedSteps();

            // Get fresh state after setCombinedSteps has updated combinedSteps
            const state = get();
            const combinedSteps = Array.from(state.combinedSteps);
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
        },
        reset: () => {
            set(initialState);
        },
        saveState: async () => {
            const state = get();
            const stateToSave = {
                scaleStart: state.scaleStart,
                scaleEnd: state.scaleEnd,
                neutralScaleName: state.neutralScaleName,
                primaryColors: state.primaryColors,
                numberOfSteps: state.numberOfSteps,
                steps: state.steps,
                customSteps: Array.from(state.customSteps)
            };
            
            // Import UI_CHANNEL dynamically to avoid circular imports
            const { UI_CHANNEL } = await import("@ui/app.network");
            const { PLUGIN } = await import("@common/networkSides");
            await UI_CHANNEL.request(PLUGIN, "saveState", [stateToSave]);
        },
        loadState: async () => {
            // Import UI_CHANNEL dynamically to avoid circular imports
            const { UI_CHANNEL } = await import("@ui/app.network");
            const { PLUGIN } = await import("@common/networkSides");
            
            const savedState = await UI_CHANNEL.request(PLUGIN, "loadState", []);
            
            if (savedState) {
                set({
                    ...savedState,
                    customSteps: new Set(savedState.customSteps || [])
                });
                get().setCombinedSteps();
                get().buildSwatches();
            }
        }
    })
);


// Initialize steps array only
useSwatchStore.getState().createSteps();
// Don't call setCombinedSteps or buildSwatches on initialization

export default useSwatchStore;
