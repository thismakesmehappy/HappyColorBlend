# 🎨 Happy Color Blend Vibe

A Figma plugin for creating color scales from primary colors. The plugin allows the user to create production-ready
assets: swatches, color styles, Figma variables, and SCSS/CSS variables.

## ✨ Features

### 🎯 **Primary Color Management**

- **Color Extraction**: Extract colors directly from selected Figma objects or enter them manually
- **Smart Color Naming**: Uses intelligent color naming with the color-namer library; user can edit all color names
- **Random Color Generation**: Generates random colors for inspiration
- **Interactive Swatches**: Edit, rename, and delete primary colors with ease and see the results live

### 🌈 **Advanced Color Blending**

- **Select color endpoints**: Select endpoints to replace black and white in the mixing of colors
- **Gradient Direction Control**: Flip the endpoints to flip the order of the mix
- **Step Control**: Define the number of evenly distributed color steps or specify custom step values for precise color
  gradations

### 🎨 **Design Token Export**

- **Figma assets**: Generate Figma variables, color styles, or swatches
- **CSS/SCSS variables**: Export color variables fo CSS or SCSS
- **Configurable Naming**: Customize naming conventions for your design tokens

## 🚀 How to Use

### 1. Installing the Plugin

1. In Figma, go to **Plugins > Development > Import plugin from manifest...**
2. Select the `dist/manifest.json` file from this project
3. The plugin will appear in your **Plugins > Development** menu

### 2. Creating Primary Colors

#### **Manual Color Addition**

- Click the **plus icon** to add a random color
- Click any **pencil icon**  to edit its color and name
- Use the **trash can icon** to remove unwanted colors

#### **Eye-Dropper Extraction**

1. Select objects in your Figma design
2. Click the **eyedropper icon** in the Primary Colors section
3. The plugin will extract all unique colors from your selection
4. Duplicate colors are automatically filtered out with a helpful warning
5. For endpoints, select a single object before clicking the eyedropper.

### 3. Generating Color Palettes

1. **Choose your steps**:
    - **Equal steps**: Divides the space into equal steps
    - **Custom Steps**: You can define additional steps manually for added control
2. **Naming conventions**:
    - **Casing** Determine if words will be lowercase, all caps, title case, or preserve case
    - **Spaces**: Keep spaces, remove spaces, or convert them to dashes or underscores
    - **Leading and trailing characters**: Add leading dashes or underscores

### 4. Exporting Design Tokens

1. Create Figma variables
2. Create color styles
3. Create swatches on your figma file
4. Export CSS or SCSS variables to the clipboard

## 🛠️ Development

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Figma Desktop App

### Setup

```bash
# Clone and install dependencies
npm install

# Start development mode
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

### Development Commands

- `npm run dev` - Start development with hot reload
- `npm run dev:ui-only` - Develop UI in browser without Figma context
- `npm run test` - Run the test suite
- `npm run test -- --watch` - Run tests in watch mode
- `npm run build` - Build for production
- `npm run types` - Type check the codebase

### File Structure

```
src/
├── common/          # Shared code between plugin and UI
├── plugin/          # Figma plugin-side code
├── ui/              # React UI components
│   ├── components/  # React components
│   ├── store/       # Zustand state management
│   ├── styles/      # Sass/SCSS styles
│   └── helpers/     # Utility functions
└── constants/       # Shared constants
```

## 🧪 Testing

The plugin includes comprehensive testing with:

- **Unit Tests**: 390+ test cases covering all functionality
- **Integration Tests**: Complete user workflow testing
- **Error Handling**: Robust error scenarios and edge cases
- **React Testing Library**: Modern testing practices

Run tests with:

```bash
npm test                    # Run all tests
npm test -- --watch        # Watch mode
npm test -- ComponentName  # Run specific tests
```

## 🎨 Key Technologies

- **React 18**: Modern React with hooks and concurrent features
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and development server
- **Zustand**: Lightweight state management
- **Sass/SCSS**: Advanced styling with 7-1 architecture
- **Bootstrap**: Responsive UI components
- **Jest + RTL**: Comprehensive testing framework
- **Figma Plugin API**: Deep Figma integration

## 📝 License & Attribution

This project is built on top of the
excellent [Figma Plugin Boilerplate: React + Vite](https://github.com/CoconutGoodie/figma-plugin-react-vite) by Taha
Anılcan Metinyurt (iGoodie).

### Parent Project License

The original boilerplate is licensed under
the [Attribution-ShareAlike 4.0 International](http://creativecommons.org/licenses/by-sa/4.0/) license.

<a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" /></a>

### Acknowledgments

Special thanks to:

- **Taha Anılcan Metinyurt (iGoodie)** for the amazing Figma plugin boilerplate
- **The Figma Plugin Community** for inspiration and best practices
- **Contributors** to the open-source libraries that make this plugin possible

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and add tests
4. Ensure all tests pass: `npm test`
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

## 🐛 Issues & Support

If you encounter any issues or have suggestions for improvements, please open an issue on the repository.

---

**Happy Color Blending!** 🎨✨