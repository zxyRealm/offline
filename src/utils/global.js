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
      this.$affirm({ text: '确认退出吗？' }, (action, instance, done) => {
        if (action === 'confirm') {
          let signOut = new Promise(resolve => {
            SignOut().then(res => {
              resolve()
            }).catch(error => {
              if (!error.code) {
                resolve()
              }
            })
          })
          signOut().then(() => {
            localStorage.clear()
            this.$cookie().remove('user_token')
            this.$cookie().remove('user_phone')
            this.$cookie().remove('user_uuid')
            window.location.href = `${res.data}?redirectURL=${window.location.href}`
          })
          // SignOut().then(res => {
          //
          // }).catch(error => {
          //   if (!error.code) {
          //     localStorage.clear()
          //     this.$cookie().remove('user_token')
          //     this.$cookie().remove('user_phone')
          //     this.$cookie().remove('user_uuid')
          //     window.location.href = `${error.data}?redirectURL=${window.location.href}`
          //   }
          // })
        }
        done()

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
    Vue.prototype.$affirm = function (options, callback) {
      let {
        text = '',
        title,
        type = '',
        confirm = '确 定',
        cancel = '取 消',
        confirmType = 'default',
        showCancelButton = true
      } = options
      // if (type) {
      //   html = ` <img width="72px" src="${ossPrefix}static/img/${type}_tip_icon.png" alt="提示信息"><p>${text.text}</p>`
      // }
      return this.$alert(text, {
        title: title,
        type: type,
        confirmButtonClass: confirmType === 'danger' ? 'el-button--danger' : '',
        dangerouslyUseHTMLString: true,
        customClass: 'uu-message-affirm',
        showCancelButton: showCancelButton,
        confirmButtonText: confirm || '确 定',
        cancelButtonText: cancel || '取 消',
        beforeClose: (...args) => {
          callback(...args)
        }
      })
    }

    /*
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
