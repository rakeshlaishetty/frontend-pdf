const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
let mode = "development";
let target = "web";

if (process.env.NODE_ENV == "production") {
  mode = "production";
  target = "web";
}
const isDevelopment = process.env.NODE_ENV !== "production";

let devtool = isDevelopment ? "eval-source-map" : "source-map";

module.exports = {
  mode: mode,
  target: target,
  devtool: devtool,
  entry: {
    main: "./src/index.js"
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "build"),
    chunkFilename: "[name].[contenthash].js",
    assetModuleFilename: "images/[hash][ext][query]",
    publicPath: "/"
  },
  performance: {
    maxAssetSize: 50000,
    maxEntrypointSize: 50000
  },
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: "asset"
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        loader: "url-loader",
        options: { limit: false }
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, "src"),
        use: ["style-loader", "css-loader", "postcss-loader"]
        //     use: [

        //       { loader: MiniCssExtractPlugin.loader, options: { publicPath: "" } },
        //       "css-loader",
        //       {
        //         loader: "postcss-loader",
        //         options: {
        //           postcssOptions: {
        //             plugins: [
        //               ["autoprefixer"]
        //               // add more postcss plugins as needed
        //             ]
        //           }
        //         }
        //       },
        // ]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new HtmlWebPackPlugin({
      template: "./src/index.html"
    }),
    isDevelopment && new ReactRefreshWebpackPlugin()
  ],
  devServer: {
    port: 3500,
    static: path.resolve(__dirname, "build"),
    compress: true,
    historyApiFallback: true
  }
};
