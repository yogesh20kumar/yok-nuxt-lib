export const state = () => ({
  yokLeftSidebarObj: {
    icon: null,
    title: null,
    action: null,
    actionIcon: null,
    active: null,
  },
  yokSidebarLock: false,
});

export const mutations = {
  setYokLeftSidebarObj(state, data) {
    state.yokLeftSidebarObj = data;
  },
  setYokSidebarLock(state, data) {
    state.yokSidebarLock = data;
  },
};

export const getters = {
  getYokLeftSidebarObj: (state) => {
    return state.yokLeftSidebarObj;
  },
  getYokSidebarLock(state) {
    return state.yokSidebarLock;
  },
};
