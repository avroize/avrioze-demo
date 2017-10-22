const path = require("path");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: "./src/index"
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html",
            inject: "body"
        })
    ],
    output: {
         filename: '[name].bundle.js', path: path.resolve(__dirname, 'dist')
    },
    module: {
        loaders: [
            { test: /\.(css)$/, loader: "style-loader!css-loader" },
            { test: /\.(png|jpg)$/, loader: 'url-loader', options: { limit: 25000 } },
            { test: /\.js$/, loader: "babel-loader" },
            { test: /\.jsx$/, loader: "babel-loader" },
            { test: /\.styl$/, loader: "style-loader!css-loader!stylus-loader"}
        ]
    }
};