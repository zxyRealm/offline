import request from '@/utils/new-request'
// 获取商场结构信息

// 校验社群名称是否存在
export function CheckNameExist (data) {
  return request({
    tip: false,
    url: '/group/name/exist',
    data
  })
}

// 校验成员社群名称是否存在
export function CheckMemberNameExist (data) {
  return request({
    tip: false,
    url: '/group/son/name/exist',
    data
  })
}

// 校验外来成员社群昵称是否存在
export function CheckMemberNickNameExist (data) {
  return request({
    tip: false,
    url: '/group/son/nickName/exist',
    data
  })
}

// 社群业态
export function GetIndustry (data) {
  return request({
    url: '/dictionary/type',
    data: {type: 'industry'}
  })
}

// 创建商场连锁总店单个门店社群
export function AddNewCommunity (url, data) {
  return request({
    url: url,
    data
  })
}

// 获取商场社群列表
export function GetMarketList (data, tip = true) {
  return request({
    tip: tip,
    url: '/group/son/market/list',
    data
  })
}

// 获取单个门店社群列表
export function GetStoreList (data, tip = true) {
  return request({
    tip: tip,
    url: '/group/son/store/list',
    data
  })
}

// 获取商场楼层数据
export function GetMarketFloorList (data, tip = true) {
  return request({
    tip: tip,
    url: '/group/floor',
    data
  })
}

// 删除社群
export function DeleteCommunity (data) {
  return request({
    url: '/group/delete',
    data
  })
}

// 获取社群信息
export function GetCommunityInfo (data) {
  return request({
    url: '/group/info',
    data
  })
}

// 更新外来成员社群昵称
export function UpdateMemberNickName (data) {
  return request({
    url: '/group/son/nickName/update',
    data
  })
}

// 获取成员社群下信息（包含昵称信息）
export function GetMemberDetail (data) {
  return request({
    url: '/group/son/detail',
    data
  })
}

// 获取成员社群下信息（不包含昵称信息）
export function GetMemberInfo (data) {
  return request({
    url: '/group/son/info',
    data
  })
}

// 更新成员社群信息
export function UpdateMemberInfo (data) {
  return request({
    url: '/group/son/update',
    data
  })
}

// 通过邀请码获取社群信息
export function GetCommunityInfoByCode (data) {
  return request({
    tip: false,
    url: '/group/code',
    data
  })
}

// 更新社群信息
export function GetCommunityUpdate (data) {
  return request({
    url: '/group/update',
    data
  })
}

// 管理层社群下所有成员社群（不包含楼层社群）
export function MemberNoFloor (data) {
  return request({
    url: '/group/son/except/floor',
    data
  })
}

// 添加成员
export function AddMember (data) {
  return request({
    url: '/group/son/create',
    data
  })
}
// 删除成员
export function DeleteMember (data) {
  return request({
    url: '/group/son/delete',
    data
  })
}

// 成员退出管理员社群
export function ExitManage (data) {
  return request({
    url: '/group/son/exit',
    data
  })
}

// 加入其他管理社群
export function JoinOtherManage (data) {
  return request({
    url: '/group/son/join',
    data
  })
}

// 成员社群信息搜索
export function SonCommunitySearch (data) {
  return request({
    url: '/group/son/search',
    data
  })
}

// 创建出入口
export function CreatePortal (data) {
  return request({
    url: '/group/portal/create',
    data
  })
}

// 编辑出入口
export function EditPortal (data) {
  return request({
    url: '/group/portal/edit',
    data
  })
}

// 删除出入口
export function DeletePortal (data) {
  return request({
    url: '/group/portal/delete',
    data
  })
}

// 获取出入口信息
export function GetPortalInfo (data) {
  return request({
    url: '/group/portal/info',
    data
  })
}

// 出入口下设备列表
export function GetPortalDeviceList (data) {
  return request({
    url: '/portal/device/list',
    data
  })
}

// 出入口绑定设备
export function PortalBindDevice (data) {
  return request({
    url: '/portal/device/bind',
    data
  })
}

// 出入口批量绑定设备
export function PortalBatchBindDevice (data) {
  return request({
    url: '/portal/device/bind/batch',
    data
  })
}

// 出入口解绑设备
export function PortalUnbindDevice (data) {
  return request({
    url: '/portal/device/unbind',
    data
  })
}

// 出入口下设备名是否存在
export function PortalDeviceNameExist (data) {
  return request({
    tip: false,
    url: '/portal/deviceName/exist',
    data
  })
}

// 获取社群下出入口及设备数量
export function GetGroupPortalCount (data) {
  return request({
    url: '/group/portal/count',
    data
  })
}

// 获取社群下出入口信息 =======
export function GetGroupPortalInfo (data) {
  return request({
    url: '/group/portal/group/info',
    data
  })
}

// 社群出入口名称是否存在
export function CheckPortalNameExist (data) {
  return request({
    tip: false,
    url: '/group/portal/name/exist',
    data
  })
}
