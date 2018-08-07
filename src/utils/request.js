import Vue from 'vue'
import axios from 'axios/index';
import {Message, Loading, MessageBox} from 'element-ui';
import Store from '@/store'
import Router from '@/router'
// import {MessageBox} from 'element-ui/types/index';

// 加载层
export function load (text, target) {
  // target 必须用id
  target = target ? document.getElementById(target) : document.body;
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
    isTip = params;
    params = null
  }
  params = params || {};
  let instance = axios.create();
  instance.interceptors.request.use(config => {
    if (isTip) {
      Store.state.loading = true;
      load(isTip)
    }
    return config;
  }, error => {
    // 对请求错误做些什么
    if (isTip) {
      Store.state.loading = true;
      load(isTip);
    }
    return Promise.reject(error);
  });
  const promise = new Promise((resolve, reject) => {
    instance({
      headers: {
        'Content-Type': 'application/json'
      },
      baseURL: process.env.BASE_API,
      method: 'POST',
      url: url,
      data: params,
      responseType: 'json'
    }).then(res => {
      if (isTip) {
        load(isTip).close()
      }
      if (!res.data) {
        return resolve(res);
      }
      if (res.status === 200) {
        if (res.data.code === 'ERR-110') {
          reject(res.data);
          let currentRoute = Router.app._route;
          // 路由变化时不重复显示确认框
          if(currentRoute.name && currentRoute.path !== window.location.pathname){
            exitMessage(res.data.data);
          }
          return false
        } else if (res.data.result) {
          if (isTip) {
            Store.state.loading = false;
          }
          resolve(res.data)
        } else {
          if (isTip) {
            message(res.data.msg, 'error', 1500);
          }
          reject(res.data)
        }
      } else {
        message('网络异常，请稍后重试！', 'error', 1500);
        reject(res)
      }
    }).catch(error => {
      // Store.state.loading = false;
      if (isTip) {
        load(isTip).close()
      }
      message(error.response ? error.response.statusText : '网络异常，请稍后重新尝试', 'error');
      reject(error.response)
    })
  });
  return promise
}

// 消息提示
export function message (txt, type, delay = 1500) {
  const icon = (type !== 'waiting' && type !== 'caution' && type !== 'error') ? 'success' : type;
  let cs = type === 'waiting' || type === 'caution' ? 'device' : '';
  return Message({
    message: `<div class="tip_message_content ${type}">
        <img class="tip_img_icon" src="/static/img/${icon}_tip_icon.png" alt="">
        <p style="padding:0" class="text">${txt}</p>
      </div>`,
    center: true,
    customClass: `tip_message ${cs}`,
    dangerouslyUseHTMLString: true,
    duration: delay,
    type: type
  })
}

// 重新登录确认框

export function exitMessage (href) {
  let html = `
              <p>您的登录已过期，请重新登录！</p>
            `;
  return MessageBox.confirm(html, '登录确认', {
    center: true,
    dangerouslyUseHTMLString: true,
    showCancelButton: false
  }).then(() => {
    window.location.href = `${href}?redirectURL=${window.location.href}`
  });
}
