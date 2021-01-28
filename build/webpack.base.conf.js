const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const conf = {
    context: path.resolve(__dirname, '../'),
    entry: ['core-js', 'regenerator-runtime', './index.js'],
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, '../dist')
    },
    module: {
        rules: [
            {
                test: /.jsx|js$/,
                use: 'babel-loader'
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            html: 'index.html',
            template: 'index.html'
        })
    ]
}

module.exports = conf