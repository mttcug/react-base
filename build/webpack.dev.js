const path = require('path')
const { merge } = require('webpack-merge')
const conf = require('./webpack.config')

module.exports = merge(conf, {
    mode: 'development',
    devServer: {
        static: path.resolve(__dirname, '../dist'),
        client: {
            progress: true,
            reconnect: true
        },
        historyApiFallback: true,
        compress: false,
        port: 9000,
        hot: true
    }
})