const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');
const ghpages = require('gh-pages');

//ghpages.publish('dist', {repo: 'https://github.com/meanttobehere/meanttobehere.github.io.git', branch: 'master'});

module.exports = {
    entry: {
        slider: { 
            import: './src/slider.ts', 
            filename: 'lib/[name].js',
            library: {                
                name: 'superSlider',
                type: 'umd',
                umdNamedDefine: true,
            },
        },
        demopage: { 
            import: './example/index.ts', 
            filename: 'demo/index.js', 
        },             
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },

            {
                test: /\.css$/i,                
                use: [MiniCssExtractPlugin.loader, "css-loader"],
                include: /src/,
            },

            {
                test: /\.css$/i,                
                use: ["style-loader", "css-loader"],
                exclude: /src/,
            }
        ],
    },

    resolve: {
        extensions: ['.ts', '.js'],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "./example/index.html"),
            filename: "demo/index.html",
        }),
        new MiniCssExtractPlugin({
            filename: "lib/[name].css",
        })
    ],
}