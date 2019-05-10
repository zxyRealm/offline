// vue.config.js
module.exports = {
  publicPath: process.env.BASE_URL,
  outputDir: 'dist',
  assetsDir: 'static',
  productionSourceMap: false,
  devServer: {
    contentBase: ['./public'], // 设置public为静态资源根目录
    port: '3010',
    disableHostCheck: true, // 取消host检查
    proxy: {
      '/api': {
        target: 'http://192.168.1.171:7301/mock/5cb061e458260982ec16f592/offline-browser',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      sass: {
        // @/ 是 src/ 的别名
        // 假设项目下已经有 src/styles/variables.scss 这个文件
        // 配置后你可以这样向所有 Sass 样式传入共享的全局变量
        data: `@import "@/styles/variables.scss";`
      }
    }
  },
  chainWebpack: config => {
    // 移除 preload 插件
    // config.plugins.delete('preload')
    // 移除 prefetch 插件, Prefetch 链接将会消耗带宽
    config.plugins.delete('prefetch')
  }
}
