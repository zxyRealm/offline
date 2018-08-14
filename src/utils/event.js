import Vue from 'vue'
// 注册全局事件对象
let vm = new Vue()
export function eventObject () {
  /*
  *(1) FaceRecognition -- 用在人脸识别条件查询组件作为一个下拉设备选择设备数据传递
  */
  return vm
}
