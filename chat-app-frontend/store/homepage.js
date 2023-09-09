export const state = {
  rooms: [],
};

export const getters = {
  rooms(state) {
    return state.rooms;
  },
};

export const actions = {
  async fetchRooms({ commit }) {
    const response = await this.$api.rooms.get();
    commit("GET_ROOMS", response);
  },

  async createRoom({ commit }, payload) {
    const response = await this.$api.rooms.post(payload);
    commit("CREATE_ROOM", response);
  },
};

export const mutations = {
  GET_ROOMS(state, rooms) {
    state.rooms = rooms;
  },

  CREATE_ROOM(state, room) {
    state.rooms = state.rooms.concat(room);
  },
};
