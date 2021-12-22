const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { merge } = require('webpack-merge')
const conf = require('./webpack.config')

module.exports = merge(conf, {
    mode: 'production',
    optimization: {
        runtimeChunk: 'single',
        moduleIds: 'deterministic',
        splitChunks: {
            cacheGroups: {
              vendor: {
                test: /[\\/]node_modules[\\/]/,
                name: 'vendors',
                chunks: 'all',
              }
            }
        },
        minimizer: [
            new TerserPlugin({
                parallel: true, // 可省略，默认开启并行
                terserOptions: {
                    toplevel: true, // 最高级别，删除无用代码
                    ie8: true,
                    safari10: true,
                }
            }),
            new CssMinimizerPlugin({
                parallel: true, // 可省略，默认开启并行
            })
        ]
    }
})