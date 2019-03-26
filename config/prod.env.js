'use strict'
let assetsPublicPath = '' // 外网静态资源oss地址
switch (process.env.BUILD_ENV) {
  case 'inner':
    assetsPublicPath = '"/"'
    break
  case 'test':
    assetsPublicPath = '"/"'
    break
  case 'release':
    assetsPublicPath = '"http://offline-browser-images.oss-cn-hangzhou.aliyuncs.com/"'
    break
  default:
    assetsPublicPath = '"/"'
    break
}

module.exports = {
  NODE_ENV: '"production"',
  BASE_API: '"/api"',
  // assetsPublicPath: '"http://192.168.11.182"'
  assetsPublicPath: assetsPublicPath
}
