const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const sass = require('sass');

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
                exclude: [
                    /node_modules/,
                    /\.test\.(ts|tsx)$/,
                    /\.spec\.(ts|tsx)$/,
                ],
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
                            implementation: sass,
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
        // Don't open browser automatically, our custom script will handle it
        open: false,
    },

    // Performance optimizations
    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
                react: {
                    test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                    name: 'react',
                    chunks: 'all',
                },
            },
        },
        usedExports: true,
        sideEffects: false,
    },

    // Performance budgets and warnings
    performance: {
        maxAssetSize: 500000, // 500kb
        maxEntrypointSize: 500000, // 500kb
        hints: argv.mode === 'production' ? 'warning' : false,
    },
});
