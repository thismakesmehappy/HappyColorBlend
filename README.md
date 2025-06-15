# HappyColorBlendVibe - Figma Color Palette Generator

A powerful Figma plugin for generating consistent color palettes with advanced tint/shade blending capabilities. Create beautiful, harmonious color systems for your design projects with customizable step intervals.

![HappyColorBlendVibe Screenshot](./docs/screenshot.png)

## Features

- **Advanced Color Blending**: Generate tints and shades with precise control over blending
- **Custom Step Intervals**: Define equal steps or add custom steps for fine-grained control
- **Real-time Preview**: See your color palette update in real-time as you make changes
- **Multiple Base Colors**: Create palettes from multiple base colors simultaneously
- **Figma Integration**: Export colors as Figma styles or variables
- **Accessible Design**: Built with accessibility in mind, ensuring proper contrast and readability

## Installation

### From Figma Plugin Store

1. Open Figma Desktop app
2. Go to Plugins > Browse plugins in Community
3. Search for "HappyColorBlendVibe"
4. Click "Install"

### For Development

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Build the plugin:
   ```
   npm run build
   ```
4. Open Figma Desktop app
5. Go to Plugins > Development > Import plugin from manifest...
6. Select the `manifest.json` file from this project

## Usage

1. Select one or more layers in Figma
2. Run the plugin from Plugins > HappyColorBlendVibe
3. Configure your base colors, tint, and shade settings
4. Adjust step intervals as needed
5. Preview your color palette in real-time
6. Export as Figma styles or variables, or create swatches directly in your document

## Development

### Prerequisites

- Node.js (v14 or later)
- npm (v7 or later)

### Development Workflow

#### Development Build

To start a development build with watch mode:

```
npm run dev
```

#### Browser Preview

To preview the plugin UI in a browser:

```
npm run preview
```

This will start a development server on port 3002 and open the plugin UI in your default browser. The browser preview includes a mock implementation of the Figma plugin API, allowing you to interact with the UI without running it in Figma.

You can specify a custom port by setting the PORT environment variable:

```
PORT=3005 npm run preview
```

#### Testing

Run all tests:

```
npm test
```

Run tests in watch mode for development:

```
npm test -- --watch
```

Run tests with coverage report:

```
npm test -- --coverage
```

#### Production Build

To create a production build:

```
npm run build
```

### Project Structure

- `src/ui/`: Contains all UI-related code (React components)
  - `components/`: UI components organized by functionality
    - `helpers/`: Reusable UI components (Badge, Toggle, Toast, etc.)
    - `steps/`: Step configuration components
    - `swatchesInput/`: Color input components
    - `swatchesOutput/`: Color output and preview components
  - `store/`: Zustand store for state management
  - `helpers/`: Utility functions and color calculation methods
  - `scss/`: Styling files
  - `interfaces/`: TypeScript interfaces and types
- `src/code/`: Contains the plugin's business logic
  - `controller.ts`: Main plugin controller
  - `figma/`: Figma-specific implementation
- `scripts/`: Build and utility scripts
- `dist/`: Build output directory
- `.amazonq/`: Project guidelines and rules

### Technology Stack

- **React**: For building the user interface
- **TypeScript**: For type safety and better developer experience
- **Zustand**: For state management
- **Jest & React Testing Library**: For testing
- **SCSS**: For styling
- **Webpack**: For bundling

## Contributing

We welcome contributions to HappyColorBlendVibe! Please see our [Contributing Guidelines](./CONTRIBUTING.md) for more information.

### Development Guidelines

- Follow the code style guidelines in [Project Guidelines](./.amazonq/rules/guidelines.md)
- Write tests for new features and bug fixes
- Ensure all tests pass before submitting a pull request
- Update documentation as needed

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Acknowledgments

- Thanks to the Figma team for their excellent plugin API
- Color calculation algorithms inspired by various color theory resources
- Icons provided by FontAwesome

## Plugin ID

This plugin uses ID: `1401662969387588671`
