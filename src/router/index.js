import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import {fetch, exitMessage} from '@/utils/request'
const Layout = () => import('@/views/layout/Layout.vue')
const Community = () => import('@/views/community/index.vue')
const customCommunity = () => import('@/views/community/custom.vue')
const editCustom = () => import('@/views/community/edit-custom.vue')
const addCommunity = () => import('@/views/community/add-community.vue')
const joinCommunity = () => import('@/views/community/join-community.vue')

const Equipment = () => import('@/views/equipment/mine.vue')
const EquipmentMore = () => import('@/views/equipment/more.vue')
const EquipmentChildren = () => import('@/views/equipment/children.vue')

const Developer = () => import('@/views/developer/index.vue')
const notifyCallback = () => import('@/views/developer/notify/add-info')
const sysNotify = () => import('@/views/developer/notify/index')
const apiIndex = () => import('@/views/developer/api/index.vue')
const paramExplain = () => import('@/views/developer/notify/explain.vue')
const Data = () => import('@/views/data/index.vue')

/* 数据可视化的路由 */
const guestAnalysis = () => import('@/views/data/guest-analysis')
const genderAnalysis = () => import('@/views/data/gender-analysis')
const ageAnalysis = () => import('@/views/data/age-analysis')
const shopFrequencyAnalysis = () => import('@/views/data/shop-frequency-analysis')

/** 控制台 **/
const consoleIndex = () => import('@/views/console/index.vue')

/** 首页+消息 **/
const homePage = () => import('@/views/index/index')
const homeNotify = () => import('@/views/index/notify/index')

const Demo = () => import('@/components/HelloWorld')
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
      auth: true,
      title: '首页',
      roles: ['admin']
    },
    children: [
      {
        path: '',
        name: 'index-lwh',
        meta: {
          title: '首页-线下浏览器服务平台'
        },
        component: homePage
      },
      {
        path: '/index/notify/:notifyState',
        name: 'index-home',
        meta: {
          title: '系统消息-首页-线下浏览器服务平台'
        },
        component: homeNotify
      }
    ]
  },
  {
    path: '/console',
    component: Layout,
    meta: {
      auth: true,
      title: '控制台',
      roles: ['admin']
    },
    children: [
      {
        path: '/',
        name: 'console-lwh',
        meta: {
          title: '控制台-线下浏览器服务平台'
        },
        component: consoleIndex
      },
      {
        path: '/test',
        name: 'test-demo',
        meta: {
          title: '示例-线下浏览器服务平台'
        },
        component: Demo
      }
    ]
  },
  {
    path: '/community',
    component: Layout,
    redirect: '/community/mine',
    meta: {
      auth: true,
      title: '社群管理',
      roles: ['admin']
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
          title: '创建分组-社群管理-线下浏览器服务平台'
        },
        component: editCustom
      },
      {
        path: 'custom/edit/:id([0-9A-Z]{32})',
        name: 'editCustom',
        meta: {
          title: '编辑分组信息-社群管理-线下浏览器服务平台'
        },
        component: editCustom
      },
      {
        path: 'create',
        name: 'createCommunity',
        meta: {
          title: '新建社群-社群管理-线下浏览器服务平台'
        },
        component: addCommunity
      },
      {
        path: 'edit/:gid([0-9A-Z]{32})',
        name: 'editCommunity',
        meta: {
          title: '编辑社群信息-社群管理-线下浏览器服务平台'
        },
        component: addCommunity
      },
      {
        path: 'join',
        name: 'joinCommunity',
        meta: {
          title: '编辑社群信息-社群管理-线下浏览器服务平台'
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
      auth: true,
      title: '设备管理-线下浏览器服务平台',
      roles: ['admin']
    },
    children: [
      {
        path: 'mine',
        name: 'equipment',
        meta: {
          title: '自有设备-设备管理-线下浏览器服务平台',
          auth: true
        },
        component: Equipment
      },
      {
        path: 'children',
        name: 'equipmentChildren',
        meta: {
          title: '子社群设备-设备管理-线下浏览器服务平台',
          auth: true
        },
        component: EquipmentChildren
      },
      {
        path: 'more/:key([0-9A-Z-_]{16})',
        name: 'equipmentMore',
        meta: {
          title: '分析终端用途-设备管理-线下浏览器服务平台',
          auth: true
        },
        component: EquipmentMore
      },
      {
        path: 'search/children/:key',
        name: 'searchChildren',
        meta: {
          title: '子社群设备搜索-设备管理-线下浏览器服务平台',
          auth: true
        },
        component: EquipmentChildren
      },
      {
        path: 'search/mine/:key',
        name: 'searchMine',
        meta: {
          title: '自有社群设备搜索-设备管理-线下浏览器服务平台'
        },
        component: Equipment
      }
    ]
  },
  {
    path: '/data',
    component: Layout,
    redirect: '/data/index',
    meta: {
      auth: true,
      title: '数据可视化',
      roles: ['admin']
    },
    children: [
      {
        path: 'index',
        name: 'data',
        meta: {
          title: '数据可视化-线下浏览器服务平台'
        },
        component: Data,
        children: [
          {
            path: '/data/guest-analysis',
            name: 'guest-analysis',
            meta: {
              title: '客流统计-数据可视化-线下浏览器服务平台'
            },
            component: guestAnalysis
          },
          {
            path: '/data/gender-analysis',
            name: 'gender-analysis',
            meta: {
              title: '性别分析-数据可视化-线下浏览器服务平台'
            },
            component: genderAnalysis
          },
          {
            path: '/data/age-analysis',
            name: 'age-analysis',
            meta: {
              title: '年龄分析-数据可视化-线下浏览器服务平台'
            },
            component: ageAnalysis
          },
          {
            path: '/data/shop-frequency-analysis',
            name: 'shop-frequency-analysis',
            meta: {
              title: '到店频次分析-数据可视化-线下浏览器服务平台'
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
          title: '个人信息-开发者中心-线下浏览器服务平台'
        },
        component: Developer
      },
      {
        path: 'notify/add-info',
        name: 'addNotifyCallback',
        meta: {
          auth: true,
          title: '创建回调信息-开发者中心-线下浏览器服务平台'
        },
        component: notifyCallback
      },
      {
        path: 'notify/:id([0-9A-Z]{32})',
        name: 'editNotifyCallback',
        meta: {
          auth: true,
          title: '编辑回调信息-开发者中心-线下浏览器服务平台'
        },
        component: notifyCallback
      },
      {
        path: 'notify',
        name: 'sysNotify',
        meta: {
          auth: true,
          title: '消息通知-开发者中心-线下浏览器服务平台'
        },
        component: sysNotify
      },
      {
        path: '/person/center',
        name: 'personCenter',
        meta: {
          auth: true,
          title: '个人信息-开发者中心-线下浏览器服务平台'
        },
        component: Developer
      },
      {
        path: '/person/edit',
        name: 'personEdit',
        meta: {
          auth: true,
          title: '编辑信息-开发者中心-线下浏览器服务平台'
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
          title: '开放API-开发者中心-线下浏览器服务平台'
        },
        component: apiIndex
      },
      {
        path: 'api/faceimg',
        name: 'apiFaceImg',
        meta: {
          auth: true,
          title: '开放API-开发者中心-线下浏览器服务平台'
        },
        component: apiIndex
      },
      {
        path: 'param/explain',
        name: 'paramExplain',
        meta: {
          auth: true,
          title: '参数说明-开发者中心-线下浏览器服务平台'
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
    // console.log(query);
    let str = ''
    for (let item in query) {
      str += `${item}=${(query[item])}&`
    }
    let fullStr = str.replace(/&$/, '')
    return fullStr ? '?' + fullStr : ''
  }
})

router.beforeEach((to, from, next) => {
  fetch('/loginCheck', false).then(res => {
    if (to.name === 'personCenter' && (!store.state.userInfo.company || !store.state.userInfo.phone)) {
      next('/person/edit')
    } else {
      next()
    }
  }).catch(err => {
    if (err.code === 'ERR-110') {
      exitMessage(err.data)
    }
  })
})
export default router
