# Visual Inconsistencies Checklist

**Instructions:**

- Review each item by checking the visual clues in your UI
- Mark `[ ]` as `[x]` for items you want me to FIX
- Mark `[ ]` as `[-]` for items you want to BYPASS/SKIP
- When ready, tell me to "execute marked fixes" and I'll implement only the checked items

---

## High Severity Issues

### 1. Section Padding Inconsistency

- **Status:** [ ] Fix | [-] Bypass
- **Location:** `src/ui/styles/layout/main.scss:15-32`
- **Visual Clue:** Look at the spacing around the three main sections (Input, Settings, Output) - the Input section has
  equal padding all around, while Settings and Output have no left padding
- **Impact:** Creates uneven visual balance between sections
- **Fix:** Standardize padding across all three sections
- **Note:** This is to prevent having double margins between columns

### 2. Button Class Redundancy

- **Status:** [x] Fix | [ ] Bypass
- **Location:** `src/ui/components/swatchesOutput/OutputButtons.tsx:122-142`
- **Visual Clue:** Buttons may appear inconsistent or have conflicting styles due to Bootstrap + Figma classes being
  applied together
- **Impact:** Potential style conflicts and code bloat
- **Fix:** Use either Bootstrap OR Figma button classes consistently
- **Note:** Use Figma

---

## Medium Severity Issues

### 3. Inline Margin Usage

- **Status:** [x] Fix | [ ] Bypass
- **Location:** `src/ui/components/steps/CustomSteps.tsx:106`
- **Visual Clue:** Look for inconsistent spacing around interactive elements in the Custom Steps section
- **Impact:** Breaks design system consistency
- **Fix:** Replace `marginLeft: '8px'` with `figma-ml-sm` class

### 4. Radio Button Margins (Case Component)

- **Status:** [x] Fix | [ ] Bypass
- **Location:** `src/ui/components/tokenSettings/Case.tsx:14-44`
- **Visual Clue:** Check spacing between radio button labels in the Case settings - should be consistent
- **Impact:** Inconsistent spacing between form elements
- **Fix:** Standardize margin classes on all radio labels

### 5. Mixed Radio Margins (Spaces Component)

- **Status:** [x] Fix | [ ] Bypass
- **Location:** `src/ui/components/tokenSettings/Spaces.tsx:12-41`
- **Visual Clue:** Compare spacing between radio labels in Spaces vs Case settings - may appear different
- **Impact:** Visual inconsistency between similar components
- **Fix:** Apply consistent margin pattern to match other radio groups
- **Note: ** Follow same as 4.

### 6. Duplicate Color Variable

- **Status:** [ ] Fix | [-] Bypass
- **Location:** `src/ui/styles/figma/figma-styles.scss:21`
- **Visual Clue:** May cause unexpected color variations if the wrong variable value is used
- **Impact:** Potential color inconsistencies and confusion
- **Fix:** Remove duplicate `$color-component` definition

### 7. Inline Font Sizing

- **Status:** [x] Fix | [ ] Bypass
- **Location:** `src/ui/components/helpers/Toggle.tsx:49`
- **Visual Clue:** Check if toggle component text sizing looks different from other similar UI elements
- **Impact:** Breaks typography consistency
- **Fix:** Replace inline `fontSize` with figma typography classes

### 8. Typography Naming Pattern

- **Status:** [ ] Fix | [-] Bypass
- **Location:** `src/ui/styles/figma/figma-styles.scss:333-354`
- **Visual Clue:** This is a code consistency issue, no direct visual impact
- **Impact:** Code maintainability and consistency
- **Fix:** Standardize CSS class naming approach

### 9. Color Variable Misuse

- **Status:** [ ] Fix | [-] Bypass
- **Location:** `src/ui/styles/figma/figma-styles.scss:142`
- **Visual Clue:** Look for tooltip colors that might seem off or inconsistent with the design
- **Impact:** Incorrect color usage in tooltips
- **Fix:** Use correct color variable for tooltip styling

### 10. Custom Separator Class

- **Status:** [x] Fix | [ ] Bypass
- **Location:** `src/ui/components/swatchesInput/Swatch.tsx:61`
- **Visual Clue:** Look for spacing between swatch elements that might be inconsistent with design system
- **Impact:** Non-standard spacing approach
- **Fix:** Replace custom separator with standard figma spacing classes

---

## Low Severity Issues

### 11. Input Field Styling

- **Status:** [x] Fix | [ ] Bypass
- **Location:** `src/ui/components/steps/CustomSteps.tsx:95-103`
- **Visual Clue:** Check if the custom steps input field looks different from other input fields in the plugin
- **Impact:** Form element styling inconsistency
- **Fix:** Add proper figma input classes and standardize width approach

### 12. Inline Alignment Styling

- **Status:** [x] Fix | [ ] Bypass
- **Location:** `src/ui/components/helpers/Help.tsx:19`
- **Visual Clue:** Check vertical alignment of help elements - should be consistent with other inline elements
- **Impact:** Minor styling inconsistency
- **Fix:** Create reusable CSS class for vertical alignment

### 13. Icon Sizing Classes

- **Status:** [x] Fix | [ ] Bypass
- **Location:** `src/ui/components/PrimaryColors.tsx:96-99`
- **Visual Clue:** Compare icon sizes in PrimaryColors component with other icons throughout the plugin
- **Impact:** Icon size inconsistency
- **Fix:** Use figma icon sizing classes instead of FontAwesome sizing

### 14. ClassName Concatenation Issue

- **Status:** [x] Fix | [ ] Bypass
- **Location:** `src/ui/components/swatchesInput/Chip.tsx:22`
- **Visual Clue:** This is a code issue that could cause missing CSS classes
- **Impact:** Potential for missing styles
- **Fix:** Fix string concatenation logic for className

### 15. Commented Transitions

- **Status:** [ ] Fix | [-] Bypass
- **Location:** `src/ui/styles/figma/figma-styles.scss:315-322`
- **Visual Clue:** Check if input focus states have smooth transitions or appear abrupt
- **Impact:** Missing animation polish
- **Fix:** Either enable transition or remove commented code

### 16. Loading Text Consistency

- **Status:** [x] Fix | [ ] Bypass
- **Location:** `src/ui/components/swatchesOutput/OutputButtons.tsx:125-141`
- **Visual Clue:** Look at button text when loading - should be specific to the action being performed
- **Impact:** Generic loading messages reduce UX clarity
- **Fix:** Make loading text more specific to each button's action

---

## Summary

- **Total Issues:** 16
- **High Severity:** 2
- **Medium Severity:** 8
- **Low Severity:** 6

**Next Steps:**

1. Review each item visually in your UI
2. Mark the items you want fixed with [x]
3. Mark items to bypass with [-]
4. Tell me "execute marked fixes" when ready