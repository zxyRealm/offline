import Cookies from 'js-cookie'

const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus'),
      withoutAnimation: false
    },
    device: 'desktop'
  },
  mutations: {
    SET_SIDEBAR:(state,data)=>{
      state.sidebar.opened = data||!state.sidebar.opened
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    }
  },
  actions: {
    DISPATCH_SIDEBAR({commit,state},data){
      data = data || !state.sidebar.opened;
      if(!data){
        Cookies.set("sidebarStatus",1);
      }else {
        Cookies.remove("sidebarStatus")
      }
      commit('SET_SIDEBAR',data)
    },
    toggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    }
  }
};

export default app
