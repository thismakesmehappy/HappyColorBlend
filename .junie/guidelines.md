# HappyColorBlendVibe - Junie Usage Guidelines

## Project Overview
This is a Figma plugin for color palette generation with advanced tint/shade blending capabilities. The project uses React, TypeScript, Zustand for state management, and has a well-established testing framework with Jest.

## Quota Optimization Strategies

### 1. Efficient File Exploration
- **Always use `get_file_structure` before opening files** to understand the code organization
- **Use `search_project` with specific terms** instead of opening multiple files randomly
- **Focus on relevant directories**: 
  - `src/ui/components/` for UI components
  - `src/ui/services/` for business logic
  - `src/ui/store/` for state management
  - `src/ui/hooks/` for custom hooks

### 2. Targeted Code Changes
- **Review TODO.md first** to understand current priorities and completed work
- **Use the existing architecture**: Services for business logic, hooks for reusable logic, components for UI
- **Follow established patterns**: The project has clear separation of concerns
- **Make minimal, focused changes** rather than large refactors

### 3. Testing Strategy
- **Run tests to verify changes**: `npm test`
- **Focus on affected components** when making changes
- **Use existing test patterns** found in `*.test.ts` files
- **Test files are co-located** with their components

## Project Structure

### Key Directories
```
src/
├── code/           # Figma plugin controller code
├── ui/
│   ├── components/ # React components (organized by feature)
│   │   ├── helpers/     # Reusable UI components
│   │   ├── steps/       # Step configuration components
│   │   ├── swatchesInput/   # Color input components
│   │   └── swatchesOutput/  # Color output components
│   ├── services/   # Business logic services
│   ├── hooks/      # Custom React hooks
│   ├── store/      # Zustand state management
│   ├── scss/       # Styling files
│   └── interfaces/ # TypeScript interfaces
```

### Key Files to Understand
- `src/ui/store/useSwatchStore.ts` - Main application state
- `src/ui/hooks/useColorCalculation.ts` - Color calculation logic
- `src/ui/services/` - Business logic services
- `TODO.md` - Current priorities and completed work
- `guidelines.md` - Project architecture and coding standards

## Testing Requirements
- **Always run tests** after making changes: `npm test`
- **Run specific test files** when working on components: `npm test ComponentName.test.ts`
- **Use test-driven development** when adding new features
- **Follow existing test patterns** using React Testing Library

## Build Process
- **Build the project** before submitting: `npm run build`
- **Use watch mode** during development: `npm run watch`
- **Preview changes** with: `npm run preview`

## Code Style Requirements
- **Use TypeScript** for all new code
- **Follow existing naming conventions**:
  - Components: PascalCase
  - Functions/variables: camelCase
  - Constants: UPPER_SNAKE_CASE
- **Add proper TypeScript interfaces** for all props and state
- **Use JSDoc comments** for functions and components
- **Keep line length under 100 characters**
- **Use 2-space indentation**

## Architecture Guidelines
- **Separate business logic from UI components** using services
- **Use custom hooks** for reusable logic
- **Follow the existing store structure** with Zustand
- **Maintain component composition patterns**
- **Keep components small and focused**

## Performance Considerations
- **Use React.memo** for expensive components
- **Implement useMemo/useCallback** for performance-critical functions
- **Optimize color calculations** for large palettes
- **Consider lazy loading** for non-critical components

## Common Tasks & Efficient Approaches

### Adding New Features
1. Check TODO.md for context and priorities
2. Review existing similar components/services
3. Use `search_project` to find relevant code patterns
4. Follow established architecture (services → hooks → components)
5. Add tests following existing patterns
6. Run tests and build before submitting

### Bug Fixes
1. Use `search_project` to locate the issue
2. Check related test files for context
3. Make minimal, targeted changes
4. Verify fix with existing tests
5. Add regression tests if needed

### Refactoring
1. Review TODO.md for planned refactoring tasks
2. Focus on high-priority items first
3. Maintain existing API contracts
4. Update tests as needed
5. Verify no functionality is broken

## Quota-Saving Tips
- **Start with `search_project`** to locate relevant code quickly
- **Use `get_file_structure`** before opening large files
- **Focus on TODO.md priorities** to avoid unnecessary exploration
- **Make incremental changes** rather than large rewrites
- **Leverage existing patterns** instead of creating new ones
- **Run targeted tests** instead of full test suite when possible
