import request from '@/utils/new-request'

// 获取商户自有设备列表
export function GetOwnDeviceList (data) {
  return request({
    url: '/merchant/device/list',
    data
  })
}

// 获取商户非自有设备列表
export function GetOtherDeviceList (data) {
  return request({
    url: '/merchant/device/other/list',
    data
  })
}

// 获取商户服务器列表
export function GetServerDeviceList (data) {
  return request({
    url: '/merchant/device/server/list',
    data
  })
}

// 商户添加设备(一体机、服务器)
export function AddDevice (data) {
  return request({
    url: '/merchant/device/create',
    data
  })
}

// 商户添加设备(摄像头)
export function AddCamera (data) {
  return request({
    url: '/device/camera/add',
    data
  })
}

// 商户删除设备
export function DeleteDevice (data) {
  return request({
    url: '/merchant/device/delete',
    data
  })
}

// 商户批量删除设备
export function DeleteDeviceBatch (data) {
  return request({
    url: '/merchant/device/delete/batch',
    data
  })
}

// 修改设备别名
export function ChangeDeviceAlias (data) {
  return request({
    url: '/merchant/device/alias',
    data
  })
}

// (一体机、服务器)设备别名是否存在
export function DeviceAliasExist (data) {
  return request({
    tip: false,
    url: '/merchant/device/alias/exist',
    data
  })
}

// (摄像头)设备别名是否存在
export function CameraAliasExist (data) {
  return request({
    tip: false,
    url: '/device/existName',
    data
  })
}

// 设备是否存在
export function DeviceIsExisted (data) {
  return request({
    tip: false,
    url: '/device/deviceKey',
    data
  })
}

// 设备是否已经被添加
export function DeviceIsAdded (data) {
  return request({
    tip: false,
    url: '/merchant/device/exist',
    data
  })
}

// 获取设备在线状态
export function GetDeviceState (data) {
  return request({
    url: '/device/state/use',
    data
  })
}

// // 设备重启
// export function DeviceRestart (data) {
//   return request({
//     url: '/device/restart',
//     data
//   })
// }

// 设备重置、重启、启用禁用
export function DeviceHandleUrl (url, data) {
  return request({
    url: url,
    data
  })
}

// 设备升级
export function DeviceUpgrade (data) {
  return request({
    url: '/device/upgrade',
    data
  })
}

// // 设备启用、禁用
// export function DeviceOnOff (data) {
//   return request({
//     url: '/device/startOrShutdown',
//     data
//   })
// }

// 社群下出口设备列表（管理层ID）
export function PortalDeviceList (data) {
  return request({
    url: '/portal/device/group',
    data
  })
}

// 社群下出口设备列表(通过成员ID获取)
export function PortalMemberDevice (data) {
  return request({
    url: '/portal/member/device',
    data
  })
}
