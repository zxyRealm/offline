import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import getters from './getters'
import permission from './modules/permission'
import { fetch } from '@/utils/request'

Vue.use(Vuex);

const state = {
  userInfo:{}
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
    state.userInfo = data || {};
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
