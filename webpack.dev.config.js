const webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const common = require('./webpack.common.config.js');


const devConfig = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    open: true,
    port: 7000,
    progress: true,
    hot: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};

module.exports = merge(common(true), devConfig);
