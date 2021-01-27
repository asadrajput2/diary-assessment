'use strict'

const path = require("path");

module.exports = {
    mode: "development",
    entry: ['babel-polyfill', path.resolve(__dirname, 'src/index.js/')],
    output: {

        path: path.resolve(__dirname, 'bundles/'),
        publicPath: "/bundles/",
        filename: "main.js"

    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: { presets: ["@babel/env"] }
                }
            },
            {
                test: /\.css$/i,
                use: [
                    "css-loader",
                ],
            }

        ]
    },
    // devServer: {
    //     contentBase: path.join(__dirname, 'src'),
    //     compress: true,
    //     port: 9000,
    // }
};
