import request from '@/utils/request'
import prefix from './prefix'

// 进出客流统计列表
export function getInOutFlowList (data) {
  return request({
    url: `${prefix[1]}/flowAnalysis/inOutPassengerFlowForm`,
    data,
    method: 'get'
  })
}

// 去重客流统计表
export function getDeduplicatedList (data) {
  return request({
    url: `${prefix[1]}/flowAnalysis/toReenterInFlowForm`,
    data,
    method: 'get'
  })
}

// 进出客流折线图
export function getInOutFlowLine (data) {
  return request({
    url: `${prefix[1]}/flowAnalysis/inOutFlowLine`,
    data,
    method: 'get'
  })
}

// 去重客流折线图
export function getDeduplicatedFlowLine (data) {
  return request({
    url: `${prefix[1]}/flowAnalysis/toReenterInFlowLine`,
    data,
    method: 'get'
  })
}

// 性别客流折线图
export function getGenderLine (data) {
  return request({
    url: `${prefix[1]}/flowAnalysis/genderFlowLine`,
    data,
    method: 'get'
  })
}

// 性别客流饼图
export function getGenderPie (data) {
  return request({
    url: `${prefix[1]}/flowAnalysis/genderFlowPie`,
    data,
    method: 'get'
  })
}

// 年龄客流饼图
export function getAgeLine (data) {
  return request({
    url: `${prefix[1]}/flowAnalysis/ageFlowLine`,
    data,
    method: 'get'
  })
}

// 年龄客流饼图
export function getAgePie (data) {
  return request({
    url: `${prefix[1]}/flowAnalysis/ageFlowPie`,
    data,
    method: 'get'
  })
}

// 回头客流线图
export function getRepeatLine (data) {
  return request({
    url: `${prefix[1]}/flowAnalysis/repeatFlowLine`,
    data,
    method: 'get'
  })
}

// 回头客流饼图
export function getRepeatPie (data) {
  return request({
    url: `${prefix[1]}/flowAnalysis/repeatFlowPie`,
    data,
    method: 'get'
  })
}


/***********************  商场定制排行 ******************************/

// 门店排行
export function getMarketStoreList (data) {
  return request({
    url: `${prefix[1]}/store/storeRanking`,
    data,
    method: 'get'
  })
}

// 业态排行
export function getMarketIndustryList (data) {
  return request({
    url: `${prefix[1]}/store/formatsRanking`,
    data,
    method: 'get'
  })
}

// 楼层排行
export function getMarketFloorList (data) {
  return request({
    url: `${prefix[1]}/store/floorRanking`,
    data,
    method: 'get'
  })
}

// 出入口客流排行
export function getMarketGateList (data) {
  return request({
    url: `${prefix[1]}/store/externalGatewayRanking`,
    data,
    method: 'get'
  })
}


/***********************  连锁定制排行 ******************************/

// 门店排行
export function getChainStoreList (data) {
  return request({
    url: `${prefix[1]}/chain/storeRanking`,
    data,
    method: 'get'
  })
}

// 区域客流排行
export function getChainAreaList (data) {
  return request({
    url: `${prefix[1]}/chain/regionalRanking`,
    data,
    method: 'get'
  })
}
