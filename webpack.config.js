const path = require('path');

module.exports = {
  entry: './src/ValueNoise.js',

  output: {
    filename: 'value-noise.js',
    library: 'ValueNoise',
    libraryTarget: 'umd',
    libraryExport: 'default',
    path: path.resolve(__dirname, 'docs/js'),
    publicPath: 'docs/js',
  },

  devtool: 'source-map',

  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
      },
    },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
