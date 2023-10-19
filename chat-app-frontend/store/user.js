export const state = {
  user: {},
  error: null,
};

export const getters = {
  user(state) {
    return state.user;
  },
  error(state) {
    return state.error;
  },
};

export const actions = {
  async fetchUser({ commit }, payload) {
    try {
      const response = await this.$api.users.show(payload);
      commit("GET_USER", response);
    } catch (e) {
      commit("USERS_ERROR", e);
    }
  },

  async createUser({ commit }, payload) {
    try {
      const response = await this.$api.users.post(payload);
      commit("GET_USER", response);
    } catch (e) {
      commit("USERS_ERROR", e);
    }
  },

  async updateUser({ commit }, payload) {
    try {
      const response = await this.$api.users.update(payload);
      commit("GET_USER", response);
    } catch (e) {
      commit("USERS_ERROR", e);
    }
  },
};

export const mutations = {
  GET_USER(state, user) {
    state.user = user;
  },

  USERS_ERROR(state, error) {
    state.error = error;
  },
};
