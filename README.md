# 🎨 Color Scales

**Generate professional color scales with live preview and multiple output formats.**

Create consistent color systems from brand colors with advanced blending controls, custom naming conventions, and instant export to Figma assets or code.

## How to use Color Scales

1) **Add brand colors** - Input hex values and name them manually or let the plugin auto-name them
2) **Set steps** - Choose equal steps or define custom step values
3) **Configure tint and shade** - Customize blend endpoints and neutral scale name
4) **Adjust naming options** - Set case, spacing, and separator preferences
5) **Create assets** - Generate Figma variables, styles, swatches, or export CSS/SCSS

## Why use Color Scales?

**See results instantly** with live preview as you adjust settings
**Create Figma assets directly** - variables, color styles, and swatches in your file
**Export clean code** with CSS/SCSS variables (clipboard or file download)
**Customize everything** from blend endpoints to naming conventions
**Maintain organized systems** with smart archiving and version control
**Settings remember automatically** - your configuration saves with each Figma file

## Key Features

🎨 **Smart Color Input** - Input hex values and name manually or use auto-naming
📐 **Flexible Step Control** - Choose equal steps or define custom step values
🌈 **Advanced Blending** - Set custom start/end colors beyond black/white mixing
🏷️ **Smart Naming** - Configurable case, spacing, and separator options
📦 **Multiple Outputs** - Figma variables, styles, swatches, CSS, and SCSS
👀 **Live Preview** - See color scales update instantly as you change settings
💾 **Auto-Save Settings** - Configuration remembers automatically in each file
🗂️ **Archive Management** - Organized versioning with date-based collections

## Perfect for

Design system creators building consistent palettes
UI/UX teams needing organized color workflows
Developers wanting clean design tokens
Anyone creating professional color scales with precise control

## 🚀 Installation

Find **Color Scales** in the Figma Community plugins and install it directly to your account.

## 🛠️ Development

### Prerequisites

- Node.js (v18 or higher)
- npm
- Figma Desktop App

### Setup

```bash
# Clone and install dependencies
npm install

# Start development mode
npm run watch

# Run tests
npm test

# Build for production
npm run build
```

### Development Commands

- `npm run watch` - Start development with hot reload
- `npm run preview` - Preview the plugin during development
- `npm test` - Run the test suite
- `npm test -- --watch` - Run tests in watch mode
- `npm run build` - Build for production
- `npm run types` - Type check the codebase

### Installing Development Version

1. In Figma, go to **Plugins > Development > Import plugin from manifest...**
2. Select the `dist/manifest.json` file from this project
3. The plugin will appear in your **Plugins > Development** menu

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

### Acknowledgments

Special thanks to **Christine Sheller** and **Luis Cielak** for providing valuable user feedback

## 📞 Contact & Support

- **Email**: figma@thismakesmehappy.co
- **Website**: thismakesmehappy.co/figma
- **Issues**: Open an issue on this repository for bug reports or feature requests

---

**Create beautiful color scales!** 🎨✨