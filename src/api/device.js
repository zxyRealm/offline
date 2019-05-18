import request from '@/utils/request'
import prefix from './prefix'

// 获取管理社群下设备列表
export function getGroupDeviceList (data) {
  return request({
    url: `${prefix[0]}/device/read/list`,
    method: 'get',
    data
  })
}

// 获取商户一体机设备列表
export function GetOwnDeviceList (data) {
  return request({
    url: '/merchant/device/list',
    data
  })
}

// 获取管理社群下服务器列表
export function GetGroupServerList (data) {
  return request({
    url: '/device/group/server',
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

// 查询管理社群下所有设备（一体机、摄像头）
export function GetGroupDevice (data) {
  return request({
    url: '/device/group/all',
    data
  })
}

// 查询用户所有设备（一体机、摄像头）
export function GetAllDevice (data) {
  return request({
    url: '/device/all',
    data
  })
}

// 查询管理社群下已经绑定了出入口的一体机
export function GetGroupAioList (data) {
  return request({
    url: '/device/group/aio',
    data
  })
}

// 查询用户设备中已经绑定了出入口的一体机
export function GetAllAioList (data) {
  return request({
    url: '/device/all/aio',
    data
  })
}

// 摄像头

// 商户添加设备(摄像头)
export function AddCamera (data) {
  return request({
    url: '/device/camera/add',
    data
  })
}

// 摄像头列表
export function GetCameraList (data) {
  return request({
    url: '/device/camera',
    data
  })
}

// 查询管理社群下已经绑定了出入口的摄像头
export function GetGroupCameraList (data) {
  return request({
    url: '/device/group/camera',
    data
  })
}

// 查询用户设备中已经绑定了出入口的摄像头
export function GetAllCameraList (data) {
  return request({
    url: '/device/all/camera',
    data
  })
}

// 摄像头设备查询
export function SearchCamera (data) {
  return request({
    url: '/device/camera/search',
    data
  })
}

// 摄像头名称验重
export function CheckCameraName (data) {
  return request({
    tip: false,
    url: '/device/existName',
    data
  })
}

// 摄像头名称修改
export function UpdateCameraName (data) {
  return request({
    url: '/device/camera/name/update',
    data
  })
}
// 摄像头批量删除
export function DeleteCameraBatch (data) {
  return request({
    url: '/device/camera/delete',
    data
  })
}

// 设备最新版本信息
export function GetDeviceVersion (data) {
  return request({
    url: '/device/deviceType/firmware',
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

// (一体机、服务器)批量导入模板下载地址获取
export function DownloadSrc (data) {
  return request({
    url: '/merchant/import/template',
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
