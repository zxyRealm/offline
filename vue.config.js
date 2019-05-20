// vue.config.js
const API_HOSTNAME = process.env.VUE_APP_API_HOSTNAME
const API_PORT = process.env.VUE_APP_API_PORT
module.exports = {
  publicPath: process.env.BASE_URL,
  outputDir: 'dist',
  assetsDir: 'static',
  pages: {
    index: {
      entry: 'src/main.js'
    },
    'chain-world': {
      entry: 'src/three-map/src/scene/chainWorld.js',
      template: 'map/chain-world.html',
      filename: 'static/html/chain-world.html'
    },
    'map-world': {
      entry: 'src/three-map/src/scene/mapWorld.js',
      template: 'map/map-world.html',
      filename: 'static/html/map-world.html'
    },
    'trail-world': {
      entry: 'src/three-map/src/scene/trailWorld.js',
      template: 'map/trail-world.html',
      filename: 'static/html/trail-world.html'
    }
  },
  productionSourceMap: false,
  devServer: {
    contentBase: ['./public'], // 设置public为静态资源根目录
    port: '3010',
    disableHostCheck: true, // 取消host检查
    proxy: {
      '/api': {
        target: `http://${API_HOSTNAME}${API_PORT !== 'false' ? ':' + API_PORT : ''}`,
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
    // config.optimization.splitChunks({ name: 'common.js' })
    config.plugin('env').use(require.resolve('webpack/lib/ProvidePlugin'), [{ jQuery: 'jquery', $: 'jquery' }])
  }
}
