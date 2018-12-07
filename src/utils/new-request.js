import axios from 'axios'
import { Message, Loading } from 'element-ui'
import router from '@/router'
import store from '@/store'

// create loading
let loading

function startLoading () {
  loading = Loading.service({
    target: '#app',
    lock: false,
    text: '加载中……',
    spinner: 'el-icon-loading',
    background: 'rgba(0,0,0,0)',
    fullscreen: true
  })
}

function endLoading () {
  loading.close()
}

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

function showFullScreenLoading (isLoading = true) { // isLoading 请求是否需要添加loading动画
  if (store.state.needLoadingRequestCount === 0 && isLoading) {
    startLoading()
  }
  if (isLoading) {
    store.state.needLoadingRequestCount++
  }
}

function tryHideFullScreenLoading () {
  if (store.state.needLoadingRequestCount <= 0) {
    return false
  }
  store.state.needLoadingRequestCount--
  if (store.state.needLoadingRequestCount === 0) {
    endLoading()
  }
}

// create an error messsage
let errMsg = msg => {
  Message({
    customClass: 'custom-tip__wrap',
    message: msg,
    type: 'error',
    duration: 3 * 1000
  })
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
  load('数据加载中...')
  return config
}, error => {
  // Do something with request error
  load('数据加载中...').close()
  if (error.status === '504') {
    errMsg('网关超时，请重试！')
  } else {
    errMsg(`网络异常[-${error.status}]`)
    console.log(error) // for debug
  }
  Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
  response => {
    // tryHideFullScreenLoading()
    // 格式化返回参数格式
    load('数据加载中...').close()
    if (response.status === 200) {
      return Promise.resolve(response.data)
    } else {
      if (response.data.code) {
        errMsg(response.data.msg)
      } else {
        errMsg('网络异常，请稍后重试')
      }
    }
  },
  error => {
    // 此处错误已由node项目中finalResult方法包装处理
    // tryHideFullScreenLoading()
    load('数据加载中...').close()
    if (error.response && /^5/.test(error.response.status)) {
      errMsg('网络异常，重新尝试')
    } else {
      errMsg(error.response.statusText)
    }
    return Promise.reject(error.response || error)
  })

export default service
