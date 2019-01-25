import request from '@/utils/request'

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
    tip: false,
    url: '/chart/top/flow',
    data
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
    tip: false,
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
