import path from "node:path";
import { fileURLToPath } from "url";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";

import "webpack-dev-server";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config: webpack.Configuration = {
  entry: "./src/main.tsx",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name][ext]", // Куда складывать файлы в папке dist
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "public",
          to: ".",
          filter: (resourcePath) => !resourcePath.endsWith("index.html"),
        },
      ],
    }),
  ],
  devServer: {
    compress: true,
    port: 9000,
    historyApiFallback: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@components": path.resolve(__dirname, "src/components"),
    },
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    publicPath: "/",
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
};

export default config;
