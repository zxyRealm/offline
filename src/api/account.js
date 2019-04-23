import request from '../utils/request'

export function GetCode (data) {
  return request({
    url: '/account/generateRegisterVerifyCode',
    method: 'post',
    data
  })
}

export function GetForgotCode (data) {
  return request({
    url: '/account/generateForgotPasswordVerifyCod',
    method: 'post',
    data
  })
}

export function Login (data) {
  return request({
    url: '/account/login',
    method: 'post',
    data
  })
}

export function Register (data) {
  return request({
    url: '/account/register',
    method: 'post',
    data
  })
}

export function UpdateAccount (data) {
  return request({
    url: '/account/updateAccount',
    method: 'put',
    data
  })
}

export function UpdateForgotPassword (data) {
  return request({
    url: '/account/updateForgotPassword',
    method: 'put',
    data
  })
}