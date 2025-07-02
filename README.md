# 🎨 Happy Color Blend Vibe

A powerful Figma plugin for creating beautiful color palettes and swatches with intelligent blending and color extraction capabilities.

## ✨ Features

### 🎯 **Primary Color Management**
- **Eye-Dropper Color Extraction**: Extract colors directly from selected Figma objects
- **Duplicate Prevention**: Automatically detects and prevents duplicate colors (case-insensitive)
- **Smart Color Naming**: Uses intelligent color naming with the color-namer library
- **Random Color Generation**: Generate random colors for inspiration
- **Interactive Swatches**: Edit, rename, and delete primary colors with ease

### 🌈 **Advanced Color Blending**
- **Shade & Tint Generation**: Create darker shades and lighter tints from your primary colors
- **Custom Step Control**: Define custom step values for precise color gradations
- **Equal Steps Mode**: Generate evenly distributed color steps
- **Real-time Preview**: See your color palette update in real-time

### 🎨 **Design Token Export**
- **Multiple Formats**: Export as CSS variables, JSON, or other design token formats
- **Configurable Naming**: Customize naming conventions for your design tokens
- **Professional Output**: Generate production-ready color systems

### 🔧 **Developer-Friendly**
- **Type-Safe**: Built with TypeScript for reliability
- **Comprehensive Testing**: 30+ test cases ensuring robust functionality
- **Modern Architecture**: React + Vite + Zustand for optimal performance
- **Toast Notifications**: User-friendly feedback for all actions

## 🚀 How to Use

### 1. Installing the Plugin
1. In Figma, go to **Plugins > Development > Import plugin from manifest...**
2. Select the `dist/manifest.json` file from this project
3. The plugin will appear in your **Plugins > Development** menu

### 2. Creating Primary Colors

#### **Manual Color Addition**
- Click the **➕ plus icon** to add a random color
- Click any swatch to edit its color and name
- Use the **🗑️ delete button** to remove unwanted colors

#### **Eye-Dropper Extraction**
1. Select objects in your Figma design
2. Click the **👁️ eye-dropper icon** in the Primary Colors section
3. The plugin will extract all unique colors from your selection
4. Duplicate colors are automatically filtered out with a helpful warning

### 3. Generating Color Palettes
1. **Choose your blend mode**: 
   - **Shade & Tint**: Create darker and lighter variations
   - **Custom Steps**: Define specific step values for precise control
2. **Set step count**: Choose how many color variations you want
3. **Preview in real-time**: Your palette updates automatically

### 4. Exporting Design Tokens
1. Configure your naming conventions in the settings
2. Choose your export format (CSS, JSON, etc.)
3. Copy the generated tokens to use in your design system

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
- **Unit Tests**: 30+ test cases covering all functionality
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

This project is built on top of the excellent [Figma Plugin Boilerplate: React + Vite](https://github.com/CoconutGoodie/figma-plugin-react-vite) by Taha Anılcan Metinyurt (iGoodie).

### Parent Project License
The original boilerplate is licensed under the [Attribution-ShareAlike 4.0 International](http://creativecommons.org/licenses/by-sa/4.0/) license.

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