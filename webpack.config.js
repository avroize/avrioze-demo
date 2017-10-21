const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: "./client/index.html",
    filename: "index.html",
    inject: "body"
});

module.exports = {
    entry: "./client/index.js",
    output: {
        path: path.resolve("dist"),
        filename: "index_bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style-loader!css-loader" },
            { test: /\.js$/, loader: "babel-loader" },
            { test: /\.jsx$/, loader: "babel-loader" }
        ]
    },
    plugins: [HtmlWebpackPluginConfig]
};
