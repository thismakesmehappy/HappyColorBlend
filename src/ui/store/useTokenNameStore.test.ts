import {renderHook, act} from '@testing-library/react';
import useTokenNameStore, {initialState} from './useTokenNameStore';

describe('useTokenNameStore', () => {
    // Reset the store before each test
    beforeEach(() => {
        act(() => {
            useTokenNameStore.getState().resetToDefaults();
        });
    });

    test('should initialize with default values', () => {
        const {result} = renderHook(() => useTokenNameStore());

        expect(result.current.caseTreatment).toBe(initialState.caseTreatment);
        expect(result.current.spaceTreatment).toBe(initialState.spaceTreatment);
        expect(result.current.leadingCharsCount).toBe(initialState.leadingCharsCount);
        expect(result.current.separatorCharsCount).toBe(initialState.separatorCharsCount);
        expect(result.current.leadingCharType).toBe(initialState.leadingCharType);
        expect(result.current.separatorCharType).toBe(initialState.separatorCharType);
        expect(result.current.keepCSSClean).toBe(initialState.keepCSSClean);
    });

    test('should update caseTreatment', () => {
        const {result} = renderHook(() => useTokenNameStore());

        act(() => {
            result.current.setCaseTreatment('upper');
        });

        expect(result.current.caseTreatment).toBe('upper');
    });

    test('should update spaceTreatment', () => {
        const {result} = renderHook(() => useTokenNameStore());

        act(() => {
            result.current.setSpaceTreatment('underscore');
        });

        expect(result.current.spaceTreatment).toBe('underscore');
    });

    test('should update leadingCharsCount', () => {
        const {result} = renderHook(() => useTokenNameStore());

        act(() => {
            result.current.setLeadingCharsCount(3);
        });

        expect(result.current.leadingCharsCount).toBe(3);
    });

    test('should not allow negative leadingCharsCount', () => {
        const {result} = renderHook(() => useTokenNameStore());

        act(() => {
            result.current.setLeadingCharsCount(-2);
        });

        expect(result.current.leadingCharsCount).toBe(0);
    });

    test('should update separatorCharsCount', () => {
        const {result} = renderHook(() => useTokenNameStore());

        act(() => {
            result.current.setSeparatorCharsCount(5);
        });

        expect(result.current.separatorCharsCount).toBe(5);
    });

    test('should not allow negative separatorCharsCount', () => {
        const {result} = renderHook(() => useTokenNameStore());

        act(() => {
            result.current.setSeparatorCharsCount(-3);
        });

        expect(result.current.separatorCharsCount).toBe(0);
    });

    test('should update leadingCharType', () => {
        const {result} = renderHook(() => useTokenNameStore());

        act(() => {
            result.current.setLeadingCharType('underscore');
        });

        expect(result.current.leadingCharType).toBe('underscore');
    });

    test('should update separatorCharType', () => {
        const {result} = renderHook(() => useTokenNameStore());

        act(() => {
            result.current.setSeparatorCharType('underscore');
        });

        expect(result.current.separatorCharType).toBe('underscore');
    });

    test('should increment leadingCharsCount', () => {
        const {result} = renderHook(() => useTokenNameStore());
        const initialValue = result.current.leadingCharsCount;

        act(() => {
            result.current.incrementLeadingChars();
        });

        expect(result.current.leadingCharsCount).toBe(initialValue + 1);

        act(() => {
            result.current.incrementLeadingChars();
        });

        expect(result.current.leadingCharsCount).toBe(initialValue + 2);
    });

    test('should decrement leadingCharsCount', () => {
        const {result} = renderHook(() => useTokenNameStore());
        const initialValue = 3

        // Set to 3 first
        act(() => {
            result.current.setLeadingCharsCount(initialValue);
        });

        act(() => {
            result.current.decrementLeadingChars();
        });

        expect(result.current.leadingCharsCount).toBe(initialValue - 1);
    });

    test('should not decrement leadingCharsCount below 0', () => {
        const {result} = renderHook(() => useTokenNameStore());

        // Already at 0
        act(() => {
            result.current.decrementLeadingChars();
            result.current.decrementLeadingChars();
        });

        expect(result.current.leadingCharsCount).toBe(0);
    });

    test('should increment separatorCharsCount', () => {
        const {result} = renderHook(() => useTokenNameStore());
        const initialValue = result.current.separatorCharsCount;

        act(() => {
            result.current.incrementSeparatorChars();
        });

        expect(result.current.separatorCharsCount).toBe(initialValue + 1);

        act(() => {
            result.current.incrementSeparatorChars();
        });

        expect(result.current.separatorCharsCount).toBe(initialValue + 2);
    });

    test('should decrement separatorCharsCount', () => {
        const {result} = renderHook(() => useTokenNameStore());
        const initialValue = 3;

        // Set to 3 first
        act(() => {
            result.current.setSeparatorCharsCount(initialValue);
        });

        act(() => {
            result.current.decrementSeparatorChars();
        });

        expect(result.current.separatorCharsCount).toBe(initialValue - 1);
    });

    test('should not decrement separatorCharsCount below 0', () => {
        const {result} = renderHook(() => useTokenNameStore());

        // Already at 0
        act(() => {
            result.current.decrementSeparatorChars();
            result.current.decrementSeparatorChars();
        });

        expect(result.current.separatorCharsCount).toBe(0);
    });

    test('should toggle leadingCharType', () => {
        const {result} = renderHook(() => useTokenNameStore());

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

    test('should toggle separatorCharType', () => {
        const {result} = renderHook(() => useTokenNameStore());

        // Default is 'dash'
        act(() => {
            result.current.toggleSeparatorCharType();
        });

        expect(result.current.separatorCharType).toBe('underscore');

        act(() => {
            result.current.toggleSeparatorCharType();
        });

        expect(result.current.separatorCharType).toBe('dash');
    });

    test('should update keepCSSClean', () => {
        const {result} = renderHook(() => useTokenNameStore());

        act(() => {
            result.current.setKeepCSSClean(false);
        });

        expect(result.current.keepCSSClean).toBe(false);

        act(() => {
            result.current.setKeepCSSClean(true);
        });

        expect(result.current.keepCSSClean).toBe(true);
    });

    test('should toggle keepCSSClean', () => {
        const {result} = renderHook(() => useTokenNameStore());

        // Default is true
        expect(result.current.keepCSSClean).toBe(true);

        act(() => {
            result.current.toggleKeepCSSClean();
        });

        expect(result.current.keepCSSClean).toBe(false);

        act(() => {
            result.current.toggleKeepCSSClean();
        });

        expect(result.current.keepCSSClean).toBe(true);
    });

    test('should reset to defaults', () => {
        const {result} = renderHook(() => useTokenNameStore());

        // Change several values
        act(() => {
            result.current.setCaseTreatment('upper');
            result.current.setSpaceTreatment('underscore');
            result.current.setLeadingCharsCount(3);
            result.current.setSeparatorCharsCount(2);
            result.current.setLeadingCharType('underscore');
            result.current.setSeparatorCharType('underscore');
            result.current.setKeepCSSClean(false);
        });

        // Reset
        act(() => {
            result.current.resetToDefaults();
        });

        // Check all values are back to defaults
        expect(result.current.caseTreatment).toBe(initialState.caseTreatment);
        expect(result.current.spaceTreatment).toBe(initialState.spaceTreatment);
        expect(result.current.leadingCharsCount).toBe(initialState.leadingCharsCount);
        expect(result.current.separatorCharsCount).toBe(initialState.separatorCharsCount);
        expect(result.current.leadingCharType).toBe(initialState.leadingCharType);
        expect(result.current.separatorCharType).toBe(initialState.separatorCharType);
        expect(result.current.keepCSSClean).toBe(initialState.keepCSSClean);
    });
});
