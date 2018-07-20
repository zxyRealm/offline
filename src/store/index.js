import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import getters from './getters'
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
  loading:true,
  showBar:true   //是否显示侧边栏
};

const actions = {
  GET_USER_INFO:({commit})=>{
    return fetch('/merchant/usercenter').then(res=>{
     commit("SET_USER_INFO",res.data)
    }).catch(error=>{
      console.log(error)
    })
  }
};

const mutations = {
  SET_USER_INFO:(state,data)=>{
    for(let item in data){
      if(data[item]!==null){
        Vue.set(state.userInfo,item,data[item])
      }
    }
    console.log(state.userInfo)
  },
  SET_FILTER_PARAMS: (state,data) => {
    state.filterParams = data || {};
  },
  SET_GROUP_CONSOLE_ID: (state,data) => {
    state.groupConsoleId = data || '';
  },
  SET_GROUP_SELECT_ID: (state,data) => {
    state.groupSelectId = data || '';
  }
};

const store =  new Vuex.Store({
  modules:{
    app
  },
  state,
  mutations,
  actions,
  getters
});
export default store
