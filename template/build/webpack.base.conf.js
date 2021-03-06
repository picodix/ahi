var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    entry: {
        app: './src/main.js'
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production'
        ? config.build.assetsPublicPath
        : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            {{#if_eq build "standalone"}}
            'vue$': 'vue/dist/vue.esm.js',
            {{/if_eq}}
            {{#if svg}}
            'utils': path.resolve(__dirname, './utils'),
            {{/if}}
            'styles': resolve('src/styles'),
            '@': resolve('src')
        }
    },
    module: {
        rules: [
            {{#lint}}
            {
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                enforce: "pre",
                include: [resolve('src'), resolve('test')],
                options: {
                    formatter: require('eslint-friendly-formatter')
                }
            },
            {{/lint}}
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test')]
            },
            {{#if svg}}
            {
                test: /\.svg(\?.*)?$/,
                loader: 'svg-sprite-loader?' + JSON.stringify({
                    name: '[name]_[hash]',
                    spriteModule: 'utils/sprite',
                    prefixize: true
                })
            },
            {{/if}}
            {
                {{#if svg}}
                test: /\.(png|jpe?g|gif)(\?.*)?$/,
                {{else}}
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                {{/if}}
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    }
}
