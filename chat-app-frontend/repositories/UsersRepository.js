export default ($axios) => ({
  post(payload) {
    return $axios.$post("/users", payload);
  },

  show(payload) {
    return $axios.$get(`/user/${payload}`);
  },

  update(payload) {
    return $axios.$patch(`/users/${payload.id}`, { name: payload.name });
  },
});
