export const state = () => ({
  messages: [],
});

export const getters = {
  messages: (state) => {
    return state.messages;
  },
};

export const actions = {
  async fetchMessages({ commit }, payload) {
    const response = await this.$api.messages.get(payload);
    commit("GET_MESSAGES", response);
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
};
