import Api from "./Api";

class MessagesRepository {
  get(id) {
    return Api.get("/messages", { params: { room_id: id } });
  }
}

export default new MessagesRepository();
