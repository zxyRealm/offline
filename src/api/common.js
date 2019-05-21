import request from '@/utils/request'
import prefix from './prefix'
// 获取商户下管理员社群列表
export function GetAreaList () {
  return request({
    url: `${prefix[0]}/area/read/list`,
    method: 'get'
  })
}

export function uploadFileToOss () {
  return request({
    tip: false,
    url: `${prefix[0]}/oss/file`,
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}


// 判断用户下是否存在设备
export function getUserHasDevice (data) {
  return request({
    url: `${prefix[0]}/device/read/exist/${data.merchantGuid}`,
    method: 'get',
    data
  })
}


// 获取商户下管理员社群列表
export function GetManageList () {
  return request({
    url:`${prefix[0]}/group/`,
    method: 'get'
  })
}

// oss文件上传前签名获取
export function OssSignature (data) {
  return request({
    url: '/auth/oss/image/signature',
    data
  })
}

// 获取socket服务地址
export function GetSocketIP (data) {
  return request({
    url: '/getServiceIp',
    data
  })
}

// 账号下是否有管理社群
export function IsManageGroup (data) {
  return request({
    url: '/group/faceSetCheck',
    data
  })
}

// 账号第一次登录
export function FirstLogin (data) {
  return request({
    url: '/firstCheck',
    data
  })
}

// 账号是否有未读通知消息
export function getNoticeReadState (data) {
  return request({
    url: `${prefix[0]}/siteNotice/read/unRead/${data.merchantGuid}`,
    method: 'get',
    data
  })
}
