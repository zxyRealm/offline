import Vue from 'vue'
import Router from 'vue-router'
import {getToken} from '../utils/auth'
import store from '../store'

const board = () => import('@/views/board');

const Login = () => import('@/views/login/index.vue');
const Layout = () => import('@/views/layout/Layout.vue');
const Community = () => import('@/views/community/index.vue');
const Equipment = () => import('@/views/equipment/index.vue');


const Developer = () => import('@/views/developer/index.vue');
const addInfo = () => import('@/views/developer/notify/add-info');
const sysNotify = () => import('@/views/developer/notify/index');
const apiIndex = () => import('@/views/developer/api/index.vue');
const Data = () => import('@/views/data/index.vue');

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
    path: "/community",
    component: Layout,
    redirect: '/community/mine',
    meta: {
      auth: true,
      title:'社群管理',
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
      }
    ]
  },
  {
    path: "/equipment",
    component: Layout,
    redirect: '/equipment/index',
    meta: {
      auth: true,
      title: "设备管理",
      roles: ['admin']
    },
    children: [
      {
        path: 'index',
        name: 'equipment',
        meta: {
          title: "我的社群-设备管理-线下浏览器服务平台"
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
        component: Data
      }
    ]
  },
  {
    path: "/developer",
    component: Layout,
    redirect: '/developer/notify',
    meta: {
      auth: true,
      title:'开发者中心',
      roles:['admin']
    },
    children: [
      {
        path: 'index',
        name: 'developer',
        meta: {
          auth:true,
          title: "个人信息-开发者中心-线下浏览器服务平台"
        },
        component: Developer
      },
      {
        path: 'notify/add-info',
        name: 'addInfo',
        meta: {
          auth:true,
          title: "创建回调信息-开发者中心-线下浏览器服务平台"
        },
        component: addInfo
      },
      {
        path: 'notify',
        name: 'sysNotify',
        meta: {
          auth:true,
          title: "消息通知-开发者中心-线下浏览器服务平台"
        },
        component: sysNotify
      },
      {
        path:'info',
        redirect:'info/center'
      },
      {
        path: 'info/center',
        name: 'infoCenter',
        meta: {
          auth:true,
          title: "个人信息-开发者中心-线下浏览器服务平台"
        },
        component: Developer
      },
      {
        path: 'info/edit',
        name: 'infoEdit',
        meta: {
          auth:true,
          title: "编辑信息-开发者中心-线下浏览器服务平台"
        },
        component: Developer
      },
      {
        path:'api',
        redirect:'api/index'
      },
      {
        path: 'api/index',
        name: 'apiToken',
        meta: {
          auth:true,
          title: "开放API-开发者中心-线下浏览器服务平台"
        },
        component: apiIndex
      },
      {
        path: 'api/faceimg',
        name: 'apiFaceImg',
        meta: {
          auth:true,
          title: "开放API-开发者中心-线下浏览器服务平台"
        },
        component: apiIndex
      },
    ]
  }
];

const router = new Router({
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
});

router.beforeEach((to, from, next) => {
  if(getToken()){
    if(store.getters.roles.length===0){
      let roles = ['admin'];
      store.commit('SET_ROLES', roles);
      store.dispatch('GenerateRoutes', {roles}).then(() => { // 根据roles权限生成可访问的路由表
        router.addRoutes(store.getters.addRouters); // 动态添加可访问路由表
        next({...to})
      })
    }else {
      next()
    }
  }else {
    if(to.name==='login'){
      next()
    }else {
      next({path:'/'})
    }
  }
});
export default router
