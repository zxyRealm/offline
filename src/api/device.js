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

// 获取管理社群下设备列表
export function getMemberDeviceList (data) {
  return request({
    url: `${prefix[0]}/device/read/search`,
    method: 'get',
    data
  })
}

// 统计管理员社群设备的数量
export function getManageDeviceState (data) {
  return request({
    url: `${prefix[0]}/device/read/count/group/${data.groupGuid}`,
    method: 'get',
    data
  })
}


// 统计成员社群设备的数量
export function getMemberDeviceState (data) {
  return request({
    url: `${prefix[0]}/device/read/count/group/unit/${data.guid}`,
    method: 'get',
    data
  })
}


// 查询社群下没有绑定出入口的设备
export function getUnbindDeviceList (data) {
  return request({
    url: `${prefix[0]}/device/read/list/free`,
    method: 'post',
    data
  })
}

// 下载一体机导入模板
export function getTemplateUrl (data) {
  return request({
    url: `${prefix[0]}/device/read/import/template`,
    method: 'get',
    data
  })
}


// 设备绑定详情
export function getDeviceBindInfo (data) {
  return request({
    url: `${prefix[0]}/device/read/bindingInfo/${data.deviceKey}`,
    method: 'get',
    data
  })
}


// 单设备信息查询
export function getDeviceInfo (data) {
  return request({
    url: `${prefix[0]}/device/read/info`,
    method: 'get',
    data
  })
}


// 单设备状态刷新
export function getDeviceState (data) {
  return request({
    url: `${prefix[4]}/device/state/${data.deviceKey}`,
    method: 'get',
    data
  })
}


// 校验设备序列号
export function getDeviceKeyState ({ deviceKey }) {
  return request({
    url: `${prefix[0]}/device/${deviceKey}`,
    method: 'get'
  })
}


// 服务器IPC 列表(摄像头)

export function getCameraList (data) {
  return request({
    url: `${prefix[0]}/ipc/read/${data.deviceKey}`,
    method: 'get',
    data
  })
}

// IPC 名称校验(摄像头)

export function getCameraNameExist (data) {
  return request({
    url: `${prefix[0]}/ipc/read/existName`,
    method: 'get',
    data
  })
}

// 删除一体机、服务器设备信息
export function deleteDevice ({ deviceKey }) {
  return request({
    url: `${prefix[0]}/device/${deviceKey}`,
    method: 'DELETE'
  })
}

// 设备绑定出入口
export function bindDeviceToPortal (data) {
  return request({
    url: `${prefix[0]}/device/portal`,
    method: 'POST',
    data
  })
}

// 设备解绑出入口
export function unbindDeviceToPortal ({ deviceKey }) {
  return request({
    url: `${prefix[0]}/device/portal/${deviceKey}`,
    method: 'DELETE'
  })
}


// 设备名称重复性校验
export function getDeviceNameIsExist (data) {
  return request({
    url: `${prefix[0]}/device/read/name`,
    method: 'POST',
    data
  })
}


// 修改一体机、服务器设备信息
export function updateDeviceInfo (data) {
  return request({
    url: `${prefix[0]}/device`,
    method: 'PUT',
    data
  })
}

// 添加设备 一体机、服务器
export function addDevice (data) {
  return request({
    url: `${prefix[0]}/device`,
    method: 'POST',
    data
  })
}

// 禁用启用设备
export function handleDeviceDisabled (data) {
  return request({
    url: `${prefix[0]}/device`,
    method: 'POST',
    data
  })
}

// 重启设备
export function handleDeviceRestart (data) {
    return request({
        url: `${prefix[0]}/device`,
        method: 'POST',
        data
    })
}

// 重置设备
export function handleDeviceReset (data) {
    return request({
        url: `${prefix[0]}/device`,
        method: 'POST',
        data
    })
}

// 升级设备
export function handleDeviceUpgrade (data) {
    return request({
        url: `${prefix[0]}/device`,
        method: 'POST',
        data
    })
}

// 升级设备
export function handleDeviceDelete (data) {
  return request({
      url: `${prefix[0]}/device`,
      method: 'delete',
      data
  })
}

