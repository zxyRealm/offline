import Cookies from 'js-cookie'
import { restoreArray } from '@/utils'
import { message } from './request'
import { SignOut } from '../api/developer'
import router from '../router'
const ossPrefix = process.env.BASE_URL
export default {
  install (Vue) {
    // 公用提示框
    Vue.prototype.$tip = function (txt, type = 'info', delay = 1500) {
      return message(txt, type, delay)
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
          SignOut().then(res => {
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
        html = ` <img width="72px" src="${ossPrefix}static/img/${type}_tip_icon.png" alt="提示信息"><p>${text.text}</p>`
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

    // 返回上一页

    Vue.prototype.$backPrev = function () {
      if (window.history.length) {
        router.go(-1)
      } else {
        router.push('/index')
      }
    }
  }
}
