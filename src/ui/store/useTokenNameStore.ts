// Compatibility layer for useTokenNameStore using the new consolidated store
import useAppStore, { SpaceTreatment, CaseTreatment, CharType } from './useAppStore';
import { useMemo } from 'react';

// Re-export types for backward compatibility
export { SpaceTreatment, CaseTreatment, CharType };

// Re-export the initial state for backward compatibility
export const initialState = {
    caseTreatment: 'lower' as CaseTreatment,
    spaceTreatment: 'dash' as SpaceTreatment,
    leadingCharsCount: 2,
    trailingCharsCount: 1,
    leadingCharType: 'dash' as CharType,
    trailingCharType: 'dash' as CharType,
};

// Define the token name store interface for backward compatibility
interface TokenNameStoreState {
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
    resetToDefaults: () => void;
}

// Create a selector-based wrapper that maintains the same API
function useTokenNameStore(): TokenNameStoreState;
function useTokenNameStore<T>(selector: (state: TokenNameStoreState) => T): T;
function useTokenNameStore<T>(selector?: (state: TokenNameStoreState) => T): T | TokenNameStoreState {
    // Select individual properties to avoid creating new objects unnecessarily
    const caseTreatment = useAppStore(state => state.caseTreatment);
    const spaceTreatment = useAppStore(state => state.spaceTreatment);
    const leadingCharsCount = useAppStore(state => state.leadingCharsCount);
    const trailingCharsCount = useAppStore(state => state.trailingCharsCount);
    const leadingCharType = useAppStore(state => state.leadingCharType);
    const trailingCharType = useAppStore(state => state.trailingCharType);

    // Select functions (these should be stable references)
    const setCaseTreatment = useAppStore(state => state.setCaseTreatment);
    const setSpaceTreatment = useAppStore(state => state.setSpaceTreatment);
    const setLeadingCharsCount = useAppStore(state => state.setLeadingCharsCount);
    const setTrailingCharsCount = useAppStore(state => state.setTrailingCharsCount);
    const setLeadingCharType = useAppStore(state => state.setLeadingCharType);
    const setTrailingCharType = useAppStore(state => state.setTrailingCharType);
    const incrementLeadingChars = useAppStore(state => state.incrementLeadingChars);
    const decrementLeadingChars = useAppStore(state => state.decrementLeadingChars);
    const incrementTrailingChars = useAppStore(state => state.incrementTrailingChars);
    const decrementTrailingChars = useAppStore(state => state.decrementTrailingChars);
    const toggleLeadingCharType = useAppStore(state => state.toggleLeadingCharType);
    const toggleTrailingCharType = useAppStore(state => state.toggleTrailingCharType);
    const resetToDefaults = useAppStore(state => state.resetTokenNamingToDefaults);

    // Memoize the token name slice object to prevent unnecessary re-renders
    const tokenNameSlice = useMemo((): TokenNameStoreState => ({
        caseTreatment,
        spaceTreatment,
        leadingCharsCount,
        trailingCharsCount,
        leadingCharType,
        trailingCharType,
        setCaseTreatment,
        setSpaceTreatment,
        setLeadingCharsCount,
        setTrailingCharsCount,
        setLeadingCharType,
        setTrailingCharType,
        incrementLeadingChars,
        decrementLeadingChars,
        incrementTrailingChars,
        decrementTrailingChars,
        toggleLeadingCharType,
        toggleTrailingCharType,
        resetToDefaults,
    }), [
        caseTreatment,
        spaceTreatment,
        leadingCharsCount,
        trailingCharsCount,
        leadingCharType,
        trailingCharType,
        setCaseTreatment,
        setSpaceTreatment,
        setLeadingCharsCount,
        setTrailingCharsCount,
        setLeadingCharType,
        setTrailingCharType,
        incrementLeadingChars,
        decrementLeadingChars,
        incrementTrailingChars,
        decrementTrailingChars,
        toggleLeadingCharType,
        toggleTrailingCharType,
        resetToDefaults,
    ]);

    if (selector) {
        return selector(tokenNameSlice);
    }

    return tokenNameSlice;
}

// Add static methods for direct access (used in tests)
useTokenNameStore.getState = () => {
    const state = useAppStore.getState();
    return {
        caseTreatment: state.caseTreatment,
        spaceTreatment: state.spaceTreatment,
        leadingCharsCount: state.leadingCharsCount,
        trailingCharsCount: state.trailingCharsCount,
        leadingCharType: state.leadingCharType,
        trailingCharType: state.trailingCharType,
        setCaseTreatment: state.setCaseTreatment,
        setSpaceTreatment: state.setSpaceTreatment,
        setLeadingCharsCount: state.setLeadingCharsCount,
        setTrailingCharsCount: state.setTrailingCharsCount,
        setLeadingCharType: state.setLeadingCharType,
        setTrailingCharType: state.setTrailingCharType,
        incrementLeadingChars: state.incrementLeadingChars,
        decrementLeadingChars: state.decrementLeadingChars,
        incrementTrailingChars: state.incrementTrailingChars,
        decrementTrailingChars: state.decrementTrailingChars,
        toggleLeadingCharType: state.toggleLeadingCharType,
        toggleTrailingCharType: state.toggleTrailingCharType,
        resetToDefaults: state.resetTokenNamingToDefaults,
    };
};

useTokenNameStore.setState = (partial: any) => useAppStore.setState(partial);
useTokenNameStore.subscribe = (listener: any) => useAppStore.subscribe(listener);

export default useTokenNameStore;
