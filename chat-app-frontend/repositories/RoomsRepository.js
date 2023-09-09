export default ($axios) => ({
  post(location) {
    return $axios.$post("/rooms", { location: location });
  },

  get() {
    return $axios.$get("/rooms");
  },
});
