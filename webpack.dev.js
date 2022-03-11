const htmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const dotenv = require("dotenv-webpack");
const CopyWebpack = require("copy-webpack-plugin");
const { InjectManifest } = require("workbox-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: path.join(__dirname, "./src/index.js"),
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle[contenthash].js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: [miniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "file-loader",
      },
    ],
  },
  resolve: {
    extensions: ["", ".js", ".jsx"],
  },
  plugins: [
    new htmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
    }),
    new miniCssExtractPlugin({ filename: "[contenthash].css" }),
    new dotenv({
      path: "./.env.development",
      systemvars: true,
    }),
    new CopyWebpack({
      patterns: [
        { from: "./public/logo192.png", to: "" },
        { from: "./public/logo512.png", to: "" },
        { from: "./public/favicon.ico", to: "" },
        { from: "./public/manifest.json", to: "" },
      ],
    }),
    // new InjectManifest({
    //   swSrc: "./src/sw.js",
    //   swDest: "sw.js",
    // }),
  ],
  devServer: {
    port: 8080,
    client: {
      overlay: {
        errors: false,
        warnings: false,
      },
    },
    historyApiFallback: true,
  },
};
