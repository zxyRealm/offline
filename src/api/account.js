import request from '../utils/request'

export function GetCode (data) {
  return request({
    url: '/account/generateRegisterVerifyCode',
    method: 'post',
    data
  })
}
