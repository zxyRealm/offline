import request from '@/utils/request'

// 会员库信息修改
export function MemberLibraryUpdate (data) {
  return request({
    url: '/memberLibrary/update',
    data
  })
}

// 会员是否已存在
export function MemberExistPhone (data) {
  return request({
    tip: false,
    url: '/member/exist/phone',
    data
  })
}

// 会员库创建
export function MemberLibraryCreate (data) {
  return request({
    url: '/memberLibrary/create',
    data
  })
}

// 删除会员库信息
export function MemberLibraryDelete (data) {
  return request({
    url: '/memberLibrary/delete',
    data
  })
}

// 管理社群下会员库列表
export function MemberLibraryList (data) {
  return request({
    url: '/memberLibrary/list',
    data
  })
}

// 会员库信息查找
export function MemberLibraryFind (data) {
  return request({
    url: '/memberLibrary/find',
    data
  })
}

// 会员库名是否重复
export function MemberLibraryNameExist (data) {
  return request({
    tip: false,
    url: '/memberLibrary/name/exist',
    data
  })
}

// 会员库信息查询、获取
export function MemberLibrarySearch (data) {
  return request({
    url: '/memberLibrary/search',
    data
  })
}

// 获取问题列表
export function MemberTypeList (data) {
  return request({
    url: '/memberType/list',
    data
  })
}

// 获取问题更新
export function MemberTypeOperate (data) {
  return request({
    url: '/memberType/operate',
    data
  })
}

// 人员信息更新
export function MemberCreate (data) {
  return request({
    url: '/member/create',
    data
  })
}

// 人员信息更新
export function MemberUpdate (data) {
  return request({
    url: '/member/update',
    data
  })
}

// 人员信息删除
export function MemberDelete (data) {
  return request({
    url: '/member/del',
    data
  })
}

// 人员列表
export function MemberSearch (data) {
  return request({
    url: '/member/search',
    data
  })
}

// 人员列表
export function MemberTemplate (data) {
  return request({
    url: '/member/template',
    data
  })
}

// 人员信息获取
export function MemberDetails (data) {
  return request({
    url: '/member/details',
    data
  })
}

// 人员图片信息入库
export function MemberImgDetect (data) {
  return request({
    url: '/member/img/detect',
    data
  })
}
