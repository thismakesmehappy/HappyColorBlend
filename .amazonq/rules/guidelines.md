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
  - `store/`: Zustand store for state management
  - `helpers/`: Utility functions and color calculation methods
  - `scss/`: Styling files
  - `interfaces/`: TypeScript interfaces and types
- `scripts/`: Build and utility scripts
- `dist/`: Build output directory
- `.amazonq/`: Project guidelines and rules

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

## State Management

- Use Zustand for global state management
- Keep component state local when possible
- Follow immutable state update patterns
- Use selectors to access only needed state
- Organize store by feature/domain
- Document store structure and actions

## Testing

- Jest is used for comprehensive automated testing
- React Testing Library for component tests
- Test each component individually to ensure proper rendering and functionality
- Cover all user cases and edge cases in tests
- Test color calculation functions for accuracy across various inputs
- Ensure responsive design works across different Figma plugin window sizes
- Use data-testid attributes for test selectors instead of implementation-specific selectors
- Follow these testing best practices:
  - Test component rendering with different props
  - Test user interactions and state changes
  - Test conditional rendering based on props
  - Test callback functions are called correctly
  - Avoid testing implementation details
  - Mock external dependencies
  - Use setup and teardown functions
  - Group related tests with describe blocks
  - Write clear test descriptions
  - Test accessibility compliance

## Build Process

- The project uses webpack for building
- Run `npm run build` to build the project
- Run `npm run watch` for development with hot reloading
- Run `npm run preview` to preview while developing
- Run `npm test` to run all tests
- Run `npm test -- --watch` for test-driven development

## Deployment

- Update version in manifest.json before releasing
- Create a production build with `npm run build`
- Test the build in Figma before publishing
- Document changes in CHANGELOG.md
- Tag releases in git with semantic versioning

## Performance Considerations

- Optimize render performance with React.memo for expensive components
- Use useCallback and useMemo for performance-critical functions
- Minimize re-renders by using proper dependency arrays in hooks
- Optimize color calculations for large palettes
- Consider lazy loading for components not immediately visible
- Profile and optimize performance bottlenecks

## Accessibility Guidelines

- Ensure proper color contrast (WCAG AA compliance)
- Implement keyboard navigation
- Use semantic HTML elements
- Add proper ARIA attributes
- Test with screen readers
- Support different color modes (light/dark)
- Provide text alternatives for visual information
