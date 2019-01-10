import Cookies from 'js-cookie'
import QRCode from 'qrcodejs2'
import {fetch, message} from '@/utils/request'
import {restoreArray} from '@/utils'

exports.install = function (Vue, options) {
  // 公用提示框
  Vue.prototype.$tip = function (txt, type = 'info', delay = 1500) {
    return message(txt, type, delay)
  }
  // 异步请求
  Vue.prototype.$http = function (url, params, showTip) {
    return fetch(url, params, showTip)
  }

  Vue.prototype.$restoreArray = function (arr, child) {
    return restoreArray(arr, child)
  }
  Vue.prototype.$cookie = function () {
    return Cookies
  }
  // 退出登录
  Vue.prototype.$exit = function () {
    this.$affirm({text: '确认退出吗？'}, (action, instance, done) => {
      if (action === 'confirm') {
        this.$http('/signout').then(res => {
          localStorage.clear()
          Cookies.remove('guid')
          window.location.href = `${res.data}?redirectURL=${window.location.href}`
        }).catch(error => {
          if (!error.code) {
            localStorage.clear()
            Cookies.remove('guid')
            window.location.href = `${error.data}?redirectURL=${window.location.href}`
          }
        })
        done()
      } else {
        done()
      }
    })
  }

  // loading加载层
  Vue.prototype.$load = function (txt) {
    return this.$loading({
      // lock: true,
      text: txt || '数据努力加载中...',
      spinner: 'el-icon-loading',
      background: 'transparent'
    })
  }
  // 确认操作框
  Vue.prototype.$affirm = function (text, callback, type, showCancel = true) {
    let html = `${text.text}`
    if (type) {
      html = ` <img width="72px" src="/static/img/${type}_tip_icon.png" alt="提示信息"><p>${text.text}</p>`
    }
    this.$msgbox({
      title: text.title || '',
      message: html,
      center: true,
      dangerouslyUseHTMLString: true,
      customClass: 'uu-message-affirm',
      confirmButtonClass: 'affirm',
      cancelButtonClass: 'cancel',
      showCancelButton: type ? !type : showCancel,
      showConfirmButton: !type,
      confirmButtonText: text.confirm || '确 定',
      cancelButtonText: text.cancel || '取 消',
      beforeClose: (action, instance, done) => {
        callback(action, instance, done)
      }
    })
  }

  Vue.prototype.$createQRCode = function (url, id) {
    this.$nextTick(() => {
      let ele = document.getElementById(id)
      ele.innerHTML = ''
      const qrCode = new QRCode(ele, {
        text: url,
        width: 74,
        height: 74,
        colorDark: '#000000',
        correctLevel: QRCode.CorrectLevel.H
      })
    })
  }

  /**
   * lwh = 公用的方法
   */

  // 浅复制-覆盖原来属性
  Vue.prototype.$apply = function (scope, config) {
    for (var i in config) {
      scope[i] = config[i]
    }
    return scope
  }

  // 浅复制-不覆盖原来属性
  Vue.prototype.$applyIf = function (scope, config) {
    for (var i in config) {
      if (!scope[i]) {
        scope[i] = config[i]
      }
    }
    return scope
  }

  // 显示图列 - echarts
  Vue.prototype.$legendArray = function (array) {
    let arr = []
    array.forEach(element => {
      for (let ele in element) {
        if (ele === 'name') {
          arr.push(element['name'])
        }
      }
    })
    return arr
  }
}
