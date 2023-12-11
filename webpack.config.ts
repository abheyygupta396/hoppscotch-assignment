const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: path.join(__dirname, "src", "index.tsx"),
  mode: process.env.NODE_ENV || "development",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    plugins: [new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })],
  },
  output: {
    path: path.join(__dirname, "/build"),
    publicPath: "/",
    filename: `[name].[contenthash]-${Date.now()}.js`,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          cacheDirectory: true,
          babelrc: false,
          presets: [
            ["@babel/preset-env", { targets: { browsers: "last 2 versions" } }],
            "@babel/preset-typescript",
            "@babel/preset-react",
          ],
          plugins: [
            "react-hot-loader/babel",
            ["@babel/plugin-proposal-class-properties", { loose: true }],
          ],
        },
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[path][name].[ext]",
          },
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  devServer: {
    port: 8000,
    open: true,
    historyApiFallback: true, //! to fallback on page after reloading
  },
  plugins: [
    new HtmlWebpackPlugin({
      // HtmlWebpackPlugin simplifies creation of HTML files to serve your webpack bundles
      template: "./public/index.html",
      minify: true,
      filename: (entryName) => "index.html",
    }),
  ],
};
