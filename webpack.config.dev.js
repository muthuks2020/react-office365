const path = require('path');
const webpack = require('webpack');

module.exports = {
    devtool: 'eval',
    entry: {
        example: [
            './examples/example.jsx'
        ]
    },
    output: {
        path: path.join(__dirname, 'examples'),
        filename: '[name].js'
    },
    module: {
        rules: [{
            use: 'babel-loader',
            test: /\.jsx?$/,
            exclude: /node_modules/,
        }],
    }
};