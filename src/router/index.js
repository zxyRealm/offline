import Vue from 'vue'
import Router from 'vue-router'
import Cookie from 'js-cookie'
import request from '@/utils/request'
import { checkLoginStatus } from '../api/account'

const Layout = () => import('@/views/layout/Layout.vue')

// 账号

// 登录
const Login = () => import('@/views/account/login.vue')

// 注册
const Register = () => import('@/views/account/register.vue')

// 社群管理
const Community = () => import('@/views/community/mine.vue')
const CommunityGuide = () => import('@/views/community/guide.vue')
const CommunityCreate = () => import('@/views/community/create.vue')

// 设备管理
const EquipmentList = () => import('@/views/equipment/index.vue')
const EquipmentAio = () => import('@/views/equipment/aio.vue')
const EquipmentServer = () => import('@/views/equipment/server.vue')
const EquipmentPortal = () => import('@/views/equipment/portal.vue')
const EquipmentCamera = () => import('@/views/equipment/camera.vue')

// 人员管理
const Member = () => import('@/views/member/index.vue')
const Person = () => import('@/views/member/person.vue')

// 行为分析
const Behavior = () => import('@/views/behavior/index.vue')
const BehaviorAnalyse = () => import('@/views/behavior/analyse.vue')
const BehaviorTrail = () => import('@/views/behavior/trail.vue')

// 开发者中心
const Developer = () => import('@/views/developer/index.vue')

// 消息通知
const notifyCallback = () => import('@/views/developer/notify/add-info')
const sysNotify = () => import('@/views/developer/notify/index')
const apiIndex = () => import('@/views/developer/api/index.vue')
const ApiCode = () => import('@/views/developer/api/code.vue')
const apiRule = () => import('@/views/developer/api/rule.vue')
const apiCommon = () => import('@/views/developer/api/common.vue')
const apiFlow = () => import('@/views/developer/api/flow.vue')
const apiCommunity = () => import('@/views/developer/api/community.vue')
const apiAuth = () => import('@/views/developer/api/auth.vue')
const paramExplain = () => import('@/views/developer/notify/explain.vue')

/* 数据可视化的路由 */
const Data = () => import('@/views/data/index.vue')

/** 首页+消息 **/
const homePage = () => import('@/views/index/three')
// 系统通知
const homeNotify = () => import('@/views/index/notify/index')

// tree component test page
const treeTest = () => import('@/views/community/test-tree')

// 404 page
const error404 = () => import('@/views/errorPage/404')

Vue.use(Router)
export const constantRouterMap = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/index',
    component: Layout,
    meta: {
      title: '首页', auth: true
    },
    children: [
      {
        path: '',
        name: 'index-lwh',
        meta: {
          title: '首页-线下浏览器服务平台',
          auth: true,
          keepAlive: false
        },
        component: homePage
      },
      {
        path: '/index/notify/:notifyState',
        name: 'index-home',
        meta: {
          title: '站内信-线下浏览器服务平台',
          auth: true,
          keepAlive: false
        },
        component: homeNotify
      }
    ]
  },
  // 登录
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录-线下浏览器服务平台',
      keepAlive: false
    },
    component: Login
  },
  // 注册
  {
    path: '/register',
    name: 'Register',
    meta: {
      title: '注册-线下浏览器服务平台',
      keepAlive: false
    },
    component: Register
  },

  // 社群管理
  {
    path: '/community',
    component: Layout,
    redirect: '/community/mine',
    meta: {
      title: '社群管理'
    },
    children: [
      {
        path: 'mine',
        name: 'community',
        meta: {
          title: '社群管理-线下浏览器服务平台', auth: true
        },
        component: Community
      },
      {
        path: 'create',
        name: 'communityCreate',
        meta: {
          title: '社群管理-线下浏览器服务平台', auth: true
        },
        component: CommunityGuide
      },
      {
        path: 'create/market',
        name: 'createMarket',
        meta: {
          title: '创建商场-线下浏览器服务平台'
        },
        component: CommunityCreate
      },
      {
        path: 'create/chain',
        name: 'createChain',
        meta: {
          title: '创建连锁-线下浏览器服务平台', auth: true
        },
        component: CommunityCreate
      },
      {
        path: 'create/store',
        name: 'createStore',
        meta: {
          title: '创建单店-线下浏览器服务平台', auth: true
        },
        component: CommunityCreate
      },
      {
        path: 'edit/market',
        name: 'editMarket',
        meta: {
          title: '编辑商场-线下浏览器服务平台', auth: true
        },
        component: CommunityCreate
      },
      {
        path: 'edit/chain',
        name: 'editChain',
        meta: {
          title: '编辑连锁-线下浏览器服务平台', auth: true
        },
        component: CommunityCreate
      },
      {
        path: 'edit/store',
        name: 'editStore',
        meta: {
          title: '编辑单店-线下浏览器服务平台', auth: true
        },
        component: CommunityCreate
      }
    ]
  },
  // 设备管理
  {path: '/equipment', redirect: '/equipment/list'},
  {
    path: '/equipment',
    component: Layout,
    meta: {
      title: '设备管理-线下浏览器服务平台', auth: true
    },
    children: [
      {
        path: 'list',
        name: 'equipment',
        meta: {
          title: '设备管理-线下浏览器服务平台',
          keepAlive: true
        },
        component: EquipmentList
      }
    ]
  },
  // 人员管理路由
  {
    path: '/member',
    component: Layout,
    children: [
      {
        path: '',
        name: 'MemberMine',
        meta: {title: '人员管理-线下浏览器服务平台', auth: true},
        component: Member
      },
      {
        path: 'person',
        name: 'Person',
        meta: {title: '人员管理-线下浏览器服务平台', auth: true},
        component: Person
      }
    ]
  },
  // 数据分析
  {
    path: '/data',
    component: Layout,
    redirect: '/data/index',
    meta: {
      title: '数据可视化'
    },
    children: [
      {
        path: '',
        name: 'data',
        meta: {
          title: '数据分析-线下浏览器服务平台',
          auth: true,
          keepAlive: false
        },
        component: Data
      }
    ]
  },
  // 行为分析
  {path: '/behavior', redirect: '/behavior/analyse'},
  {
    path: '/behavior',
    component: Layout,
    meta: {
      title: '行为分析'
    },
    children: [
      {
        path: '',
        component: Behavior,
        name: 'Behavior',
        children: [
          {
            path: 'trail/:personId?',
            name: 'BehaviorTrail',
            component: BehaviorTrail,
            meta: {
              title: '行为分析-线下浏览器服务平台', auth: true
            }
          },
          {
            path: 'analyse',
            component: BehaviorAnalyse,
            name: 'BehaviorAnalyse',
            meta: {
              title: '行为分析-线下浏览器服务平台', auth: true
            }
          }
        ]
      }
    ]
  },
  // 开发者中心
  {
    path: '/developer',
    component: Layout,
    redirect: '/developer/notify',
    meta: {
      auth: true,
      title: '开发者中心',
      roles: ['admin']
    },
    children: [
      {
        path: 'index',
        name: 'developer',
        meta: {
          auth: true,
          title: '开发者中心-线下浏览器服务平台',
          keepAlive: false
        },
        component: Developer
      },
      {
        path: 'notify/add-info',
        name: 'addNotifyCallback',
        meta: {
          auth: true,
          title: '开发者中心-线下浏览器服务平台',
          keepAlive: false
        },
        component: notifyCallback
      },
      {
        path: 'notify/:id([0-9A-Z]{32})',
        name: 'editNotifyCallback',
        meta: {
          auth: true,
          title: '开发者中心-线下浏览器服务平台',
          keepAlive: false
        },
        component: notifyCallback
      },
      {
        path: 'notify',
        name: 'sysNotify',
        meta: {
          auth: true,
          title: '开发者中心-线下浏览器服务平台',
          keepAlive: false
        },
        component: sysNotify
      },
      {
        path: '/person',
        redirect: '/person/center'
      },
      {
        path: '/person/center',
        name: 'personCenter',
        meta: {
          auth: true,
          title: '个人中心-线下浏览器服务平台',
          keepAlive: false
        },
        component: Developer
      },
      {
        path: '/person/edit',
        name: 'personEdit',
        meta: {
          auth: true,
          title: '个人中心-线下浏览器服务平台',
          keepAlive: false
        },
        component: Developer
      },
      {
        path: 'api',
        redirect: 'api/rule'
      },
      {
        path: 'api',
        name: 'developerApi',
        meta: {
          auth: true,
          title: '开发者中心-线下浏览器服务平台',
          keepAlive: false
        },
        component: apiIndex,
        children: [
          {
            path: 'rule',
            name: 'apiRule',
            meta: {
              auth: true,
              title: '开发者中心-线下浏览器服务平台',
              keepAlive: false
            },
            component: apiRule
          },
          {
            path: 'common',
            name: 'ApiCommon',
            meta: {
              auth: true,
              title: '开发者中心-线下浏览器服务平台',
              keepAlive: false
            },
            component: apiCommon
          },
          {
            path: 'auth',
            name: 'ApiAuth',
            meta: {
              auth: true,
              title: '开发者中心-线下浏览器服务平台',
              keepAlive: false
            },
            component: apiAuth
          },
          {
            path: 'community',
            name: 'ApiCommunity',
            meta: {
              auth: true,
              title: '开发者中心-线下浏览器服务平台',
              keepAlive: false
            },
            component: apiCommunity
          },
          {
            path: 'flow',
            name: 'ApiFlow',
            meta: {
              auth: true,
              title: '开发者中心-线下浏览器服务平台',
              keepAlive: false
            },
            component: apiFlow
          },
          {
            path: 'code',
            name: 'ApiCode',
            meta: {
              auth: true,
              title: '开发者中心-线下浏览器服务平台',
              keepAlive: false
            },
            component: ApiCode
          }
        ]
      },
      {
        path: 'param/explain',
        name: 'paramExplain',
        meta: {
          auth: true,
          title: '开发者中心-线下浏览器服务平台',
          keepAlive: false
        },
        component: paramExplain
      }
    ]
  },
  {
    path: '*',
    component: error404
  }
]

const router = new Router({
  mode: 'history',
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap,
  // 取消掉对query参数 encodeURIComponent编码处理
  stringifyQuery: function (query) {
    let str = ''
    for (let item in query) {
      str += `${item}=${(query[item])}&`
    }
    let fullStr = str.replace(/&$/, '')
    return fullStr ? '?' + fullStr : ''
  }
})

router.beforeEach((to, from, next) => {
  let aliveObj = {
    'editCustom': 'customCommunity',
    'editCommunity': 'community',
    'editApplyCommunity': 'community',
    'editSingleCommunity': 'community',
    'equipmentMore': 'equipmentChildren,equipment',
    'equipmentService': 'equipmentChildren,equipment',
    'paramExplain': 'sysNotify',
    'editNotifyCallback': 'sysNotify',
    'BehaviorTrail': 'BehaviorAnalyse'
  }
  if (to.meta.auth) {
    let [phone, token] = [Cookie.get('user_phone'), Cookie.get('user_token')]
    if (phone && token) {
      checkLoginStatus({phoneNumber: phone, token: token}).then((res) => {
        Cookie.set('user_phone', res.data.phoneNumber)
        Cookie.set('user_token', res.data.token)
        router.app.$options.store.state.userInfo = res.data
        next()
      }).catch(() => {
        Cookie.remove('user_phone')
        Cookie.remove('user_token')
        next({path: '/login'})
      })
    } else {
      Cookie.remove('user_phone')
      Cookie.remove('user_token')
      next({path: '/login'})
    }
  } else {
    next()
  }
  // next()
  // if (to.meta.auth) {
  //   request({url: '/loginCheck', tip: false}).then(() => {
  //     if (aliveObj[to.name]) {
  //       let nameSet = new Set(aliveObj[to.name].split(','))
  //       if (nameSet.has(from.name)) {
  //         from.meta.keepAlive = true
  //       } else {
  //         from.meta.keepAlive = false
  //       }
  //     } else {
  //       from.meta.keepAlive = false
  //     }
  //     next()
  //   }).catch(err => {
  //     if (err.code === 'ERR-110') {
  //     }
  //   })
  // } else {
  //   next()
  // }
})
export default router
