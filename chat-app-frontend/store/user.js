export const state = {
  user: {},
};

export const getters = {
  user(state) {
    return state.user;
  },
};

export const actions = {
  async fetchUser({ commit }, payload) {
    const response = await this.$api.users.show(payload);
    commit("GET_USER", response);
  },

  async createUser({ commit }, payload) {
    const response = await this.$api.users.post(payload);
    commit("GET_USER", response);
  },

  async updateUser({ commit }, payload) {
    const response = await this.$api.users.update(payload);
    commit("GET_USER", response);
  },
};

export const mutations = {
  GET_USER(state, user) {
    state.user = user;
  },
};
