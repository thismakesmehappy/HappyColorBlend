<!-- @tag:todo -->

# TODO List

## App

- ~~[ ] Add title bar~~
- [x] Increase padding
- [ ] Update formulas to calculate section sizes
- [ ] Refactor
- [x] Hex to uppercase
- [x] Add # to hex (when displayed)
- [ ] Accept on enter
- [ ] cancel on escape
- [x] update toggle to go gray on off

## Swatches

- [x] Vertical spacing between swatches of same base
- [ ] Add option for token name prefix
- [x] Add space between each group of swatches for each base
- [ ] Create a footer to generate output
    - [ ] Generate swatches in document
    - [ ] Generate Styles
    - [ ] Generate variables
- [x] Update swatches with different activities
    - [x] Update swatches when updating dark
    - [x] Update swatches when updating light
    - [x] Update swatches when updating equal steps
    - [x] Update swatches when updating include dark and light
    - [x] Update swatches when adding custom step
    - [x] Update swatches when removing custom step
    - [x] Update swatches when adding a base
    - [x] Update swatches when removing a base
    - [x] Update swatches when updating a base
- [x] Restyle to be better swatches
- [x] Blend tint to shade
- [x] Rename swatch to swatchInput
- [x] Refactor output swatches

## Test

- [x] Test Swatch component
- [ ] Test Swatches component
- [x] Test Interactions with swatches
- [x] Test equal steps
- [x] Test custom steps
- [x] Test badges
- [x] Test swatches

## Dark Light

- [x] Generalize terms
- [x] Reverse dark and light swatches

## Bases

- [x] Move generate new to same line as title

## Steps

- [ ] Update height to tallest of two sides
- [x] Disable decrease steps if steps === 3

## Testing Plan

### Core Components

- [ ] LeftColumn component tests
- [ ] RightColumn component tests

### Helper Components

- [x] Section component tests
- [x] RowDivider component tests
- [x] ColumnDivider component tests
- [x] Area component tests
- [x] Badge component tests
- [x] Toggle component tests
- [x] Toast component tests
- [x] FontAwesomeIcon component tests

### Main Feature Components

- [ ] ShadeTint component tests
- [ ] PrimaryColors component tests
- [ ] SwatchesOutput component tests

### Integration Tests

- [ ] Test App component
- [ ] Test interactions between components
- [ ] Test state management with Zustand store
- [ ] Test color generation workflow end-to-end

### UI/UX Tests

- [ ] Test responsive design
- [ ] Test keyboard navigation
- [ ] Test accessibility features

### Edge Cases

- [ ] Test with invalid color inputs
- [ ] Test with minimum and maximum step values
- [ ] Test with empty primary colors
- [ ] Test with many primary colors

### Performance Tests

- [ ] Test rendering performance with many swatches
- [ ] Test color calculation performance with complex blends

### Browser Compatibility

- [ ] Test in Chrome
- [ ] Test in Firefox
- [ ] Test in Safari
- [ ] Test in Edge

### Figma Plugin Integration

- [ ] Test plugin initialization
- [ ] Test communication between UI and plugin code
- [ ] Test color generation in Figma environment
- [ ] Test style and variable creation in Figma
