import request from '@/utils/request'
import prefix from './prefix'
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
