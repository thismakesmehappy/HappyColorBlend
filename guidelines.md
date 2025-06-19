# HappyColorBlendVibe Project Guidelines

## Project Overview

HappyColorBlendVibe is a Figma plugin for color palette generation with advanced tint/shade blending capabilities. It allows designers to create consistent color palettes by defining base colors and generating tints and shades with customizable steps.

## Key Features

- Generate color palettes from base colors
- Customize tint and shade blending
- Define equal or custom step intervals
- Preview color swatches in real-time
- Export colors as Figma styles or variables

## Project Structure

- `src/code/`: Contains the Figma plugin code
  - `controller.ts`: Main plugin controller
  - `figma/`: Figma-specific implementation
- `src/ui/`: Contains the React UI components
  - `components/`: UI components organized by functionality
    - `helpers/`: Reusable UI components (Badge, Toggle, Toast, etc.)
    - `steps/`: Step configuration components
    - `swatchesInput/`: Color input components
    - `swatchesOutput/`: Color output and preview components
  - `services/`: Business logic services
    - `ColorCalculationService.ts`: Handles color calculations and validations
    - `SwatchGenerationService.ts`: Manages swatch generation and step calculations
    - `PrimaryColorService.ts`: Handles primary color operations
    - `ValidationService.ts`: Provides validation utilities
  - `hooks/`: Custom React hooks
    - `useColorCalculation.ts`: Hook for color calculations and swatch generation
  - `store/`: Zustand store for state management
    - `useSwatchStore.ts`: Main store for swatch and color state
    - `useTokenNameStore.ts`: Store for token naming
  - `scss/`: Styling files
  - `interfaces/`: TypeScript interfaces and types
- `scripts/`: Build and utility scripts
- `dist/`: Build output directory
- `.amazonq/`: Project guidelines and rules

## Architecture

### Business Logic Extraction

The project follows a clean architecture approach by separating business logic from UI components. Business logic has been extracted into dedicated service classes:

1. **ColorCalculationService**: Handles color-related calculations and validations
   - `validateHexColor`: Validates hex color format
   - `generateRandomColor`: Generates random colors
   - `isLightColor`: Determines if a color is light or dark
   - `blendColor`: Blends colors based on specified parameters

2. **SwatchGenerationService**: Manages swatch generation and step calculations
   - `generateEqualSteps`: Generates equal step intervals
   - `combineSteps`: Combines equal and custom steps
   - `validateCustomStep`: Validates custom step values
   - `sortSteps`: Sorts steps in ascending order
   - `buildSwatches`: Builds swatches based on input parameters

3. **PrimaryColorService**: Handles primary color operations
   - Manages primary color creation and manipulation

4. **ValidationService**: Provides validation utilities
   - Validates input values and provides error messages

### Custom Hooks

Custom hooks have been created to encapsulate related functionality:

1. **useColorCalculation**: Provides color calculation and swatch generation functions
   - Memoizes expensive calculations for better performance
   - Provides a clean interface for components to access color-related functionality

### State Management

The project uses Zustand for state management:

1. **useSwatchStore**: Main store for swatch and color state
   - Manages shade, tint, primary colors, steps, and swatches
   - Delegates business logic to service classes

2. **useTokenNameStore**: Store for token naming
   - Manages token naming conventions and preferences

## Code Style Guidelines

- Use TypeScript for all new code
- Follow React functional component patterns with hooks
- Use Zustand for state management
- Maintain consistent naming conventions:
  - React components: PascalCase
  - Functions and variables: camelCase
  - Constants: UPPER_SNAKE_CASE
  - Files: Component files match component name (PascalCase)
  - Test files: ComponentName.test.tsx
- Add proper TypeScript interfaces for all props and state
- Use JSDoc comments for functions and components
- Keep line length under 100 characters
- Use 2-space indentation

## Implementation Guidelines

- Keep components small and focused on a single responsibility
- Maintain the existing design system and UI patterns
- Use the existing CSS classes (figma-* prefixed classes)
- Ensure all UI elements are accessible
- Add proper keyboard navigation support where applicable
- Follow the container/presentational component pattern
- Use React hooks for state and side effects
- Avoid class components unless absolutely necessary
- Implement proper error handling and user feedback
- Use TypeScript generics and utility types where appropriate

## Refactoring Recommendations

Based on the current codebase, the following refactoring tasks are recommended:

1. **Extract remaining business logic from useSwatchStore**:
   - Move `createSteps` method to SwatchGenerationService
   - Extract sorting logic from `addCustomStep` to a service

2. **Create custom hooks for UI-related functionality**:
   - Extract `useResizeObserver` hook from Steps component
   - Create `useLocalStorage` hook for persisting user preferences

3. **Consolidate Store Management**:
   - Consider merging `useSwatchStore` and `useTokenNameStore` into a single store with slices
   - Implement proper store persistence for user preferences

4. **Component Composition Refactoring**:
   - Break down large components (`Steps.tsx`, `ShadeTint.tsx`) into smaller, focused components
   - Implement compound component patterns for complex UI sections

## Testing

- Jest is used for comprehensive automated testing
- React Testing Library for component tests
- Test each component individually to ensure proper rendering and functionality
- Cover all user cases and edge cases in tests
- Test color calculation functions for accuracy across various inputs
- Ensure responsive design works across different Figma plugin window sizes
- Use data-testid attributes for test selectors instead of implementation-specific selectors

## Build Process

- The project uses webpack for building
- Run `npm run build` to build the project
- Run `npm run watch` for development with hot reloading
- Run `npm run preview` to preview while developing
- Run `npm test` to run all tests
- Run `npm test -- --watch` for test-driven development

## Performance Considerations

- Optimize render performance with React.memo for expensive components
- Use useCallback and useMemo for performance-critical functions
- Minimize re-renders by using proper dependency arrays in hooks
- Optimize color calculations for large palettes
- Consider lazy loading for components not immediately visible
- Profile and optimize performance bottlenecks