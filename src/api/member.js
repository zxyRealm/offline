import request from '@/utils/request'
import prefix from './prefix'

// 会员库信息修改
export function MemberLibraryUpdate (data) {
  return request({
    url: '/memberLibrary/update',
    data
  })
}

// 会员是否已存在
export function MemberExistPhone (data) {
  return request({
    tip: false,
    url: '/member/exist/phone',
    data
  })
}

// 会员库创建
export function MemberLibraryCreate (data) {
  return request({
    url: '/memberLibrary/create',
    data
  })
}

// 删除会员库信息
export function MemberLibraryDelete (data) {
  return request({
    url: '/memberLibrary/delete',
    data
  })
}

// 管理社群下会员库列表
export function MemberLibraryList (data) {
  return request({
    url: '/memberLibrary/list',
    data
  })
}

// 会员库信息查找
export function MemberLibraryFind (data) {
  return request({
    url: '/memberLibrary/find',
    data
  })
}

// 会员库名是否重复
export function MemberLibraryNameExist (data) {
  return request({
    tip: false,
    url: '/memberLibrary/name/exist',
    data
  })
}

// 会员库信息查询、获取
export function MemberLibrarySearch (data) {
  return request({
    url: '/memberLibrary/search',
    data
  })
}

// 获取问题列表
export function MemberTypeList (data) {
  return request({
    url: '/memberType/list',
    data
  })
}

// 获取问题更新
export function MemberTypeOperate (data) {
  return request({
    url: '/memberType/operate',
    data
  })
}

// 人员信息更新
export function MemberCreate (data) {
  return request({
    url: '/member/create',
    data
  })
}

// 人员信息更新
export function MemberUpdate (data) {
  return request({
    url: '/member/update',
    data
  })
}

// 人员信息删除
export function MemberDelete (data) {
  return request({
    url: '/member/del',
    data
  })
}

// 人员列表
export function MemberSearch (data) {
  return request({
    url: '/member/search',
    data
  })
}

// 人员列表
export function MemberTemplate (data) {
  return request({
    url: '/member/template',
    data
  })
}

// 人员信息获取
export function MemberDetails (data) {
  return request({
    url: '/member/details',
    data
  })
}

// 人员图片信息入库
export function MemberImgDetect (data) {
  return request({
    url: '/member/img/detect',
    data
  })
}

/**
* 线下浏览器1.3
* */
// 创建人员库
export function createPersonLibrary (data) {
  return request({
    url: `${prefix[3]}/personLibrary/create`,
    method: 'POST',
    data
  })
}
// 删除人员库
export function deletePersonLibrary (data) {
  return request({
    url: `${prefix[3]}/personLibrary/delete`,
    method: 'DELETE',
    data
  })
}
// 单个人员库信息查询
export function getPersonLibraryById (data) {
  return request({
    url: `${prefix[3]}/personLibrary/find`,
    method: 'POST',
    data
  })
}
// 社群下所有人员库信息查询
export function getPersonLibraryList (data) {
  return request({
    url: `${prefix[3]}/personLibrary/findAll`,
    method: 'POST',
    data
  })
}
// 修改人员库信息
export function updatePersonLibrary (data) {
  return request({
    url: `${prefix[3]}/personLibrary/update`,
    method: 'PUT',
    data
  })
}
// 添加人员
export function createPerson (data) {
  return request({
    url: `${prefix[3]}/person/create`,
    method: 'POST',
    data
  })
}
// 删除人员
export function deletePerson (data) {
  return request({
    url: `${prefix[3]}/person/delete`,
    method: 'DELETE',
    data
  })
}
// 单个人员的信息查询
export function getPersonById (data) {
  return request({
    url: `${prefix[3]}/person/find`,
    method: 'GET',
    data
  })
}
// 筛选人员信息
export function getPersonList (data) {
  return request({
    url: `${prefix[3]}/person/find/search`,
    method: 'GET',
    data
  })
}
// 批量添加人员
export function importPerson (data) {
  return request({
    url: `${prefix[3]}/person/import`,
    method: 'POST',
    data
  })
}
// 人员信息修改
export function updatePerson (data) {
  return request({
    url: `${prefix[3]}/person/update`,
    method: 'PUT',
    data
  })
}
// 人员照片检测
export function uploadAndDetection (data) {
  return request({
    url: `${prefix[3]}/person/uploadAndDetection`,
    method: 'POST',
    data
  })
}
// 人员类型创建接口
export function createPersonType (data) {
  return request({
    url: `${prefix[3]}/personType/create`,
    method: 'POST',
    data
  })
}
// 人员类型更新接口
export function updatePersonType (data) {
  return request({
    url: `${prefix[3]}/personType/update`,
    method: 'PUT',
    data
  })
}
// 人员类型删除接口
export function deletePersonType (data) {
  return request({
    url: `${prefix[3]}/personType/delete`,
    method: 'DELETE',
    data
  })
}
// 人员类型列表查询接口
export function getPersonTypeList (data) {
  return request({
    url: `${prefix[3]}/personType/list`,
    method: 'GET',
    data
  })
}
// 判断新增或编辑的人员库名称是否可用
export function judgeLibraryName (data) {
  return request({
    url: `${prefix[3]}/personLibrary/name/exist`,
    method: 'GET',
    data
  })
}
