import request from '@/utils/request'
import prefix from './prefix'

// 获取商户信息
export function GetMerchantInfo (data) {
  return request({
    url: '/merchant/getInfo',
    data
  })
}

// 用户信息更新
export function UserCenterUpdate (data) {
  return request({
    url: '/merchant/usercenter/update',
    data
  })
}

// 更换用户头像
export function SetUserImage (data) {
  return request({
    url: '/merchant/usercenter/image',
    data
  })
}

// 开发者信息
export function DeveloperFind (data) {
  return request({
    url: '/developer/find',
    data
  })
}

// 通知创建、更新
export function HandleNotice (data, type) {
  return request({
    url: `/dataNotice/${type}`,
    data
  })
}

// 通知创建、更新
export function GetNoticeInfo (data) {
  return request({
    url: `/dataNotice/getInfo`,
    data
  })
}

// 废弃通知
export function DiscardNotice (data) {
  return request({
    url: '/dataNotice/discard',
    data
  })
}

// 获取通知列表
export function GetNoticeList (data) {
  return request({
    url: '/dataNotice/page/list',
    data
  })
}

// 系统通知消息列表
export function SiteNoticeList () {
  return request({
    url: '/siteNotice/list'
  })
}

// 申请开发者
export function ApplyDeveloper (data) {
  return request({
    url: '/developer/apply',
    data
  })
}

// 商户是否存在设备
export function DeviceIsEmpty (data) {
  return request({
    tip: false,
    url: '/device/merchant/exist',
    data
  })
}

// 退出登录
export function SignOut () {
  return request({
    url: '/signout'
  })
}

/**
 * 线下浏览器1.3
 * */
// 开发者申请
export function applyDevelope (data) {
  return request({
    url: `${prefix[0]}/develope`,
    method: 'POST',
    data
  })
}

// 开发者信息查询
export function getDevelopeInfo (data) {
  return request({
    url: `${prefix[0]}/developer/read/${data.merchantGuid}`,
    method: 'GET',
    data
  })
}

// 添加消息通知的时候检验URL是否存在
export function judgeUrl (data) {
  return request({
    url: `${prefix[0]}/dataNotice/read/url`,
    method: 'GET',
    tip: false,
    data
  })
}

// 获取通知详细信息
export function getNoticeInfoById (data) {
  return request({
    url: `${prefix[0]}/dataNotice/read/${data.dataNoticeGuid}`,
    method: 'GET',
    data
  })
}

// 获取用户下所有的消息通知
export function getNoticeList (data) {
  return request({
    url: `${prefix[0]}/dataNotice/read/list/${data.merchantGuid}`,
    method: 'GET',
    data
  })
}

// 数据通知创建
export function createNotice (data) {
  return request({
    url: `${prefix[0]}/notice`,
    method: 'POST',
    data
  })
}

// 数据通知修改
export function updateNotice (data) {
  return request({
    url: `${prefix[0]}/notice`,
    method: 'PUT',
    data
  })
}

// 数据通知删除
export function deleteNotice (data) {
  return request({
    url: `${prefix[0]}/notice/${data.dataNoticeGuid}`,
    method: 'DELETE',
    data
  })
}

// 判断用户下是否存在设备
export function judgeHaveDevice (data) {
  return request({
    url: `${prefix[0]}/device/read/exist/${data.merchantGuid}`,
    method: 'GET',
    tip: false,
    data
  })
}
