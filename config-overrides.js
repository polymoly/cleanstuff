const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const webpack = require("webpack");
const MONACO_DIR = path.resolve(__dirname, "./node_modules/monaco-editor");

module.exports = {
  devtool: "source-map",
  entry: {
    app: "./src/index.ts",
    "function-file": "./function-file/function-file.ts",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".html", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: "html-loader",
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: "file-loader",
      },
      {
        test: /\.css$/,
        include: MONACO_DIR,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      chunks: ["app"],
    }),
    new HtmlWebpackPlugin({
      template: "./function-file/function-file.html",
      filename: "function-file/function-file.html",
      chunks: ["function-file"],
    }),
    new webpack.ProvidePlugin({
      Promise: ["es6-promise", "Promise"],
    }),
    new MonacoWebpackPlugin({}),
  ],
};
