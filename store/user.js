export const state = () => ({
  user: {},
});

export const getters = {
  currentUser: (state) => state.user,
};

export const actions = {
  getCurrentUser({ commit }, user) {
    commit("setCurrentUser", user);
  },
};

export const mutations = {
  setCurrentUser: (state, user) => (state.user = user),
};
