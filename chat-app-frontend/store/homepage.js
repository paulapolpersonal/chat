export const state = {
  rooms: [],
  error: null,
};

export const getters = {
  rooms(state) {
    return state.rooms;
  },
  error(state) {
    return state.error;
  },
};

export const actions = {
  async fetchRooms({ commit }) {
    try {
      const response = await this.$api.rooms.get();
      commit("GET_ROOMS", response);
    } catch (e) {
      commit("ROOMS_ERROR", e);
    }
  },

  async createRoom({}, payload) {
    try {
      await this.$api.rooms.post(payload);
    } catch (e) {
      commit("ROOMS_ERROR", e);
    }
  },

  async addRoom({ commit }, payload) {
    try {
      const response = await this.$api.rooms.show(payload);
      commit("CREATE_ROOM", response);
    } catch (e) {
      commit("ROOMS_ERROR", e);
    }
  },
};

export const mutations = {
  GET_ROOMS(state, rooms) {
    state.rooms = rooms;
  },

  CREATE_ROOM(state, room) {
    state.rooms = state.rooms.concat(room);
  },

  ROOMS_ERROR(state, error) {
    state.error = error;
  },
};
