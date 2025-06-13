# HappyColorBlendVibe Project Guidelines

## Project Overview

This is a Figma plugin for color palette generation with tint/shade blending capabilities.

## Project Structure

- `src/code/`: Contains the Figma plugin code
- `src/ui/`: Contains the React UI components
    - `components/`: UI components organized by functionality
    - `store/`: Zustand store for state management
    - `helpers/`: Utility functions
    - `scss/`: Styling files
- `scripts/`: Build and utility scripts

## Code Style Guidelines

- Use TypeScript for all new code
- Follow React functional component patterns with hooks
- Use Zustand for state management
- Maintain consistent naming conventions:
    - React components: PascalCase
    - Functions and variables: camelCase
    - Constants: UPPER_SNAKE_CASE
- Add proper TypeScript interfaces for all props and state

## Implementation Guidelines

- Keep components small and focused on a single responsibility
- Maintain the existing design system and UI patterns
- Use the existing CSS classes (figma-* prefixed classes)
- Ensure all UI elements are accessible
- Add proper keyboard navigation support where applicable

## Testing

- Jest is used for comprehensive automated testing
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

## Build Process

- The project uses webpack for building
- Run `npm run build` to build the project
- Run `npm run watch` for development with hot reloading
- Run `npm run previw` to preview while developing