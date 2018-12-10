const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: {
    "react-ms-login": [
      './src/index.jsx'
    ],
    "authComplete": [
      './src/authComplete.js'
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'umd'
  },
  module: {
    rules: [{
      use: 'babel-loader',
      test: /\.jsx?$/,
      exclude: /node_modules/,
    }],
  },
  externals: {
    'react': 'react',
    'react-dom': 'ReactDOM',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      },
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
  ],
};