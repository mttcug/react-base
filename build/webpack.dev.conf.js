const path = require('path')
const { merge } = require('webpack-merge')
const conf = require('./webpack.base.conf')

module.exports = merge(conf, {
    mode: 'development',
    devServer: {
        contentBase: path.resolve(__dirname, '../dist'),
        port: '8091',
        open: true,
        compress: true
    }
})