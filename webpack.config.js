const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => ({
  mode: argv.mode === 'production' ? 'production' : 'development',
  devtool: argv.mode === 'production' ? false : 'inline-source-map',

  entry: {
    ui: './src/ui/index.tsx',
    code: './src/code/code.ts',
    browser: './src/ui/browser.tsx', // Browser preview entry point
  },

  module: {
    rules: [
      // TypeScript
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      // CSS
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      // SCSS
      {
        test: /\.scss$/,
        use: [
          'style-loader', 
          'css-loader', 
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              sassOptions: {
                outputStyle: 'compressed',
              },
              api: 'modern',
            },
          }
        ],
      },
    ],
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.scss', '.css'],
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/ui/index.html',
      filename: 'ui.html',
      chunks: ['ui'],
      cache: false,
    }),
    new HtmlWebpackPlugin({
      template: './src/ui/index.html',
      filename: 'browser.html',
      chunks: ['browser'],
      cache: false,
    }),
  ],

  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: process.env.PORT || 3002,
    hot: true,
    // Open browser.html by default
    open: ['browser.html'],
  },
});
