import { renderHook, act } from '@testing-library/react';
import useTokenNameStore, { initialState } from './useTokenNameStore';

describe('useTokenNameStore', () => {
  // Reset the store before each test
  beforeEach(() => {
    act(() => {
      useTokenNameStore.getState().resetToDefaults();
    });
  });

  test('should initialize with default values', () => {
    const { result } = renderHook(() => useTokenNameStore());
    
    expect(result.current.caseTreatment).toBe(initialState.caseTreatment);
    expect(result.current.spaceTreatment).toBe(initialState.spaceTreatment);
    expect(result.current.leadingCharsCount).toBe(initialState.leadingCharsCount);
    expect(result.current.trailingCharsCount).toBe(initialState.trailingCharsCount);
    expect(result.current.leadingCharType).toBe(initialState.leadingCharType);
    expect(result.current.trailingCharType).toBe(initialState.trailingCharType);
  });

  test('should update caseTreatment', () => {
    const { result } = renderHook(() => useTokenNameStore());
    
    act(() => {
      result.current.setCaseTreatment('upper');
    });
    
    expect(result.current.caseTreatment).toBe('upper');
  });

  test('should update spaceTreatment', () => {
    const { result } = renderHook(() => useTokenNameStore());
    
    act(() => {
      result.current.setSpaceTreatment('underscore');
    });
    
    expect(result.current.spaceTreatment).toBe('underscore');
  });

  test('should update leadingCharsCount', () => {
    const { result } = renderHook(() => useTokenNameStore());
    
    act(() => {
      result.current.setLeadingCharsCount(3);
    });
    
    expect(result.current.leadingCharsCount).toBe(3);
  });

  test('should not allow negative leadingCharsCount', () => {
    const { result } = renderHook(() => useTokenNameStore());
    
    act(() => {
      result.current.setLeadingCharsCount(-2);
    });
    
    expect(result.current.leadingCharsCount).toBe(0);
  });

  test('should update trailingCharsCount', () => {
    const { result } = renderHook(() => useTokenNameStore());
    
    act(() => {
      result.current.setTrailingCharsCount(5);
    });
    
    expect(result.current.trailingCharsCount).toBe(5);
  });

  test('should not allow negative trailingCharsCount', () => {
    const { result } = renderHook(() => useTokenNameStore());
    
    act(() => {
      result.current.setTrailingCharsCount(-3);
    });
    
    expect(result.current.trailingCharsCount).toBe(0);
  });

  test('should update leadingCharType', () => {
    const { result } = renderHook(() => useTokenNameStore());
    
    act(() => {
      result.current.setLeadingCharType('underscore');
    });
    
    expect(result.current.leadingCharType).toBe('underscore');
  });

  test('should update trailingCharType', () => {
    const { result } = renderHook(() => useTokenNameStore());
    
    act(() => {
      result.current.setTrailingCharType('underscore');
    });
    
    expect(result.current.trailingCharType).toBe('underscore');
  });

  test('should increment leadingCharsCount', () => {
    const { result } = renderHook(() => useTokenNameStore());
    
    act(() => {
      result.current.incrementLeadingChars();
    });
    
    expect(result.current.leadingCharsCount).toBe(1);
    
    act(() => {
      result.current.incrementLeadingChars();
    });
    
    expect(result.current.leadingCharsCount).toBe(2);
  });

  test('should decrement leadingCharsCount', () => {
    const { result } = renderHook(() => useTokenNameStore());
    
    // Set to 3 first
    act(() => {
      result.current.setLeadingCharsCount(3);
    });
    
    act(() => {
      result.current.decrementLeadingChars();
    });
    
    expect(result.current.leadingCharsCount).toBe(2);
  });

  test('should not decrement leadingCharsCount below 0', () => {
    const { result } = renderHook(() => useTokenNameStore());
    
    // Already at 0
    act(() => {
      result.current.decrementLeadingChars();
    });
    
    expect(result.current.leadingCharsCount).toBe(0);
  });

  test('should increment trailingCharsCount', () => {
    const { result } = renderHook(() => useTokenNameStore());
    
    act(() => {
      result.current.incrementTrailingChars();
    });
    
    expect(result.current.trailingCharsCount).toBe(1);
    
    act(() => {
      result.current.incrementTrailingChars();
    });
    
    expect(result.current.trailingCharsCount).toBe(2);
  });

  test('should decrement trailingCharsCount', () => {
    const { result } = renderHook(() => useTokenNameStore());
    
    // Set to 3 first
    act(() => {
      result.current.setTrailingCharsCount(3);
    });
    
    act(() => {
      result.current.decrementTrailingChars();
    });
    
    expect(result.current.trailingCharsCount).toBe(2);
  });

  test('should not decrement trailingCharsCount below 0', () => {
    const { result } = renderHook(() => useTokenNameStore());
    
    // Already at 0
    act(() => {
      result.current.decrementTrailingChars();
    });
    
    expect(result.current.trailingCharsCount).toBe(0);
  });

  test('should toggle leadingCharType', () => {
    const { result } = renderHook(() => useTokenNameStore());
    
    // Default is 'dash'
    act(() => {
      result.current.toggleLeadingCharType();
    });
    
    expect(result.current.leadingCharType).toBe('underscore');
    
    act(() => {
      result.current.toggleLeadingCharType();
    });
    
    expect(result.current.leadingCharType).toBe('dash');
  });

  test('should toggle trailingCharType', () => {
    const { result } = renderHook(() => useTokenNameStore());
    
    // Default is 'dash'
    act(() => {
      result.current.toggleTrailingCharType();
    });
    
    expect(result.current.trailingCharType).toBe('underscore');
    
    act(() => {
      result.current.toggleTrailingCharType();
    });
    
    expect(result.current.trailingCharType).toBe('dash');
  });

  test('should reset to defaults', () => {
    const { result } = renderHook(() => useTokenNameStore());
    
    // Change several values
    act(() => {
      result.current.setCaseTreatment('upper');
      result.current.setSpaceTreatment('underscore');
      result.current.setLeadingCharsCount(3);
      result.current.setTrailingCharsCount(2);
      result.current.setLeadingCharType('underscore');
      result.current.setTrailingCharType('underscore');
    });
    
    // Reset
    act(() => {
      result.current.resetToDefaults();
    });
    
    // Check all values are back to defaults
    expect(result.current.caseTreatment).toBe(initialState.caseTreatment);
    expect(result.current.spaceTreatment).toBe(initialState.spaceTreatment);
    expect(result.current.leadingCharsCount).toBe(initialState.leadingCharsCount);
    expect(result.current.trailingCharsCount).toBe(initialState.trailingCharsCount);
    expect(result.current.leadingCharType).toBe(initialState.leadingCharType);
    expect(result.current.trailingCharType).toBe(initialState.trailingCharType);
  });
});
