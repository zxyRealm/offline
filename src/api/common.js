import request from '@/utils/new-request'

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
