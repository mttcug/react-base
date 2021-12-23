const path = require('path')
const webpack =  require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const htmlwebpackplugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const asset_path = process.env.asset_path

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    entry: ['core-js', 'regenerator-runtime', path.resolve(__dirname, '../src/page/app.jsx')],
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].bundle.js',
        clean: true
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            '～': path.resolve(__dirname, '../src'),
            '$component': path.resolve(__dirname, '../src/component'),
            '$page': path.resolve(__dirname, '../src/page'),
            '$plugin': path.resolve(__dirname, '../src/plugin'),
            '$interface': path.resolve(__dirname, '../src/interface'),
            '$static': path.resolve(__dirname, '../src/static'),
            '$utils': path.resolve(__dirname, '../src/utils')
        }
    },
    module: {
        rules: [
            {
                test: /\.js(x)?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader?cacheDirectory'
                }
            },
            {
                test: /\.css$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                        MiniCssExtractPlugin.loader,
                        { 
                            loader: 'css-loader',
                            options: {
                                modules: true
                            }
                        },
                        'postcss-loader'
                    ]
            },
            {
                test: /\.less$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'postcss-loader',
                        'less-loader'
                    ]
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                exclude: /(node_modules|bower_components)/,
                type: 'asset/resource'
            }
        ]
    },
    plugins: [
        new htmlwebpackplugin({     // html-webpack-plugin 插件对象
            template: path.join(__dirname, '../public/index.html'), // 指定模板文件
            filename: "index.html"  //设置内存中的文件名
        }),
        new CopyWebpackPlugin({
            patterns: [{ 
                from: path.resolve(__dirname, '../public/favicon.ico'),
                to: path.resolve(__dirname, '../dist'),
                toType: 'dir'
            }]
        }),
        new MiniCssExtractPlugin(),
        new webpack.DefinePlugin({
            'process.env.asset_path': asset_path
        }),
        // new BundleAnalyzerPlugin(),
    ],
}