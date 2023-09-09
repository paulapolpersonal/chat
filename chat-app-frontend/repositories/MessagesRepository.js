export default ($axios) => ({
  get(id) {
    return $axios.$get("/messages", { params: { room_id: id } });
  },
});
