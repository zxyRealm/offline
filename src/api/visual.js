import request from '@/utils/request'
import prefix from './prefix'
// 折线图接口
export function GetChartLine (data) {
  return request({
    url: '/chart/line',
    data
  })
}

// 饼状图接口
export function GetChartPie (data) {
  return request({
    url: '/chart/pie',
    data
  })
}

// 客流排行榜查询
export function getFlowRank (data) {
  return request({
    tip: false,
    url: `${prefix[1]}/realTime/topTypeRankingTop`,
    data,
    method: 'get'
  })
}

// 首页实时比例接口
export function getTimeRatio (data) {
  return request({
    tip: false,
    url: `${prefix[1]}/realTime/typeDayRealTime`,
    method: 'get'
  })
}
// 获取实时比率
export function GetTimeRatio (data) {
  return request({
    tip: false,
    url: '/chart/ratio',
    data
  })
}

// 数据分析客流统计表格数据
export function GetFlowCount (data) {
  return request({
    url: '/chart/flow/count',
    data
  })
}

// 获取缓存人脸数据
export function GetLatestFace (data) {
  return request({
    url: '/chart/getLatestFace',
    data
  })
}

// 控制台获取会员信息
export function GetMemberList (data) {
  return request({
    url: '/personData',
    data
  })
}

// 客流统计人员到访记录
export function GetVisitedList (data) {
  return request({
    url: '/chart/inflow/Image',
    data
  })
}
