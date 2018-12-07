import request from '@/utils/new-request'
// 获取商场结构信息

// 校验社群名称是否存在
export function CheckNameExist (data) {
  return request({
    url: '/group/name/exist',
    data
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
export function GetMarketList (data) {
  return request({
    url: '/group/son/market/list',
    data
  })
}
