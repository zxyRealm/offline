import request from '@/utils/new-request'

// 获取商户自有设备列表
export function GetOwnDeviceList (data) {
  return request({
    url: '/merchant/device/list',
    data
  })
}
