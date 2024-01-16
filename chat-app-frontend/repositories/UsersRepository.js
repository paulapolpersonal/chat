import Api from "./Api";

class UsersRepository {
  post(payload) {
    return Api.post("/users", payload);
  }

  show(payload) {
    return Api.get(`/user/${payload}`);
  }

  update(payload) {
    return Api.patch(`/users/${payload.id}`, { name: payload.name });
  }
}

export default new UsersRepository();
