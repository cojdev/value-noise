const path = require('path');

module.exports = {
  entry: './src/ValueNoise.js',

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist/'),
    publicPath: 'dist',
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
