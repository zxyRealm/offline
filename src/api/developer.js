import request from '@/utils/request'

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
