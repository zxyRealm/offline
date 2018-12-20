import request from '@/utils/new-request'

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
export function GetFlowRank (data) {
  return request({
    url: '/chart/top/flow',
    data
  })
}
// 获取实时比率
export function GetTimeRatio (data) {
  return request({
    url: '/chart/ratio',
    data
  })
}
