import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import getters from './getters'
import permission from './modules/permission'
import { fetch } from '@/utils/request'

Vue.use(Vuex);

const state = {
  userInfo:{},
  filterParams: {}
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
      groupGuid: '',
      type: 1,         //类型
      selectObj: '',    //选择对象
      dimension: 1,    //维度
      startTime: '',    //开始时间
      endTime:''        //结束时间
    }
    commit("SET_FILTER_PARAMS",filterParams);
    return  true;
  }
};

const mutations = {
  SET_USER_INFO:(state,data)=>{
    state.userInfo = data || {};
  },
  SET_FILTER_PARAMS: (state,data) => {
    state.filterParams = data || {};
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
