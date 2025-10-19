# TODO

## Data Persistence

- [ ] Investigate Figma persistence capabilities
- [ ] Implement data persistence if possible

## Custom Steps UX Improvements

- [x] Start with empty custom steps instead of pre-populated
- [x] Improve custom steps intuition and user flow
- [x] Add better guidance for custom step input

## Color Management

- [x] Implement hex-first color input approach
- [x] Add automatic color naming from hex values
- [x] Allow users to overwrite auto-generated names
- [ ] Explore multiple name generation options per color
- [x] Change preview to have a red outline rather than a line-through

## Visual Design Improvements

- [x] Add padding between color lines to prevent "connected" appearance
- [x] Match padding style used on the board
- [x] Fix color preview that looks like a picker (make it clearer it's display-only)

## Light and Dark Section

- [x] Rename "Light and Dark" to "Start and End" for better context
- [x] Simplify the interface
- [x] Reduce number of blue buttons
- [x] Implement single "Update" button (blue primary)
- [x] Keep reset buttons per field as secondary
- [x] Change "Reset" to "Cancel" where appropriate
- [x] Update style guide accordingly

## Instructions and Guidance

- [x] Add instructions to each step/section
- [x] Improve overall user guidance throughout the interface
- [x] Remove Instructions from accordion

## UI Improvements

- [x] Refactor buttons for consistency
- [ ] Create Components for different types of buttons
- [ ] Audit UI consistency
- [ ] Consider monospace for output/chips
- [x] Fix borders around focused input
- [x] Fix issue with controlId
- [x] #### Move clean CSS/SCSS variables to naming options
    - Make it compliant vs custom (follow standard naming vs include naming options)
- [x] Move Light and Dark arond with explanations
- [x] Add red outline to custom steps when invalid
- [x] Limit custom steps to 3 digits
- [x] Fix stray line before brand color previews
- [ ] Update output swatches to be more evenly space
- [ ] Differentiate the tint and shade in the output
- [ ] Fix explanation for custom steps ("add them as custom steps")

## Code TODOs (Found in codebase)

### Refactoring Tasks

- [x] **SwatchesOutput.tsx**: Refactor to an Output directory
- [x] **OutputSection.tsx**: Refactor to an Output directory
- [x] **LightAndDark.tsx**: Refactor code (line with TODO comment)

### Component Improvements

- [x] **BrandColorInput.tsx**: Refactor color input into reusable component for dark/light sections
- [x] **LightAndDark.tsx**: Add functionality for keyboard enter support
- [x] **LightAndDark.tsx**: Change all form control inputs to size sm (appears twice)

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
