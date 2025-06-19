import { create } from 'zustand';
import { MINIMUM_STEPS } from "../../constants/uiConstants";
import { SwatchGenerationService } from "../services";

// Re-export types for convenience
export type SpaceTreatment = 'keep' | 'dash' | 'underscore' | 'remove';
export type CaseTreatment = 'lower' | 'upper' | 'title' | 'keep';
export type CharType = 'dash' | 'underscore';

// Interfaces from original stores
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

// Swatch slice interface
interface SwatchSlice {
    // State properties
    shade: SwatchStoreInputSwatch;
    tint: SwatchStoreInputSwatch;
    primaryColors: SwatchStoreInputSwatch[];
    swatches: SwatchStoreSwatches[];
    numberOfSteps: number;
    steps: number[];
    customSteps: Set<number>;
    combinedSteps: Set<number>;
    shadeTintRampName: string;

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
    getShadeTintRampName: () => string;

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
    setShadeTintRampName: (name: string) => void;
}

// Token naming slice interface
interface TokenNameSlice {
    // State properties
    caseTreatment: CaseTreatment;
    spaceTreatment: SpaceTreatment;
    leadingCharsCount: number;
    trailingCharsCount: number;
    leadingCharType: CharType;
    trailingCharType: CharType;

    // Setters
    setCaseTreatment: (treatment: CaseTreatment) => void;
    setSpaceTreatment: (treatment: SpaceTreatment) => void;
    setLeadingCharsCount: (count: number) => void;
    setTrailingCharsCount: (count: number) => void;
    setLeadingCharType: (type: CharType) => void;
    setTrailingCharType: (type: CharType) => void;

    // Actions
    incrementLeadingChars: () => void;
    decrementLeadingChars: () => void;
    incrementTrailingChars: () => void;
    decrementTrailingChars: () => void;
    toggleLeadingCharType: () => void;
    toggleTrailingCharType: () => void;

    // Reset to defaults
    resetTokenNamingToDefaults: () => void;
}

// Combined store interface
interface AppStoreState extends SwatchSlice, TokenNameSlice {
    // Global actions
    resetAllToDefaults: () => void;
}

// Initial states
const swatchInitialState = {
    shade: {color: "000000", name: "Black", id: "shade"},
    tint: {color: "FFFFFF", name: "White", id: "tint"},
    primaryColors: [],
    swatches: [],
    numberOfSteps: 9,
    steps: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    customSteps: new Set<number>([50, 950]),
    combinedSteps: new Set<number>(),
    shadeTintRampName: "Gray",
};

const tokenNameInitialState = {
    caseTreatment: 'lower' as CaseTreatment,
    spaceTreatment: 'dash' as SpaceTreatment,
    leadingCharsCount: 2,
    trailingCharsCount: 1,
    leadingCharType: 'dash' as CharType,
    trailingCharType: 'dash' as CharType,
};

// Function to build swatches based on parameters
export const buildNewSwatches = (
    shade: SwatchStoreInputSwatch,
    tint: SwatchStoreInputSwatch,
    primaryColors: SwatchStoreInputSwatch[],
    state: AppStoreState,
) => {
    state.setCombinedSteps();
    const combinedSteps = state.getCombinedSteps();

    return SwatchGenerationService.buildSwatches(
        shade,
        tint,
        primaryColors,
        combinedSteps
    );
};

// Create the consolidated store (simplified for testing)
const useAppStore = create<AppStoreState>()((set, get) => ({
    // Swatch slice initial state
    ...swatchInitialState,

    // Token naming slice initial state
    ...tokenNameInitialState,

    // Swatch slice getters
    getShade: () => get().shade,
    getTint: () => get().tint,
    getPrimaryColors: () => get().primaryColors,
    getSwatches: () => get().swatches,
    getNumberOfSteps: () => get().numberOfSteps,
    getCustomSteps: () => get().customSteps,
    getTotalUniqueSteps: () => get().combinedSteps.size,
    getCombinedSteps: () => get().combinedSteps,
    getSteps: () => get().steps,
    getShadeTintRampName: () => get().shadeTintRampName,
    setCombinedSteps: () => {
        const {steps, customSteps} = get();
        const combinedSteps = SwatchGenerationService.combineSteps(steps, customSteps);
        const sortedSteps = SwatchGenerationService.sortSteps(combinedSteps);
        const sortedCombinedSteps = new Set(sortedSteps);
        set({combinedSteps: sortedCombinedSteps});
    },

    // Swatch slice setters
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
    setShadeTintRampName: (name: string) => {
        set({shadeTintRampName: name});
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

        // Use SwatchGenerationService to create steps
        const steps = SwatchGenerationService.createSteps(numberOfSteps);

        set({steps});
        return steps;
    },
    addCustomStep: (step: number) => {
        set((state) => {
            // Use SwatchGenerationService to add step to set and sort
            const customSteps = SwatchGenerationService.addStepToSet(step, state.customSteps);
            return {customSteps};
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
    },

    // Token naming slice setters
    setCaseTreatment: (caseTreatment: CaseTreatment) => set({caseTreatment}),
    setSpaceTreatment: (spaceTreatment: SpaceTreatment) => set({spaceTreatment}),
    setLeadingCharsCount: (leadingCharsCount: number) => set({leadingCharsCount: Math.max(0, leadingCharsCount)}),
    setTrailingCharsCount: (trailingCharsCount: number) => set({trailingCharsCount: Math.max(0, trailingCharsCount)}),
    setLeadingCharType: (leadingCharType: CharType) => set({leadingCharType}),
    setTrailingCharType: (trailingCharType: CharType) => set({trailingCharType}),

    // Token naming slice actions
    incrementLeadingChars: () => set((state) => ({leadingCharsCount: state.leadingCharsCount + 1})),
    decrementLeadingChars: () => set((state) => ({leadingCharsCount: Math.max(0, state.leadingCharsCount - 1)})),
    incrementTrailingChars: () => set((state) => ({trailingCharsCount: state.trailingCharsCount + 1})),
    decrementTrailingChars: () => set((state) => ({trailingCharsCount: Math.max(0, state.trailingCharsCount - 1)})),
    toggleLeadingCharType: () => set((state) => ({
        leadingCharType: state.leadingCharType === 'dash' ? 'underscore' : 'dash'
    })),
    toggleTrailingCharType: () => set((state) => ({
        trailingCharType: state.trailingCharType === 'dash' ? 'underscore' : 'dash'
    })),

    // Reset functions
    resetTokenNamingToDefaults: () => set({...tokenNameInitialState}),
    resetAllToDefaults: () => set({...swatchInitialState, ...tokenNameInitialState}),
}));

// Initialize the store
useAppStore.getState().createSteps();
useAppStore.getState().setCombinedSteps();
useAppStore.getState().buildSwatches();

export default useAppStore;
