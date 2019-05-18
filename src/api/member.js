import request from '@/utils/request'
import prefix from './prefix'
/**
* 线下浏览器1.3
* */
// 创建人员库
export function createPersonLibrary (data) {
  return request({
    url: `${prefix[3]}/personLibrary/add`,
    method: 'POST',
    data
  })
}
// 删除人员库
export function deletePersonLibrary (data) {
  return request({
    url: `${prefix[3]}/personLibrary/delete/${data.personLibraryId}`,
    method: 'DELETE',
    data
  })
}
// 单个人员库信息查询
export function getPersonLibraryById (data) {
  return request({
    url: `${prefix[3]}/personLibrary/select/${data.personLibraryId}`,
    method: 'POST',
    data
  })
}
// 社群下所有人员库信息查询
export function getPersonLibraryList (data) {
  return request({
    url: `${prefix[3]}/personLibrary/selectAll`,
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
    url: `${prefix[3]}/person/add`,
    method: 'POST',
    data
  })
}
// 删除人员
export function deletePerson (data) {
  return request({
    url: `${prefix[3]}/person/delete/${data.personId}`,
    method: 'DELETE',
    data
  })
}
// 单个人员的信息查询
export function getPersonById (data) {
  return request({
    url: `${prefix[3]}/person/select`,
    method: 'GET',
    data
  })
}
// 筛选人员信息
export function getPersonList (data) {
  return request({
    url: `${prefix[3]}/person/screening`,
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
    url: `${prefix[3]}/personType/delete/${data.id}`,
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
    tip: false,
    url: `${prefix[3]}/personLibrary/personLibraryName/exist`,
    method: 'GET',
    data
  })
}
// 校验手机号是否重复
export function judgePhone (data) {
  return request({
    tip: false,
    url: `${prefix[3]}/person/existPhone`,
    method: 'GET',
    data
  })
}
