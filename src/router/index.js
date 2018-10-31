import Vue from 'vue'
import Router from 'vue-router'
import {fetch, exitMessage} from '@/utils/request'

const Test = () => import('@/views/test.vue')
const Layout = () => import('@/views/layout/Layout.vue')
// 社群管理
const Community = () => import('@/views/community/mine.vue')
const customCommunity = () => import('@/views/community/custom.vue')
const editCustom = () => import('@/views/community/edit-custom.vue')
const addCommunity = () => import('@/views/community/add-community.vue')
const joinCommunity = () => import('@/views/community/join-community.vue')
// 设备管理
const Equipment = () => import('@/views/equipment/mine.vue')
const EquipmentMore = () => import('@/views/equipment/more.vue')
const EquipmentChildren = () => import('@/views/equipment/children.vue')
const EquipmentService = () => import('@/views/equipment/service.vue')
// 人员管理
const Member = () => import('@/views/member/index.vue')
const Library = () => import('@/views/member/library.vue')
const Person = () => import('@/views/member/person.vue')
const Details = () => import('@/views/member/details.vue')

// 开发者中心
const Developer = () => import('@/views/developer/index.vue')
// 消息通知
const notifyCallback = () => import('@/views/developer/notify/add-info')
const sysNotify = () => import('@/views/developer/notify/index')
const apiIndex = () => import('@/views/developer/api/index.vue')
const paramExplain = () => import('@/views/developer/notify/explain.vue')

/* 数据可视化的路由 */
const Data = () => import('@/views/data/index.vue')
const guestAnalysis = () => import('@/views/data/guest-analysis')
const genderAnalysis = () => import('@/views/data/gender-analysis')
const ageAnalysis = () => import('@/views/data/age-analysis')
const shopFrequencyAnalysis = () => import('@/views/data/shop-frequency-analysis')

/** 控制台 **/
const consoleIndex = () => import('@/views/console/index.vue')

/** 首页+消息 **/
const homePage = () => import('@/views/index/index')
// 系统通知
const homeNotify = () => import('@/views/index/notify/index')

const error404 = () => import('@/views/errorPage/404')
Vue.use(Router)
export const constantRouterMap = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    component: Layout,
    meta: {
      title: '首页'
    },
    children: [
      {
        path: '',
        name: 'index-lwh',
        meta: {
          title: '首页-线下浏览器服务平台',
          keepAlive: false
        },
        component: homePage
      },
      {
        path: '/index/notify/:notifyState',
        name: 'index-home',
        meta: {
          title: '系统消息-线下浏览器服务平台',
          keepAlive: false
        },
        component: homeNotify
      }
    ]
  },
  {
    path: '/test/:id([1-9]\\d*)?/:key?',
    component: Layout,
    children: [
      {
        path: '',
        component: Test
      }
    ]
  },
  {
    path: '/console',
    component: Layout,
    meta: {
      title: '控制台'
    },
    children: [
      {
        path: '/',
        name: 'console-lwh',
        meta: {
          title: '控制台-线下浏览器服务平台',
          keepAlive: false
        },
        component: consoleIndex
      }
    ]
  },
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
          title: '我的社群-社群管理-线下浏览器服务平台'
        },
        component: Community
      },
      {
        path: 'custom',
        name: 'customCommunity',
        meta: {
          title: '自定义分组-社群管理-线下浏览器服务平台'
        },
        component: customCommunity
      },
      {
        path: 'custom/create',
        name: 'createCustom',
        meta: {
          title: '创建分组-社群管理-线下浏览器服务平台',
          keepAlive: false
        },
        component: editCustom
      },
      {
        path: 'custom/edit/:id([0-9A-Z]{32})',
        name: 'editCustom',
        meta: {
          title: '编辑分组信息-社群管理-线下浏览器服务平台',
          keepAlive: true
        },
        component: editCustom
      },
      {
        path: 'single',
        name: 'singleCommunity',
        meta: {
          title: '新建单店社群-社群管理-线下浏览器服务平台',
          keepAlive: false
        },
        component: addCommunity
      },
      {
        path: 'single/:gid([0-9A-Z]{32})',
        name: 'editSingleCommunity',
        meta: {
          title: '编辑单店社群-社群管理-线下浏览器服务平台',
          keepAlive: false
        },
        component: addCommunity
      },
      {
        path: 'apply',
        name: 'applyCommunity',
        meta: {
          title: '新建子社群-社群管理-线下浏览器服务平台',
          keepAlive: false
        },
        component: addCommunity
      },
      {
        path: 'apply/:gid([0-9A-Z]{32})',
        name: 'editApplyCommunity',
        meta: {
          title: '编辑子社群-社群管理-线下浏览器服务平台',
          keepAlive: false
        },
        component: addCommunity
      },
      {
        path: 'create',
        name: 'createCommunity',
        meta: {
          title: '新建管理员社群-社群管理-线下浏览器服务平台',
          keepAlive: false
        },
        component: addCommunity
      },
      {
        path: 'edit/:gid([0-9A-Z]{32})',
        name: 'editCommunity',
        meta: {
          title: '编辑社群信息-社群管理-线下浏览器服务平台',
          keepAlive: false
        },
        component: addCommunity
      },
      {
        path: 'join',
        name: 'joinCommunity',
        meta: {
          title: '编辑社群信息-社群管理-线下浏览器服务平台',
          keepAlive: false
        },
        component: joinCommunity
      }
    ]
  },
  {path: '/equipment', redirect: '/equipment/mine'},
  {
    path: '/equipment',
    component: Layout,
    meta: {
      title: '设备管理-线下浏览器服务平台'
    },
    children: [
      {
        path: 'mine',
        name: 'equipment',
        meta: {
          title: '自有设备-设备管理-线下浏览器服务平台',
          keepAlive: true
        },
        component: Equipment
      },
      {
        path: 'children',
        name: 'equipmentChildren',
        meta: {
          title: '子社群设备-设备管理-线下浏览器服务平台',
          auth: true,
          keepAlive: false
        },
        component: EquipmentChildren
      },
      {
        path: 'mine/service/:key', // ([0-9A-Z-_]{16})
        name: 'equipmentMineService',
        meta: {
          title: '自有设备服务-设备管理-线下浏览器服务平台',
          keepAlive: false
        },
        component: EquipmentService
      },
      {
        path: 'service/:key', // ([0-9A-Z-_]{16})
        name: 'equipmentService',
        meta: {
          title: '非自有设备服务-设备管理-线下浏览器服务平台',
          keepAlive: false
        },
        component: EquipmentService
      },
      {
        path: 'more/:key', // ([0-9A-Z-_]{16})
        name: 'equipmentMore',
        meta: {
          title: '分析终端用途-设备管理-线下浏览器服务平台',
          keepAlive: false
        },
        component: EquipmentMore
      },
      {
        path: 'children/search/:name',
        name: 'searchChildren',
        meta: {
          title: '子社群设备搜索-设备管理-线下浏览器服务平台',
          keepAlive: false
        },
        component: EquipmentChildren
      },
      {
        path: 'mine/search/:name',
        name: 'searchMine',
        meta: {
          title: '自有社群设备搜索-设备管理-线下浏览器服务平台',
          keepAlive: false
        },
        component: Equipment
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
        meta: {title: '人员管理-线下浏览器服务平台'},
        component: Member
      },
      {
        path: 'library',
        name: 'Library',
        meta: {title: '人员管理-线下浏览器服务平台'},
        component: Library
      },
      {
        path: 'person',
        name: 'Person',
        meta: {title: '人员管理-线下浏览器服务平台'},
        component: Person
      },
      {
        path: 'details',
        name: 'Details',
        meta: {title: '人员管理-线下浏览器服务平台'},
        component: Details
      }
    ]
  },
  {
    path: '/data',
    component: Layout,
    redirect: '/data/index',
    meta: {
      title: '数据可视化'
    },
    children: [
      {
        path: 'index',
        name: 'data',
        meta: {
          title: '数据可视化-线下浏览器服务平台',
          keepAlive: false
        },
        component: Data,
        children: [
          {
            path: '/data/guest-analysis',
            name: 'guest-analysis',
            meta: {
              title: '客流统计-数据可视化-线下浏览器服务平台',
              keepAlive: false
            },
            component: guestAnalysis
          },
          {
            path: '/data/gender-analysis',
            name: 'gender-analysis',
            meta: {
              title: '性别分析-数据可视化-线下浏览器服务平台',
              keepAlive: false
            },
            component: genderAnalysis
          },
          {
            path: '/data/age-analysis',
            name: 'age-analysis',
            meta: {
              title: '年龄分析-数据可视化-线下浏览器服务平台',
              keepAlive: false
            },
            component: ageAnalysis
          },
          {
            path: '/data/shop-frequency-analysis',
            name: 'shop-frequency-analysis',
            meta: {
              title: '到店频次分析-数据可视化-线下浏览器服务平台',
              keepAlive: false
            },
            component: shopFrequencyAnalysis
          }
        ],
        redirect: '/data/guest-analysis'
      }
    ]
  },
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
          title: '个人信息-开发者中心-线下浏览器服务平台',
          keepAlive: false
        },
        component: Developer
      },
      {
        path: 'notify/add-info',
        name: 'addNotifyCallback',
        meta: {
          auth: true,
          title: '创建回调信息-开发者中心-线下浏览器服务平台',
          keepAlive: false
        },
        component: notifyCallback
      },
      {
        path: 'notify/:id([0-9A-Z]{32})',
        name: 'editNotifyCallback',
        meta: {
          auth: true,
          title: '编辑回调信息-开发者中心-线下浏览器服务平台',
          keepAlive: false
        },
        component: notifyCallback
      },
      {
        path: 'notify',
        name: 'sysNotify',
        meta: {
          auth: true,
          title: '消息通知-开发者中心-线下浏览器服务平台',
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
          title: '个人信息-开发者中心-线下浏览器服务平台',
          keepAlive: false
        },
        component: Developer
      },
      {
        path: '/person/edit',
        name: 'personEdit',
        meta: {
          auth: true,
          title: '编辑信息-开发者中心-线下浏览器服务平台',
          keepAlive: false
        },
        component: Developer
      },
      {
        path: 'api',
        redirect: 'api/index'
      },
      {
        path: 'api/index',
        name: 'apiToken',
        meta: {
          auth: true,
          title: '开放API-开发者中心-线下浏览器服务平台',
          keepAlive: false
        },
        component: apiIndex
      },
      {
        path: 'api/faceimg',
        name: 'apiFaceImg',
        meta: {
          auth: true,
          title: '开放API-开发者中心-线下浏览器服务平台',
          keepAlive: false
        },
        component: apiIndex
      },
      {
        path: 'param/explain',
        name: 'paramExplain',
        meta: {
          auth: true,
          title: '参数说明-开发者中心-线下浏览器服务平台',
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
    'editNotifyCallback': 'sysNotify'
  }

  fetch('/loginCheck', false).then(() => {
    if (aliveObj[to.name]) {
      let nameSet = new Set(aliveObj[to.name].split(','))
      if (nameSet.has(from.name)) {
        from.meta.keepAlive = true
      } else {
        from.meta.keepAlive = false
      }
    } else {
      from.meta.keepAlive = false
    }
    next()
  }).catch(err => {
    if (err.code === 'ERR-110') {
      // exitMessage(err.data)
    }
  })
})
export default router
