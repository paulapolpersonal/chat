import messagesApi from "../repositories/MessagesRepository.js";

export const state = () => ({
  messages: [],
  error: null,
});

export const getters = {
  messages: (state) => {
    return state.messages;
  },
  error(state) {
    return state.error;
  },
};

export const actions = {
  async fetchMessages({ commit }, payload) {
    try {
      const response = await messagesApi.get(payload);
      commit("GET_MESSAGES", response.data);
    } catch (e) {
      commit("MESSAGES_ERROR", e);
    }
  },

  addMessage({ commit }, payload) {
    commit("ADD_MESSAGE", payload);
  },
};

export const mutations = {
  GET_MESSAGES(state, messages) {
    state.messages = messages;
  },

  ADD_MESSAGE(state, message) {
    state.messages.push(message);
  },

  MESSAGES_ERROR(state, error) {
    state.error = error;
  },
};
