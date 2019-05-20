import request from '../utils/request'
const headers = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}

export function GetCode (data) {
  return request({
    url: '/account/generateRegisterVerifyCode',
    method: 'post',
    data
  })
}

export function GetForgotCode (data) {
  return request({
    url: '/account/generateForgotPasswordVerifyCode',
    method: 'post',
    data
  })
}

export function Login (data) {
  return request({
    url: '/account/login',
    method: 'post',
    data,
    ...headers
  })
}

export function Register (data) {
  return request({
    url: '/account/register',
    method: 'post',
    data,
    ...headers
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

export function exitLogin (data) {
  return request({
    url: '/account/logout',
    method: 'post',
    data
  })
}

export function checkLoginStatus (data) {
  return request({
    tip: false,
    url: '/account/checkLoginStatus',
    method: 'get',
    data
  })
}
