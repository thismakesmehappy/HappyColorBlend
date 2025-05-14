# Hello World Figma Plugin

A minimal Figma plugin that demonstrates the separation of UI and business logic using React, TypeScript, and Bootstrap.

## Features

- React for UI components
- TypeScript for type safety
- Precompiled Bootstrap for styling
- Clear separation between UI and business logic

## Development

### Prerequisites

- Node.js and npm

### Setup

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```

### Development Build

To start a development build with watch mode:

```
npm run dev
```

### Browser Preview

To preview the plugin UI in a browser:

```
npm run preview
```

This will start a development server on port 3002 and open the plugin UI in your default browser. The browser preview includes a mock implementation of the Figma plugin API, allowing you to interact with the UI without running it in Figma.

You can specify a custom port by setting the PORT environment variable:

```
PORT=3005 npm run preview
```

### Production Build

To create a production build:

```
npm run build
```

### Loading the Plugin in Figma

1. Open Figma Desktop app
2. Go to Plugins > Development > Import plugin from manifest...
3. Select the `manifest.json` file from this project

## Project Structure

- `src/ui/`: Contains all UI-related code (React components)
- `src/code/`: Contains the plugin's business logic
- `dist/`: Build output directory

## Plugin ID

This plugin uses ID: `1401662969387588671`
