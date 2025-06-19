// Compatibility layer for useSwatchStore using the new consolidated store
import useAppStore, { 
    SwatchStoreInputSwatch, 
    SwatchStoreSwatch, 
    SwatchStoreSwatches,
    buildNewSwatches 
} from './useAppStore';

// Re-export types for backward compatibility
export { SwatchStoreInputSwatch, SwatchStoreSwatch, SwatchStoreSwatches };

// Re-export the initial state for backward compatibility
export const initialState = {
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

// Re-export the buildNewSwatches function for backward compatibility
export { buildNewSwatches };

// Create a selector-based wrapper that maintains the same API
const useSwatchStore = <T>(selector: (state: any) => T): T => {
    return useAppStore(selector);
};

// Add static methods for direct access (used in tests and initialization)
useSwatchStore.getState = () => useAppStore.getState();
useSwatchStore.setState = (partial: any) => useAppStore.setState(partial);
useSwatchStore.subscribe = (listener: any) => useAppStore.subscribe(listener);

export default useSwatchStore;
