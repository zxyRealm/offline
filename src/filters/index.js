// set function parseTime,formatTime to filter
export {parseTime, formatTime, customType, IntToFloor} from '@/utils'

function pluralize (time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

// 设备类型
export function deviceType (type, use) {
  switch (type) {
    case 1:
      return !use ? '服务器' : '为下辖设备通信'
    case 2:
      return !use ? '一体机' : '客行分析' // 一体机
    case 3:
      return !use ? '一体机' : '人脸抓拍' // 一体机
    case 4:
      return !use ? '摄像头' : '客行分析'// 摄像头
    case 5:
      return !use ? '摄像头' : '人脸抓拍' // 摄像头
    default:
      return '—'
  }
}

// 设备操作权限
export function authority (str) {
  return (str || '').split(',') <= 1 ? '数据查看权限' : '数据查看权限、设备操作权限'
}

export function lineState (state) {
  switch (state) {
    case undefined:
      return '暂无'
    case 1:
      return '离线'
    default:
      return '在线'
  }
}

export function timeAgo (time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

/* 数字 格式化 */
export function numberFormatter (num, digits) {
  const si = [
    {value: 1E18, symbol: 'E'},
    {value: 1E15, symbol: 'P'},
    {value: 1E12, symbol: 'T'},
    {value: 1E9, symbol: 'G'},
    {value: 1E6, symbol: 'M'},
    {value: 1E3, symbol: 'k'}
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}

export function toThousandslsFilter (num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}
