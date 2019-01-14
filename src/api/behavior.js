import request from '@/utils/new-request'

// 行为分析
export function GetBehaviorList (data) {
  return request({
    url: '/group/face/search',
    data
  })
}

// 行为分析
export function GetPersonTrail (data) {
  return request({
    url: '/group/face/person',
    data
  })
}

export function GetTrace (data) {
  return request({
    url: '/behavior/getTrace',
    data
  })
}

export function GetElevatorListByGroupGuid (data) {
  return request({
    url: '/behavior/getElevatorListByGroupGuid',
    data
  })
}
