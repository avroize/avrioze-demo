const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require("path");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    output: {
        filename: '[name].bundle.js', path: path.resolve(__dirname, 'dist'), publicPath: "/dist/"
    },
    plugins: [
        new UglifyJSPlugin({
            sourceMap: true
        }),
        new webpack.DefinePlugin({
            'process.env': {'NODE_ENV': JSON.stringify('production')}
        })
    ]
});