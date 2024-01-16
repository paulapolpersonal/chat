import Api from "./Api";

class RoomsRepository {
  post(location) {
    return Api.post("/rooms", { location: location });
  }

  get() {
    return Api.get("/rooms");
  }

  show(payload) {
    return Api.get(`/rooms/${payload}`);
  }
}

export default new RoomsRepository();
