export default (options) => ({
  namespaced: true,
  state: () => ({
    options,
    sidebar: {
      icon: null,
      title: null,
      action: null,
      actionIcon: null,
      active: null,
    },
    lock: false,
  }),
  mutations: {
    setSidebar(state, data) {
      state.sidebar = data;
    },
    setLock(state, data) {
      state.lock = data;
    },
  },
  getters: {
    getSidebar: (state) => {
      return state.sidebar;
    },
    getLock(state) {
      return state.lock;
    },
  },
});
