import request from '@/utils/request'
import prefix from './prefix'
// 获取商场结构信息

// 创建管理社群
export function addManageCommunity (data) {
  return request({
    url: `${prefix[0]}/group`,
    method: 'post',
    data
  })
}

// 更新管理社群信息
export function updateManageCommunity (data) {
  return request({
    url: `${prefix[0]}/group`,
    method: 'put',
    data
  })
}


// 管理社群名称是否存在
export function getManageNameIsExist (data) {
  return request({
    url: `${prefix[0]}/group/read/name`,
    tip: false,
    method: 'get',
    data
  })
}

// 获取管理社群信息
export function getManageInfo (data) {
  return request({
    url: `${prefix[0]}/group/read/info/${data.groupGuid}`,
    method: 'get'
  })
}

// 邀请码获取社群信息
export function getManageInfoByCode (data) {
  return request({
    url: `${prefix[0]}/group/read/${data.invitationCode}`,
    method: 'get',
    data,
    tip: false
  })
}

// 删除管理员社群
export function deleteManageCommunity (data) {
  return request({
    url: `${prefix[0]}/group/${data.groupGuid}`,
    method: 'delete'
  })
}



// 自定义业态查询
export function getIndustryList (data) {
  return request({
    url: `${prefix[0]}/group/read/industry/${data.groupGuid}`,
    method: 'get'
  })
}

// 管理社群列表
export function getManageList (data) {
  return request({
    url: `${prefix[0]}/group/read/list/${data.merchantGuid}`,
    method: 'get'
  })
}

// 管理社群待审核列表
export function getAduitList (data) {
  return request({
    url: `${prefix[0]}/group/read/list/audit`,
    method: 'get',
    data
  })
}

// /group/reject

// 管理社群拒绝申请加入
export function getRejectAuditing (data) {
  return request({
    url: `${prefix[0]}/group/reject`,
    method: 'post',
    data
  })
}

// 管理社群通过申请加入
export function getAcceptAuditing (data) {
  return request({
    url: `${prefix[0]}/group/accept`,
    method: 'post',
    data
  })
}



// 获取管理社群下成员社群组织结构
export function getManageMemberTree (data) {
  return request({
    url: `${prefix[0]}/group/read/structure/${data.groupGuid}`,
    method: 'get'
  })
}

// 获取管理社群下成员社群
export function getManageMember (data) {
  return request({
    url: `${prefix[0]}/group/unit/read/list/${data.groupGuid}/${data.type || 2}`,
    method: 'get'
  })
}

// 组织架构 成员社群搜素

export function getSearchMember (data) {
  return request({
    url: `${prefix[0]}/group/unit/read/search`,
    tip: false,
    method: 'get',
    data
  })
}

// 创建成员社群
export function addMember (data) {
  return request({
    url: `${prefix[0]}/group/unit`,
    method: 'post',
    data
  })
}

// 获取成员社群信息
export function getMemberInfo (data) {
  return request({
    url: `${prefix[0]}/group/unit`,
    method: 'get',
    data
  })
}

// 修改成员社群信息
export function updateMemberInfo (data) {
  return request({
    url: `${prefix[0]}/group/unit/read/${data.guid}`,
    method: 'get',
    data
  })
}

// 删除成员社群
export function deleteMemberInfo (data) {
  return request({
    url: `${prefix[0]}/group/unit`,
    method: 'delete',
    data
  })
}

// 成员社群名称是否存在
export function getMemberNameIsExist (data) {
  return request({
    url: `${prefix[0]}/group/read/unit/name`,
    method: 'get',
    data
  })
}


// 单店社群加入管理员（连锁、商场）社群
export function joinManageCommunity (data) {
  return request({
    url: `${prefix[0]}/group/unit/join`,
    method: 'post',
    data
  })
}

// 成员社群退出
export function exitManageCommunity (data) {
  return request({
    url: `${prefix[0]}/group/unit/exit`,
    method: 'delete',
    data
  })
}


// 添加楼层及地图
export function addFloorMap (data) {
  return request({
    url: `${prefix[0]}/group/unit/floor`,
    method: 'post',
    data
  })
}

// 更新楼层及地图
export function updateFloorMap (data) {
  return request({
    url: `${prefix[0]}/group/unit/floor`,
    method: 'put',
    data
  })
}





/******************  出入口管理  **********************/

// 创建出入口 / 通道
export function addPortal (data) {
  return request({
    url: `${prefix[0]}/portal`,
    data,
    method: 'post'
  })
}

// 编辑出入口
export function updatePortal (data) {
  return request({
    url: `${prefix[0]}/portal`,
    data,
    method: 'put'
  })
}

// 删除出入口
export function deletePortal (data) {
  return request({
    url: `${prefix[0]}/portal/${data.portalGuid}`,
    data,
    method: 'delete'
  })
}

// 出入口、通道 绑定设备
export function addDevcieInPortal (data) {
  return request({
    url: `${prefix[0]}/portal/device/add`,
    data,
    method: 'post'
  })
}

// 出入口、通道 解绑设备
export function deleteDevcieInPortal (data) {
  return request({
    url: `${prefix[0]}/portal/device/delete`,
    data,
    method: 'delete'
  })
}

// 出入口名称校验
export function getPortalNameIsExist (data) {
  return request({
    url: `${prefix[0]}/portal/read/name`,
    data,
    method: 'get',
    tip: false
  })
}

// 出入口信息
export function getPortalInfo (data) {
  return request({
    url: `${prefix[0]}/portal/read/${data.portalGuid}}`,
    data,
    method: 'get'
  })
}

// 社群下所有出入口列表
export function getPortalList (data) {
  return request({
    url: `${prefix[0]}/portal/read/group`,
    data,
    method: 'get'
  })
}

// 社群下出入口分页列表
export function getPortalPageList (data) {
  return request({
    url: `${prefix[0]}/portal/read/group`,
    data,
    method: 'get'
  })
}

// 出入口下的所有绑定设备
export function getPortalDeviceList (data) {
  return request({
    url: `${prefix[0]}/portal/read/group`,
    data,
    method: 'get'
  })
}

// 出入口列表查询
export function searchPortalList (data) {
  return request({
    url: `${prefix[0]}/portal/read/search`,
    data,
    method: 'get'
  })
}
