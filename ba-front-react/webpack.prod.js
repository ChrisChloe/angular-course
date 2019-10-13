const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: {
        bundle: './src/App/'
    },
    output: {
        path: path.resolve(__dirname, './public'),
        filename: "[name].[chunkhash:8].js"
    },
    devServer: {
        host: '0.0.0.0',
        inline: true,
        contentBase: './public',
        port: 3333
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'react'],
                plugins: ["transform-object-rest-spread"]
            }
        },
            {test: /\.css$/, loader: "style-loader!css-loader"}
        ]
    },
    plugins: [
        new Dotenv({
            path: './.env',
        }),
        new CleanWebpackPlugin(['./public/bundle.*.js']),
        new HtmlWebpackPlugin({
            template: './public/index-template.html',
            inject: false
        }),
        new webpack.HashedModuleIdsPlugin()
    ]

};