import axios from 'axios/index'
import {Message, Loading, MessageBox} from 'element-ui'
import Store from '@/store'
import Router from '@/router'

// 加载层
export function load (text, target) {
  // target 必须用id
  target = target ? document.getElementById(target) : document.body
  return Loading.service({
    text: text,
    target: target,
    spinner: 'el-icon-loading',
    background: 'transparent'
  })
}

// 异步请求
export function fetch (url, params, isTip = '数据加载中...') {
  if (typeof params === 'boolean') {
    isTip = params
    params = null
  }
  params = params || {}
  let instance = axios.create({
    baseURL: process.env.BASE_API,
    url: url,
    data: params,
    method: 'POST',
    responseType: 'json'
  })
  instance.interceptors.request.use(config => {
    if (isTip) {
      Store.state.loading = true
      load(isTip)
    }
    return config
  }, error => {
    // 对请求错误做些什么
    if (isTip) {
      Store.state.loading = true
      load(isTip)
    }
    return Promise.reject(error)
  })
  instance.interceptors.response.use(
    response => { // ie9下responseType：'json'时response.data = undefined
      // IE 8-9
      if (response.data === null && response.config.responseType === 'json' && response.request.responseText !== null) {
        try {
          // eslint-disable-next-line no-param-reassign
          response.data = JSON.parse(response.request.responseText)
        } catch (e) {
          // ignored
        }
      }
      return response
    })
  return new Promise((resolve, reject) => {
    instance({

    }).then(res => {
      if (isTip) {
        load(isTip).close()
      }
      if (!res.data) {
        return resolve(res)
      }
      if (res.status === 200) {
        if (res.data.code === 'ERR-110') {
          reject(res.data)
          let currentRoute = Router.app._route
          // 路由变化时不重复显示确认框
          if (currentRoute.name && currentRoute.path !== window.location.pathname) {
            exitMessage(res.data.data)
          }
          return false
        } else if (res.data.result) {
          if (isTip) {
            Store.state.loading = false
          }
          resolve(res.data)
        } else {
          if (isTip) {
            message(res.data.msg, 'error', 1500)
          }
          reject(res.data)
        }
      } else {
        message('网络异常，请稍后重试！', 'error', 1500)
        reject(res)
      }
    }).catch(error => {
      if (isTip) {
        load(isTip).close()
      }
      message(error.response ? error.response.statusText : '网络异常，请稍后重新尝试', 'error')
      reject(error.response)
    })
  })
}

// 消息提示
export function message (txt, type, delay = 1500) {
  const icon = (type !== 'waiting' && type !== 'caution' && type !== 'error') ? 'success' : type
  let cs = type === 'waiting' || type === 'caution' ? 'device' : ''
  return Message({
    message: `<div class="tip_message_content ${type}">
        <img class="tip_img_icon" src="/static/img/${icon}_tip_icon.png" alt="">
        <p style="padding:0px" class="text">${txt}</p>
      </div>`,
    center: true,
    customClass: `tip_message ${cs}`,
    dangerouslyUseHTMLString: true,
    duration: delay,
    type: type
  }).startTimer()
}

// 重新登录确认框

export function exitMessage (href) {
  let html = `
              <p>请登录！</p>
            `
  return MessageBox.confirm(html, '登录确认', {
    center: true,
    dangerouslyUseHTMLString: true,
    showCancelButton: false
  }).then(() => {
    window.location.href = `${href}?redirectURL=${window.location.href}`
  })
}
