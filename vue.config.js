'use strict'
const path = require('path')
function resolve(dir) {
    return path.join(__dirname, dir)
}
const px2rem = require('postcss-px2rem')

// 配置基本大小
const postcss = px2rem({
    // 基准大小 baseSize，需要和rem.js中相同
    remUnit: 16
})
module.exports = {
    publicPath: './',
    outputDir: 'dist',
    assetsDir: 'static',
    lintOnSave: process.env.NODE_ENV === 'development',
    productionSourceMap: false,
    // filenameHashing: true,
    devServer: {
        host: '0.0.0.0',
	    port: 8080,
        // proxy: {
        //   '/api': {
        //     target: 'http://localhost:80',// 后端接口
        //     changeOrigin: true, // 是否跨域
        //     pathRewrite: {
        //         '^/api': '' 
        //     }
        //   }
        // }
    },

    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    postcss
                ]
            }
        }
    },
    // svg配置该内容↓
    chainWebpack(config) {
        config.plugins.delete('preload') // TODO: need test
        config.plugins.delete('prefetch') // TODO: need test
        // set svg-sprite-loader
        config.module
            .rule('svg')
            .exclude.add(resolve('src/icons'))
            .end()
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]',
            })
            .end()

        // set preserveWhitespace
        config.module
            .rule('vue')
            .use('vue-loader')
            .loader('vue-loader')
            .tap((options) => {
                options.compilerOptions.preserveWhitespace = true
                return options
            })
            .end()
        config
            // https://webpack.js.org/configuration/devtool/#development
            .when(process.env.NODE_ENV === 'development', (config) =>
                config.devtool('cheap-source-map')
            )
    },
}