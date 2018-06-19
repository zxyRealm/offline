import Vue from 'vue'
import Router from 'vue-router'
import {getToken} from '../utils/auth'
import store from '../store'

const board = () => import('@/views/board');

const Login = () => import('@/views/login/index.vue');
const Layout = () => import('@/views/layout/Layout.vue');
const Community = () => import('@/views/community/index.vue');
const addCommunity = () => import('@/views/community/add-community.vue');

const Equipment = () => import('@/views/equipment/index.vue');
const Developer = () => import('@/views/developer/index.vue');
const notifyCallback = () => import('@/views/developer/notify/add-info');
const sysNotify = () => import('@/views/developer/notify/index');
const apiIndex = () => import('@/views/developer/api/index.vue');
const paramExplain = () => import('@/views/developer/notify/explain.vue');
const Data = () => import('@/views/data/index.vue');

/* 数据可视化的路由 */
const guestAnalysis = () => import('@/views/data/guest-analysis');
const genderAnalysis = () => import('@/views/data/gender-analysis');
const ageAnalysis = () => import('@/views/data/age-analysis');
const shopFrequencyAnalysis = () => import('@/views/data/shop-frequency-analysis');

/** 控制台 **/
const consoleIndex = () => import('@/views/console/index.vue');

Vue.use(Router);


export const constantRouterMap = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    meta: {auth: false, title: '登录-线下浏览器服务平台'},
    component: Login
  }
];

export const asyncRouterMap = [
  {
    path: "/console",
    component: Layout,
    meta: {
      auth: true,
      title: '控制台',
      roles: ['admin']
    },
    children: [
      {
          path: '/',
          name:  'console-lwh',
          meta: {
            title: "控制台入库"
          },
          component: consoleIndex
      }
    ]
  },
  {
    path: "/community",
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
          title: "我的社群-社群管理-线下浏览器服务平台"
        },
        component: Community
      },
      {
        path: 'add',
        name: 'addCommunity',
        meta: {
          title: "我的社群-社群管理-线下浏览器服务平台"
        },
        component: addCommunity
      }
    ]
  },
  {
    path: "/equipment",
    component: Layout,
    redirect: '/equipment/mine',
    meta: {
      auth: true,
      title: "设备管理",
      roles: ['admin']
    },
    children: [
      {
        path: 'mine',
        name: 'equipment',
        meta: {
          title: "自有设备-设备管理-线下浏览器服务平台"
        },
        component: Equipment
      },
      {
        path: 'children',
        name: 'equipmentChildren',
        meta: {
          title: "子社群设备-设备管理-线下浏览器服务平台"
        },
        component: Equipment
      }
    ]
  },
  {
    path: "/data",
    component: Layout,
    redirect: '/data/index',
    meta: {
      auth: true,
      title: "数据可视化",
      roles: ['admin']
    },
    children: [
      {
        path: 'index',
        name: 'data',
        meta: {
          title: "我的社群-数据可视化-线下浏览器服务平台"
        },
        component: Data,
        children: [
          {
            path: '/data/guest-analysis',
            name: 'guest-analysis',
            meta: {
              title: "流客分析"
            },
            component: guestAnalysis
          },
          {
            path: '/data/gender-analysis',
            name: 'gender-analysis',
            meta: {
              title: "性别分析"
            },
            component: genderAnalysis
          },
          {
            path: '/data/age-analysis',
            name: 'age-analysis',
            meta: {
              title: "年龄分析"
            },
            component: ageAnalysis
          },
          {
            path: '/data/shop-frequency-analysis',
            name: 'shop-frequency-analysis',
            meta: {
              title: "到店频次分析"
            },
            component: shopFrequencyAnalysis
          }
        ],
        redirect: '/data/guest-analysis',
      }
    ]
  },
  {
    path: "/developer",
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
          title: "个人信息-开发者中心-线下浏览器服务平台"
        },
        component: Developer
      },
      {
        path: 'notify/add-info',
        name: 'addNotifyCallback',
        meta: {
          auth: true,
          title: "创建回调信息-开发者中心-线下浏览器服务平台"
        },
        component: notifyCallback
      },
      {
        path: 'notify/:id([0-9A-Z]{32})',
        name: 'editNotifyCallback',
        meta: {
          auth: true,
          title: "编辑回调信息-开发者中心-线下浏览器服务平台"
        },
        component: notifyCallback
      },
      {
        path: 'notify',
        name: 'sysNotify',
        meta: {
          auth: true,
          title: "消息通知-开发者中心-线下浏览器服务平台"
        },
        component: sysNotify
      },
      {
        path: 'info',
        redirect: 'info/center'
      },
      {
        path: 'info/center',
        name: 'infoCenter',
        meta: {
          auth: true,
          title: "个人信息-开发者中心-线下浏览器服务平台"
        },
        component: Developer
      },
      {
        path: 'info/edit',
        name: 'infoEdit',
        meta: {
          auth: true,
          title: "编辑信息-开发者中心-线下浏览器服务平台"
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
          title: "开放API-开发者中心-线下浏览器服务平台"
        },
        component: apiIndex
      },
      {
        path: 'api/faceimg',
        name: 'apiFaceImg',
        meta: {
          auth: true,
          title: "开放API-开发者中心-线下浏览器服务平台"
        },
        component: apiIndex
      },
      {
        path: 'param/explain',
        name:'paramExplain',
        meta:{
          auth:true,
          title:'参数说明-开发者中心-线下浏览器服务平台'
        },
        component:paramExplain
      }
    ]
  }
];

const router = new Router({
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
});

router.beforeEach((to, from, next) => {
  if (getToken()) {
    if (store.getters.roles.length === 0) {
      let roles = ['admin'];
      store.commit('SET_ROLES', roles);
      store.dispatch('GenerateRoutes', {roles}).then(() => { // 根据roles权限生成可访问的路由表
        router.addRoutes(store.getters.addRouters); // 动态添加可访问路由表
        next({...to})
      })
    } else {
      next()
    }
  } else {
    if (to.name === 'login') {
      next()
    } else {
      next({path: '/'})
    }
  }
});
export default router
