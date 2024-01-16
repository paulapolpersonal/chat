import usersApi from "../repositories/UsersRepository.js";

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
      const response = await usersApi.show(payload);
      commit("GET_USER", response.data);
    } catch (e) {
      commit("USERS_ERROR", e);
    }
  },

  async createUser({ commit }, payload) {
    try {
      const response = await usersApi.post(payload);
      commit("GET_USER", response.data);
    } catch (e) {
      commit("USERS_ERROR", e);
    }
  },

  async updateUser({ commit }, payload) {
    try {
      const response = await usersApi.update(payload);
      commit("GET_USER", response.data);
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
