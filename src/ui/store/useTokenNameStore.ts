import {create} from 'zustand';

// Re-export types for convenience
export type SpaceTreatment = 'keep' | 'dash' | 'underscore' | 'remove';
export type CaseTreatment = 'lower' | 'upper' | 'title' | 'keep';
export type CharType = 'dash' | 'underscore';

// Initial state for the token name store
export const initialState = {
    caseTreatment: 'lower' as CaseTreatment,
    spaceTreatment: 'dash' as SpaceTreatment,
    leadingCharsCount: 2,
    separatorCharsCount: 1,
    leadingCharType: 'dash' as CharType,
    separatorCharType: 'dash' as CharType,
    appendSeparatorToPrimitive: false,
};

// Define the store state interface
interface TokenNameStoreState {
    // State properties
    caseTreatment: CaseTreatment;
    spaceTreatment: SpaceTreatment;
    leadingCharsCount: number;
    separatorCharsCount: number;
    leadingCharType: CharType;
    separatorCharType: CharType;
    appendSeparatorToPrimitive: boolean;

    // Setters
    setCaseTreatment: (treatment: CaseTreatment) => void;
    setSpaceTreatment: (treatment: SpaceTreatment) => void;
    setLeadingCharsCount: (count: number) => void;
    setSeparatorCharsCount: (count: number) => void;
    setLeadingCharType: (type: CharType) => void;
    setSeparatorCharType: (type: CharType) => void;
    setAppendSeparatorToPrimitive: (useAsSeparator: boolean) => void;

    // Actions
    incrementLeadingChars: () => void;
    decrementLeadingChars: () => void;
    incrementSeparatorChars: () => void;
    decrementSeparatorChars: () => void;
    toggleLeadingCharType: () => void;
    toggleSeparatorCharType: () => void;
    toggleAppendSeparatorToPrimitive: () => void;

    // Reset to defaults
    resetToDefaults: () => void;
}

// Create the store
const useTokenNameStore = create<TokenNameStoreState>()((set) => ({
    // Initial state
    ...initialState,

    // Setters
    setCaseTreatment: (caseTreatment: CaseTreatment) => set({caseTreatment}),
    setSpaceTreatment: (spaceTreatment: SpaceTreatment) => set({spaceTreatment}),
    setLeadingCharsCount: (leadingCharsCount: number) => set({leadingCharsCount: Math.max(0, leadingCharsCount)}),
    setSeparatorCharsCount: (separatorCharsCount: number) => set({separatorCharsCount: Math.max(0, separatorCharsCount)}),
    setLeadingCharType: (leadingCharType: CharType) => set({leadingCharType}),
    setSeparatorCharType: (separatorCharType: CharType) => set({separatorCharType: separatorCharType}),
    setAppendSeparatorToPrimitive: (appendSeparatorToPrimitive: boolean) => set({appendSeparatorToPrimitive}),

    // Actions
    incrementLeadingChars: () => set((state) => ({leadingCharsCount: state.leadingCharsCount + 1})),
    decrementLeadingChars: () => set((state) => ({leadingCharsCount: Math.max(0, state.leadingCharsCount - 1)})),
    incrementSeparatorChars: () => set((state) => ({separatorCharsCount: state.separatorCharsCount + 1})),
    decrementSeparatorChars: () => set((state) => ({separatorCharsCount: Math.max(0, state.separatorCharsCount - 1)})),
    toggleLeadingCharType: () => set((state) => ({
        leadingCharType: state.leadingCharType === 'dash' ? 'underscore' : 'dash'
    })),
    toggleSeparatorCharType: () => set((state) => ({
        separatorCharType: state.separatorCharType === 'dash' ? 'underscore' : 'dash'
    })),
    toggleAppendSeparatorToPrimitive: () => set((state) => ({
        appendSeparatorToPrimitive: !state.appendSeparatorToPrimitive
    })),

    // Reset to defaults
    resetToDefaults: () => set({...initialState})
}));

export default useTokenNameStore;
