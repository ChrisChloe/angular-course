const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: {
        bundle: './src/App/'
    },
    output: {
        path: path.resolve(__dirname, './public'),
        filename: "[name].js"
    },
    devServer: {
        host: '0.0.0.0',
        inline: true,
        contentBase: './public',
        port: 3333
    }
    ,module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'react'],
                plugins: ["transform-object-rest-spread"]
            }
        },
        { test: /\.css$/, loader: "style-loader!css-loader" }
        ]
    },
    plugins: [
        new Dotenv({
            path: './.env',
        }),
    ]

};
