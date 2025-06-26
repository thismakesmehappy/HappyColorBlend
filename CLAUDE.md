# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Testing:**
- `npm test` - Run Jest tests
- `npm test -- --watch` - Run tests in watch mode
- `npm test -- ComponentName.test.tsx` - Run specific test file

**Development:**
- `npm run dev` - Start development mode (builds plugin and UI with watch)
- `npm run dev:ui-only` - Run UI in browser without Figma context for faster development

**Building:**
- `npm run build` - Full production build (runs types check, clean, then builds UI and plugin)
- `npm run types` - Run TypeScript type checking for both src and node
- `npm run clean` - Clean dist folder

**Type Checking:**
- `npm run types` - Check TypeScript types for all code
- `npm run types:src` - Check types for src directory only
- `npm run types:node` - Check types for node configuration

## Project Architecture

This is a **Figma plugin** built with React + Vite that creates color swatches and palettes. The plugin operates on two logical sides:

### Two-Side Architecture
- **Plugin side** (`src/plugin/`): Runs in Figma's main thread, handles Figma API calls
- **UI side** (`src/ui/`): React application that renders the plugin interface
- **Shared code** (`src/common/`): Code used by both sides, including network communication

### Communication Between Sides
Uses `monorepo-networker` library for type-safe communication between plugin and UI sides. Event definitions are in `src/common/networkSides.ts`.

### State Management
- **Zustand** for UI state management (`src/ui/store/`)
- Main store: `useSwatchStore.ts` - manages color swatches, steps, primary colors
- Token naming store: `useTokenNameStore.ts` - handles design token naming conventions

### Key Features
- **Color swatch generation**: Creates color ramps from shade/tint/primary colors
- **Custom steps**: Supports both equal steps and custom step values
- **Design token export**: Generates design tokens with configurable naming
- **Real-time preview**: Live updates as users modify colors and settings

### Component Architecture
- **Section-based layout**: `SwatchInputSection`, `SettingsSection`, `OutputSection`
- **Modular components**: Each component has its own test file
- **Helper components**: Reusable UI elements in `src/ui/components/helpers/`

### Path Aliases
- `@common/*` → `src/common/*`
- `@ui/*` → `src/ui/*` 
- `@plugin/*` → `src/plugin/*`

### Testing Setup
- **Jest** with `ts-jest` and `jsdom` environment
- **React Testing Library** for component testing
- Test files use `.test.ts` or `.test.tsx` extensions
- Setup file: `src/setupTests.ts`

### Styling
- **Sass/SCSS** with 7-1 architecture in `src/ui/styles/`
- **Bootstrap** integration
- **Figma-specific styles** for native plugin appearance
- **CSS Modules** support available

## Important Notes

- Plugin manifest is defined in `figma.manifest.ts` (not JSON)
- SVG imports require query parameters: `?component`, `?url`, or `?raw`
- Development builds go to `dist/` folder for Figma loading
- Plugin ID in manifest must match Figma's generated ID