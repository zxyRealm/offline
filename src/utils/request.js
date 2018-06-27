import Vue from 'vue'
import axios from "axios/index";
import Qs from "qs";
import { Message } from "element-ui";

// 异步请求
export function fetch(url,params,isTip=true) {
  if(typeof params === 'boolean' ){
    isTip = params;
    params = null
  }
  params = params || {};
  // params = Qs.stringify(params||{});
  const promise = new Promise((resolve,reject)=>{
    axios({
      baseURL:'/api',
      method: "POST",
      url: url,
      data: params,
      // params:params,
      timeout: 15000,
      responseType: 'json'
    }).then(res => {
      if (res.status === 200) {
        if(res.data.result){
          if(res.data.code==='ERR-110'){
            reject(res.data);
            localStorage.clear();
            this.$store.state.userInfo = {};
            this.$router.push("/login");
          }else if(res.data.result===1){
            resolve(res.data)
          }
        }else {
          if(isTip){
            message(res.data.msg,'error',1500);
          }
          reject(res.data)
        }
      } else {
        message("服务器异常，请稍后重试！",'error',1500);
        reject(res)
      }
    }).catch((error) => {
      console.log(error);
      reject(error);
    })
  });
  return promise
}

export function message(txt,type,delay) {
  const icon = type === 'error' ? 'error' : 'success';
  return Message({
    message:`<div class="tip_message_content">
        <img class="tip_img_icon" src="/static/img/${icon}_tip_icon.png" alt="">
        <p style="padding:0" class="text">${txt}</p>
      </div>`,
    center: true,
    customClass: 'tip_message',
    dangerouslyUseHTMLString: true,
    duration: delay,
    type: type
  })
}
