# UI Components Directory

This directory contains reusable UI components for the HappyColorBlendVibe Figma plugin.

## Guidelines

1. All new React components should be placed in this directory.
2. Each component should be in its own file or subdirectory (for complex components).
3. Components should be reusable and follow consistent naming conventions.
4. Export components from this directory to be used in the main App or other components.

## Example Structure

```
components/
├── Button/
│   ├── Button.tsx
│   ├── Button.scss
│   └── index.ts
├── ColorPicker/
│   ├── ColorPicker.tsx
│   ├── ColorPicker.scss
│   └── index.ts
├── SimpleComponent.tsx
└── README.md
```

## Best Practices

- Keep components small and focused on a single responsibility
- Use TypeScript interfaces to define component props
- Consider using React.memo() for performance optimization when appropriate
- Document complex components with comments