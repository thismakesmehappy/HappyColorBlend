import {create} from 'zustand';
import {v4 as uuidv4} from 'uuid';


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
    customSteps: number[];
    includeDarkLight: boolean;

    // Getters
    getDark: () => SwatchStoreInputSwatch;
    getLight: () => SwatchStoreInputSwatch;
    getBases: () => SwatchStoreInputSwatch[];
    getSwatches: () => SwatchStoreSwatches[];
    getNumberOfSteps: () => number;
    getCustomSteps: () => number[];
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
}

// Create the store
const useSwatchStore = create<SwatchStoreState>((set, get) => ({
    // Initial state
    dark: {color: "000000", name: "Black", id: "dark"},
    light: {color: "FFFFFF", name: "White", id: "light"},
    bases: [],
    swatches: [],
    numberOfSteps: 1,
    customSteps: [],
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
    increaseSteps: () => set((state) => ({numberOfSteps: state.numberOfSteps + 2})),
    decreaseSteps: () => set((state) => ({numberOfSteps: state.numberOfSteps - 2})),
    setSteps: (steps: number) => set({numberOfSteps: steps}),
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
    flipIncludeDarkLight: () => set((state) => ({includeDarkLight: !state.includeDarkLight})),
}));

export default useSwatchStore;