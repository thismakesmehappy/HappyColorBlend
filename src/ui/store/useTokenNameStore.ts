import { create } from 'zustand';

// Re-export types for convenience
export type SpaceTreatment = 'keep' | 'dash' | 'underscore' | 'remove';
export type CaseTreatment = 'lower' | 'upper' | 'title' | 'keep';
export type CharType = 'dash' | 'underscore';

// Initial state for the token name store
export const initialState = {
  caseTreatment: 'keep' as CaseTreatment,
  spaceTreatment: 'dash' as SpaceTreatment,
  leadingCharsCount: 0,
  trailingCharsCount: 0,
  leadingCharType: 'dash' as CharType,
  trailingCharType: 'dash' as CharType,
};

// Define the store state interface
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

// Create the store
const useTokenNameStore = create<TokenNameStoreState>()((set) => ({
  // Initial state
  ...initialState,
  
  // Setters
  setCaseTreatment: (caseTreatment: CaseTreatment) => set({ caseTreatment }),
  setSpaceTreatment: (spaceTreatment: SpaceTreatment) => set({ spaceTreatment }),
  setLeadingCharsCount: (leadingCharsCount: number) => set({ leadingCharsCount: Math.max(0, leadingCharsCount) }),
  setTrailingCharsCount: (trailingCharsCount: number) => set({ trailingCharsCount: Math.max(0, trailingCharsCount) }),
  setLeadingCharType: (leadingCharType: CharType) => set({ leadingCharType }),
  setTrailingCharType: (trailingCharType: CharType) => set({ trailingCharType }),
  
  // Actions
  incrementLeadingChars: () => set((state) => ({ leadingCharsCount: state.leadingCharsCount + 1 })),
  decrementLeadingChars: () => set((state) => ({ leadingCharsCount: Math.max(0, state.leadingCharsCount - 1) })),
  incrementTrailingChars: () => set((state) => ({ trailingCharsCount: state.trailingCharsCount + 1 })),
  decrementTrailingChars: () => set((state) => ({ trailingCharsCount: Math.max(0, state.trailingCharsCount - 1) })),
  toggleLeadingCharType: () => set((state) => ({ 
    leadingCharType: state.leadingCharType === 'dash' ? 'underscore' : 'dash' 
  })),
  toggleTrailingCharType: () => set((state) => ({ 
    trailingCharType: state.trailingCharType === 'dash' ? 'underscore' : 'dash' 
  })),
  
  // Reset to defaults
  resetToDefaults: () => set({ ...initialState })
}));

export default useTokenNameStore;
