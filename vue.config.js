// vue.config.js
module.exports = {
  publicPath: process.env.BASE_URL,
  outputDir: 'dist',
  assetsDir: 'static',
  productionSourceMap: false,
  devServer: {
    contentBase: ['./public'],
    port: '3010',
    disableHostCheck: true, //取消host检查
    proxy: {
      '/api': {
        target: 'http://192.168.12.182:3015',
        changeOrigin: true,
        pathRewrite: {}
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
        // data: `@import "@/style/variables.scss";`
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
