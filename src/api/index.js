import request from '@/utils/request'
import prefix from './prefix'

// 首页数据分析模块

// 去重进客流
export function getFlowAnalysisTime (data) {
  return request({
    tip: false,
    url: `${prefix[1]}/flowAnalysis/toReenterInFlowLine`,
    method: 'get',
    data
  })
}

// 进出客流折线图
export function getFlowInOutTime (data) {
  return request({
    tip: false,
    url: `${prefix[1]}/flowAnalysis/inOutFlowLine`,
    method: 'get',
    data
  })
}

// 门店业态客流排行榜查询
export function getFlowRankTime (data) {
  return request({
    tip: false,
    url: `${prefix[1]}/realTime/topTypeRankingTop`,
    data,
    method: 'get'
  })
}

// 实时比例数据
export function getRatioTime (data) {
  return request({
    tip: false,
    url: `${prefix[1]}/realTime/typeDayRealTime`,
    data,
    method: 'get'
  })
}
