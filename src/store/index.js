import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import getters from './getters'
import permission from './modules/permission'
import { fetch } from '@/utils/request'
import { parseTime } from  '@/utils/index'
Vue.use(Vuex);
const state = {
  userInfo:{},
  filterParams: {       //可视化社群条件
    groupGuid: '',     //选择社群
    type: 1,           //类型
    dimension: 1,      //维度
    startTime: parseTime(new Date(),'{y}-{m}-{d}'),     //开始时间
    endTime: parseTime(new Date(),'{y}-{m}-{d}'),       //结束时间
    timeArray: [],
    groupGuidName: '请选择对象'
  },
  groupConsoleId:  '',  //控制台社群设备id
  groupSelectId: '',    //選擇群id
  loading:true
};

const actions = {
  GET_USER_INFO:({commit})=>{
    return fetch('/merchant/usercenter').then(res=>{
     commit("SET_USER_INFO",res.data)
    }).catch(error=>{
      console.log(error)
    })
  },
  SET_FILTER_PARAMS:({commit})=>{
    let filterParams = {
      groupGuid: '',     //选择社群
      type: 1,           //类型
      dimension: 1,      //维度
      startTime: parseTime(new Date(),'{y}-{m}-{d}'),     //开始时间
      endTime: parseTime(new Date(),'{y}-{m}-{d}')        //结束时间
    }
    commit("SET_FILTER_PARAMS",filterParams);
    return  true;
  },
  SET_GROUP_CONSOLEID:({commit})=>{
    let groupConsoleId = "";
    commit("SET_GROUP_CONSOLEID",groupConsoleId);
    return  true;
  },
  SET_GROUP_SELECT_ID: ({commit})=>{
    let groupSelectId = "";
    commit("SET_GROUP_SELECT_ID",groupSelectId);
    return  true;
  }
};

const mutations = {
  SET_USER_INFO:(state,data)=>{
    for(let item in data){
      Vue.set(state.userInfo,item,data[item])
    }
  },
  SET_FILTER_PARAMS: (state,data) => {
    state.filterParams = data || {};
  },
  SET_GROUP_CONSOLEID: (state,data) => {
    state.groupConsoleId = data || '';
  },
  SET_GROUP_SELECT_ID: (state,data) => {
    state.groupSelectId = data || '';
  }
};

const store =  new Vuex.Store({
  modules:{
    app,
    permission,
    user
  },
  state,
  mutations,
  actions,
  getters
});
export default store
