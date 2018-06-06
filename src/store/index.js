import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import getters from './getters'
import permission from './modules/permission'
Vue.use(Vuex);

const state = {
  user:{}
};

const actions = {
  SET_USER_INFO:(state,data) => {
    state.user = data || {};
  }
};

const mutations = {

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
