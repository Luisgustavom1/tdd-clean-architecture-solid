const { DefinePlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");
const common = require('./webpack.common')
const { merge } = require('webpack-merge');

module.exports = merge(common, {
    mode: 'development',
    module: {
        rules: [{
            test: /\.ts(x?)$/,
            loader: 'ts-loader',
            exclude: /node_modules/
        }, {
            test: /\.scss$/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader',
                options: {
                    modules: true
                }
            }, {
                loader: 'sass-loader'
            }]
        }]
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        historyApiFallback: true,
        devMiddleware: {
            writeToDisk: true
        }
    },
    plugins: [
        new DefinePlugin({
            'process.env.API_URL': JSON.stringify('http://fordevs.herokuapp.com/api')
        }),
        new HtmlWebpackPlugin({
            template: './template.dev.html'
        })
    ]
})