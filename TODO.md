# TODO

## Data Persistence

- [ ] Investigate Figma persistence capabilities
- [ ] Implement data persistence if possible

## Custom Steps UX Improvements

- [ ] Start with empty custom steps instead of pre-populated
- [ ] Improve custom steps intuition and user flow
- [ ] Add better guidance for custom step input

## Color Management

- [ ] Implement hex-first color input approach
- [ ] Add automatic color naming from hex values
- [ ] Allow users to overwrite auto-generated names
- [ ] Explore multiple name generation options per color

## Visual Design Improvements

- [x] Add padding between color lines to prevent "connected" appearance
- [x] Match padding style used on the board
- [ ] Fix color preview that looks like a picker (make it clearer it's display-only)

## Light and Dark Section

- [ ] Rename "Light and Dark" to "Start and End" for better context
- [ ] Simplify the interface
- [ ] Reduce number of blue buttons
- [ ] Implement single "Update" button (blue primary)
- [ ] Keep reset buttons per field as secondary
- [ ] Change "Reset" to "Cancel" where appropriate
- [ ] Update style guide accordingly

## Instructions and Guidance

- [ ] Add instructions to each step/section
- [ ] Improve overall user guidance throughout the interface
- [x] Remove Instructions from accordion

## UI Improvements

- [x] Refactor buttons for consistency
- [ ] Audit UI consistency
- [ ] Consider monospace for output/chips
- [ ] Fix borders around focused input
- [ ] Move Clean variables toggle to naming options

## Code TODOs (Found in codebase)

### Refactoring Tasks

- [ ] **SwatchesOutput.tsx**: Refactor to an Output directory
- [ ] **OutputSection.tsx**: Refactor to an Output directory
- [ ] **LightAndDark.tsx**: Refactor code (line with TODO comment)

### Component Improvements

- [ ] **BrandColorInput.tsx**: Refactor color input into reusable component for dark/light sections
- [ ] **LightAndDark.tsx**: Add functionality for keyboard enter support
- [ ] **LightAndDark.tsx**: Change all form control inputs to size sm (appears twice)

---

## FOR REFERENCE

Original feedback list:

- Can figma persist?
- Custom steps are not intuitive
    - Start empty
    - Give it
- A lot of options
- Can we have it create names
    - Hex first
    - Auto names it
    - You can overwrite it
    - Can it generate multiple names?
- The two lines make it look like they are connected
    - Add padding like on the board
- No instructions
    - Do it in each step
- The color preview looks like a picker
- Light and dark -> start and end
    - More context
    - Simplify
- Dark and light
    - Fewer blue buttons
    - One update button (blue)
    - Keep reset per field, secondary
    - Cancel instead of reset
    - Update style guide
