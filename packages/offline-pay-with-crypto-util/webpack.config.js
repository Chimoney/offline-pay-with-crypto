const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: {
    index: [
      path.resolve(__dirname,'lib/utils', 'index.js'),
      path.resolve(__dirname, 'lib', 'index.js')
    ]
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'umd'),
    library: '@chimoney/PayWithCrypto',
    libraryTarget: 'umd',
  },

  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      terserOptions: {
        output: { comments: false }
      }
    })],
  }
};
