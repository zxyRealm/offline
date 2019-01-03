import request from '@/utils/new-request'

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
