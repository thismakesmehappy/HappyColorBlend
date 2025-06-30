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

- [x] LeftColumn component tests
- [x] RightColumn component tests

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

- [x] ShadeTint component tests
- [x] PrimaryColors component tests
- [x] SwatchesOutput component tests

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

# HappyColorBlendVibe - Refactoring & Optimization TODO

## 🏗️ Architecture & Code Organization

### High Priority

- [x] **Extract Business Logic from Components**
    - Move color calculation logic from components to dedicated service classes
    - Create `ColorCalculationService` and `SwatchGenerationService`
    - Separate UI logic from business logic for better testability

- [x] **Consolidate Store Management**
    - Merged `useSwatchStore` and `useTokenNameStore` into a single `useAppStore` with slices
    - Implemented proper store persistence for user preferences
    - Added store middleware for logging and debugging in development
    - Created compatibility layers to maintain backward compatibility

- [x] **Improve Type Safety**
    - Create comprehensive TypeScript interfaces for all data structures
    - Add strict type checking for color values and step configurations
    - Implement runtime type validation for external data

- [x] **Component Composition Refactoring**
    - Break down large components (`Steps.tsx`, `ShadeTint.tsx`) into smaller, focused components
    - Implement compound component patterns for complex UI sections
    - Create reusable layout components to reduce duplication

### Medium Priority

- [ ] **Custom Hooks Extraction**
    - Extract `useResizeObserver` hook from Steps component
    - Create `useColorCalculation` hook for color-related operations
    - Implement `useLocalStorage` hook for persisting user preferences
    - Add `useDebounce` hook for input optimization

- [ ] **Error Handling & Validation**
    - Implement comprehensive error boundaries
    - Add input validation with user-friendly error messages
    - Create error logging service for debugging
    - Add fallback states for failed operations

- [ ] **Constants & Configuration**
    - Centralize all magic numbers and configuration values
    - Create theme configuration for consistent styling
    - Implement feature flags for experimental features
    - Add environment-specific configurations

## ⚡ Performance Optimizations

### High Priority

- [x] **Memoization & Optimization**
    - Add `React.memo` to expensive components (Badge, SwatchColorChip)
    - Implement `useMemo` for color calculations and step generations
    - Use `useCallback` for event handlers passed to child components
    - Optimize re-renders with proper dependency arrays

- [ ] **Color Calculation Optimization**
    - Cache color calculations to avoid redundant computations
    - Implement Web Workers for heavy color processing
    - Add lazy loading for color palette generation
    - Optimize hex/RGB conversion functions

- [ ] **Bundle Size Optimization**
    - Implement code splitting for different plugin sections
    - Tree-shake unused FontAwesome icons
    - Optimize CSS bundle size by removing unused styles
    - Consider replacing heavy dependencies with lighter alternatives

### Medium Priority

- [ ] **Virtual Scrolling**
    - Implement virtual scrolling for large color palettes
    - Add pagination for extensive swatch collections
    - Optimize rendering of large step collections

- [ ] **State Management Optimization**
    - Implement selector optimization in Zustand stores
    - Add state normalization for complex data structures
    - Consider using Immer for immutable state updates
    - Add state persistence with compression

## 🧪 Testing Improvements

### High Priority

- [ ] **Test Coverage Enhancement**
    - Achieve 90%+ test coverage across all modules
    - Add integration tests for complete user workflows
    - Implement visual regression testing for UI components
    - Add performance benchmarking tests

- [ ] **Testing Infrastructure**
    - Set up automated testing pipeline
    - Add test data factories for consistent test setup
    - Implement custom testing utilities for common operations
    - Add accessibility testing with jest-axe

- [ ] **Mock Improvements**
    - Create comprehensive mocks for Figma API
    - Add realistic test data generators
    - Implement mock service workers for API testing
    - Standardize mock patterns across test files

### Medium Priority

- [ ] **E2E Testing**
    - Set up Playwright or Cypress for end-to-end testing
    - Add user journey tests for critical paths
    - Implement cross-browser testing
    - Add performance testing scenarios

## 🎨 UI/UX Enhancements

### High Priority

- [ ] **Accessibility Improvements**
    - Add ARIA labels and descriptions to all interactive elements
    - Implement keyboard navigation for all features
    - Ensure proper color contrast ratios throughout the UI
    - Add screen reader support for color information

- [ ] **Responsive Design**
    - Optimize layout for different Figma plugin window sizes
    - Add mobile-friendly touch interactions
    - Implement flexible grid system for better adaptability
    - Add zoom and scaling support

- [ ] **User Experience**
    - Add loading states for all async operations
    - Implement undo/redo functionality
    - Add keyboard shortcuts for power users
    - Create onboarding tour for new users

### Medium Priority

- [ ] **Visual Polish**
    - Implement smooth animations and transitions
    - Add micro-interactions for better feedback
    - Create consistent spacing and typography system
    - Add dark mode support

- [ ] **Advanced Features**
    - Add color palette export in multiple formats
    - Implement color harmony suggestions
    - Add color blindness simulation
    - Create preset color schemes

## 🔧 Developer Experience

### High Priority

- [ ] **Development Tooling**
    - Add ESLint and Prettier configuration
    - Implement pre-commit hooks with Husky
    - Add automated code formatting and linting
    - Set up development environment documentation

- [ ] **Build Process Optimization**
    - Optimize Webpack configuration for faster builds
    - Add hot module replacement for better development experience
    - Implement source map optimization
    - Add build performance monitoring

- [ ] **Documentation**
    - Create comprehensive API documentation
    - Add component documentation with Storybook
    - Write contribution guidelines
    - Document architecture decisions

### Medium Priority

- [ ] **Debugging & Monitoring**
    - Add development-only debugging tools
    - Implement performance monitoring
    - Add error tracking and reporting
    - Create debugging utilities for color calculations

## 🚀 Technical Debt & Cleanup

### High Priority

- [ ] **Code Quality**
    - Remove unused imports and dead code
    - Standardize naming conventions across the codebase
    - Fix TypeScript strict mode violations
    - Resolve all ESLint warnings and errors

- [ ] **Dependency Management**
    - Update all dependencies to latest stable versions
    - Remove unused dependencies
    - Audit dependencies for security vulnerabilities
    - Consider replacing heavy dependencies

- [ ] **File Organization**
    - Reorganize components into logical feature folders
    - Create consistent file naming conventions
    - Implement barrel exports for cleaner imports
    - Separate test files into dedicated test directories

### Medium Priority

- [ ] **Legacy Code Cleanup**
    - Remove commented-out code and TODO comments
    - Refactor complex functions into smaller, testable units
    - Standardize error handling patterns
    - Clean up console.log statements and debug code

## 📊 Monitoring & Analytics

### Low Priority

- [ ] **Usage Analytics**
    - Add anonymous usage tracking for feature adoption
    - Monitor performance metrics in production
    - Track user interaction patterns
    - Implement crash reporting

- [ ] **Performance Monitoring**
    - Add performance profiling for color calculations
    - Monitor bundle size and loading times
    - Track memory usage and potential leaks
    - Implement performance budgets

## 🔄 Continuous Improvement

### Ongoing

- [ ] **Regular Maintenance**
    - Schedule monthly dependency updates
    - Regular code review sessions
    - Performance audit quarterly
    - User feedback collection and implementation

- [ ] **Feature Development**
    - Implement user-requested features based on feedback
    - Add advanced color manipulation tools
    - Expand export format support
    - Integrate with design system tools

---

## Priority Legend

- **High Priority**: Critical for code quality, performance, or user experience
- **Medium Priority**: Important improvements that can be scheduled
- **Low Priority**: Nice-to-have features for future consideration
- **Ongoing**: Continuous maintenance tasks

## Implementation Notes

1. **Start with High Priority items** that have the biggest impact on code quality and maintainability
2. **Focus on one category at a time** to maintain momentum and avoid context switching
3. **Create separate branches** for each major refactoring effort
4. **Write tests first** when implementing new features or refactoring existing code
5. **Document decisions** and update this TODO as items are completed

## Estimated Timeline

- **Phase 1 (Weeks 1-2)**: Architecture & Code Organization (High Priority)
- **Phase 2 (Weeks 3-4)**: Performance Optimizations (High Priority)
- **Phase 3 (Weeks 5-6)**: Testing Improvements (High Priority)
- **Phase 4 (Weeks 7-8)**: UI/UX Enhancements (High Priority)
- **Phase 5 (Ongoing)**: Medium and Low Priority items based on user feedback

---

*Last Updated: June 19, 2025*
*Next Review: July 19, 2025*

## Create variables

- Create an interface that will add variables to Figma with the folliowing guidelines
- Create a method that creates a collection of variables; parameterize the collections's name and if we delete an
  existing collection with the same name or if we create a new one if there is collision
    - If there is collision and we don't delete the existing one, add the date and time to the old one
    - If there is collision and we delete, then delete the old collection before creating the new one
- Create a method that creates a new variable group. Parameterize the name of the group, what collection it goes under,
  and whether we allow name or not
    - If we accept name collision and there is collision, rename the old one with the date and time before creating the
      new one
    - If we don't accept name collision and there is collision, delete the old one before creating the new one
    - If the collection doesn't exist, error
    - Allow slash notation to nest groups
        - "mix/hot-pink" will crete a group "hot-pink" as a subgroup of "mix"
        - if "mix" doesn't exist, create "mix" first, then add "hot-pink" under it
        - if "mix" exists but "hot-pink" doesn't exist, then create "hot-punk" under it
        - if both "mix" and "hot-pink" exist, consider "hot-pink" to collide; only consider collission with the last
          group in the slash notation, any intermediary group is a path
- Create a method that creates a new color variable. Parameterize the name of the color variable, what collection it
  goes into, optional group name
    - Do not allow collision; if the variable exists, override it with the new one
    - If the collection doesn't exist, error
    - If the group doesn't exist, create it
    - If there is no group name, add it directly to the collection
- Create a method that will create the variables for all the swatches
    - create a new collection called "Color Blending"
    - create a new group within "Color Blending" called "primitives"
        - under primitive, add the tint, shade, and primary colors
        - the variable names should be the tint.name, shade.name and color.name after implementing the
          computeTokenName() method; remember to only add the separator if it's in the options
        - the variable values would be the corresponding color
    - create a new group within "Color Blending" called "mixed"
    - for the shade tint ramp and for each primary color, create a new sub group under mixed with the name of the
      primary color after implementing computeTokenName(); remember to only add the separator if it's in the options
    - in each subgroup, create variables for each of the steps for that subgroup; append the step number to the variable
      name and use the mixed color for the variable value
- If there is an error, display it in an error toast
- Once all variables are created, give a status update in a success toast