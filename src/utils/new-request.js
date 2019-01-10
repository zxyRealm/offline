import axios from 'axios'
import { Message, Loading, MessageBox } from 'element-ui'
import router from '@/router'
import Store from '@/store'

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

// 重新登录确认框

export function exitMessage (href) {
  let html = `
              <p>请登录！</p>
            `
  return MessageBox.confirm(html, '登录确认', {
    center: true,
    dangerouslyUseHTMLString: true,
    showCancelButton: false,
    closeOnClickModal: false,
    closeOnPressEscape: false,
    customClass: 'confirm__message--login'
  }).then(() => {
    window.location.href = `${href}?redirectURL=${window.location.href}`
  })
}

// 消息提示
export function message (txt, type, delay = 1500) {
  const icon = (type !== 'waiting' && type !== 'caution' && type !== 'error') ? 'success' : type
  let cs = type === 'waiting' || type === 'caution' ? 'device' : ''
  let options = {
    message: `<div class="tip_message_content ${type}">
        <img class="tip_img_icon" src="/static/img/${icon}_tip_icon.png" alt="">
        <p style="padding:0px" class="text">${txt}</p>
      </div>`,
    center: true,
    customClass: `tip_message ${cs}`,
    duration: typeof delay === 'function' ? 0 : delay,
    dangerouslyUseHTMLString: true,
    type: type
  }
  if (typeof delay === 'function') {
    options.callback = (action, instance, done) => {
      if (typeof delay === 'function') {
        delay(action, instance, done)
      }
    }
  }
  return typeof delay === 'function' ? Message(options) : Message(options).startTimer()
}

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  // timeout: 5000, // request timeout
  method: 'POST'
})

// request interceptor
service.interceptors.request.use(config => {
  // Do something before request is sent
  Store.state.loading = true
  if (config.tip === undefined || config.tip) load('数据加载中...')
  return config
}, error => {
  // Do something with request error
  Store.state.loading = false
  if (error.response.config.tip === undefined || error.response.config.tip) load('数据加载中...').close()
  if (error.status === '504') {
    message('网关超时，请重试！', 'error', 3000)
  } else {
    message(`网络异常[-${error.status}]`, 'error', 3000)
    console.log(error) // for debug
  }
  Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
  response => {
    // tryHideFullScreenLoading()
    // 格式化返回参数格式
    Store.state.loading = false
    if (response.config.tip === undefined || response.config.tip) load('数据加载中...').close()
    if (response.status === 200) {
      if (response.data.code === 'ERR-110') {
        Store.state.expired = true
        exitMessage(response.data.data)
        return Promise.reject(response.data)
      } else if (response.data.result) {
        Store.state.expired = false
        return Promise.resolve(response.data instanceof String ? JSON.parse(response.data) : response.data)
      } else {
        Store.state.expired = false
        if (response.config.tip === undefined || response.config.tip) message(response.data.msg, 'error', 3000)
        return Promise.reject(response.data)
      }
    } else {
      Store.state.loading = false
      if (response.data.code) {
        message(response.data.msg, 'error', 3000)
      } else {
        message('网络异常，请稍后重试', 'error', 3000)
      }
    }
  },
  error => {
    // 此处错误已由node项目中finalResult方法包装处理
    // tryHideFullScreenLoading()
    if (error.response.config.tip === undefined || error.response.config.tip) load('数据加载中...').close()
    if (error.response && /^5/.test(error.response.status)) {
      message('网络异常，请稍后重试', 'error', 3000)
    } else {
      message(error.response.statusText, 'error', 3000)
    }
    return Promise.reject(error.response || error)
  })

export default service
