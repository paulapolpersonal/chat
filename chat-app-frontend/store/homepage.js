import roomsApi from "../repositories/RoomsRepository.js";

export const state = {
  rooms: [],
  error: null,
  newRoom: {},
};

export const getters = {
  rooms(state) {
    return state.rooms;
  },
  newRoom(state) {
    return state.newRoom;
  },
  error(state) {
    return state.error;
  },
};

export const actions = {
  async fetchRooms({ commit }) {
    try {
      const response = await roomsApi.get();
      commit("GET_ROOMS", response.data);
    } catch (e) {
      commit("ROOMS_ERROR", e);
    }
  },

  async createRoom({}, payload) {
    try {
      await roomsApi.post(payload);
    } catch (e) {
      commit("ROOMS_ERROR", e);
    }
  },

  async addRoom({ commit }, payload) {
    try {
      const response = await roomsApi.show(payload);
      commit("CREATE_ROOM", response.data);
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
    state.newRoom = room;
  },

  ROOMS_ERROR(state, error) {
    state.error = error;
  },
};
