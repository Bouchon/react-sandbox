const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const shared = require('./webpack.config.shared')

const outputFolder = path.resolve(__dirname, 'public')
module.exports = {
    entry: {
        app: [
            'react-hot-loader/patch',
            'babel-polyfill',
            'webpack-hot-middleware/client',
            path.resolve(__dirname, 'src/index.js')
        ]
    },
    output: {
        path: outputFolder,
        publicPath: '/',
        filename: '[name].js'
    },
    plugins: [
        new CopyWebpackPlugin([{from: 'static', to: outputFolder}]),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: (module) => module.context && module.context.indexOf('node_modules') !== -1
        })
    ],
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, use: { loader: 'babel-loader', options: shared.getAdjustedBabelOptions() } },
            { test: /\.css$/, use: [ 'style-loader', 'css-loader', { loader: 'postcss-loader', options: { sourceMap: true } }] },
            { test: /\.(jpe?g|png|gif)$/, use: { loader: 'url-loader', options: {limit: 10000 } } }
        ],
    },
    devtool: '#inline-source-map'
}