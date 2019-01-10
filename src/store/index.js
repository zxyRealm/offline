import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import getters from './getters'
import {fetch} from '@/utils/request'
import {parseTime} from '@/utils/index'

Vue.use(Vuex)
const state = {
  userInfo: {},
  filterParams: { // 可视化社群条件
    group: '',
    type: 'flow', // 类型
    timeIntervalUnit: 'hour', // 维度
    startTime: parseTime(new Date(), '{y}-{m}-{d}'), // 开始时间
    endTime: parseTime(new Date(), '{y}-{m}-{d}'), // 结束时间
    timeArray: []
  },
  groupConsoleId: '', // 控制台社群设备id
  groupSelectId: '', // 選擇群id
  loading: true,
  serverIp: '', // 服务websocket ip 地址(包括端口信息）
  showBar: true, // 是否显示侧边栏
  aliveState: {}, // 保存上一页状态值
  expired: false, // 登录是否过期
  currentManage: {} // 当前管理社群信息
}

const actions = {
  GET_USER_INFO: ({commit}) => {
    return fetch('/merchant/usercenter').then(res => {
      commit('SET_USER_INFO', res.data)
    }).catch(error => {
      console.log(error)
    })
  },
  GET_GROUPS_LIST: ({commit}) => {

  }
}

const mutations = {
  SET_USER_INFO: (state, data) => {
    for (let item in data) {
      if (data[item] !== null) {
        Vue.set(state.userInfo, item, data[item])
      }
    }
  },
  SET_FILTER_PARAMS: (state, data) => {
    state.filterParams = data || {}
  },
  SET_GROUP_CONSOLE_ID: (state, data) => {
    state.groupConsoleId = data || ''
  },
  SET_GROUP_SELECT_ID: (state, data) => {
    state.groupSelectId = data || ''
  },
  SET_ALIVE_STATE: (state, data) => {
    state.aliveState = data || {}
  },
  SET_CURRENT_MANAGE: (state, data) => {
    state.currentManage = data || {}
  }
}

const store = new Vuex.Store({
  modules: {
    app
  },
  state,
  mutations,
  actions,
  getters
})
export default store
