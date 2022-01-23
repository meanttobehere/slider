const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const path = require('path');

module.exports = {
  devServer: {
    static: './dist',
    compress: true,
    open: ['/demo/index.html'],
  },

  entry: {
    slider: {
      import: './src/plugin/slider.ts',
      filename: 'lib/[name].js',
      library: {
        name: 'slider',
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
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        include: /src/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        exclude: /src/,
      },
    ],
  },

  resolve: {
    extensions: ['.ts', '.js'],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './example/index.html'),
      filename: 'demo/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'lib/[name].css',
    }),
    new FaviconsWebpackPlugin({
      logo: './example/favicon.png',
      favicons: {
        icons: {
          appleStartup: false,
        },
      },
    }),
  ],
};
