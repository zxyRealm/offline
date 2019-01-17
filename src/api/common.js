import request from '@/utils/new-request'

// 获取商户下管理员社群列表
export function GetAreaList () {
  return request({
    url: '/area/list'
  })
}

// 获取商户下管理员社群列表
export function GetManageList () {
  return request({
    url: '/group/all'
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
