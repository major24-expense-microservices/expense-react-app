﻿const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

process.env.NODE_ENV = "production";

module.exports = {
    mode: "production",
    target: "web",
    devtool: "source-map",
    entry: "./src/index",
    output: {
        path: path.resolve(__dirname, "build"),
        publicPath: "/",
        filename: "bundle.js"
    },
    plugins: [

        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css"
        }),

        new webpack.DefinePlugin({
            // This global makes sure React is built in prod mode.
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
            "process.env.API_URL": JSON.stringify("https://localhost:44384/api"),
            "process.env.API_URL_AZURE": JSON.stringify("https://ms-expense-react-app1.azurewebsites.net/api")
        }),
        new HtmlWebpackPlugin({
            template: "src/index.html",
            minify: {
                // see https://github.com/kangax/html-minifier#options-quick-reference
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            }
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader", "eslint-loader"]
            },
            {
                test: /(\.css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: () => [require("cssnano")],
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
    }
};