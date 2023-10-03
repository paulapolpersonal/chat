import RoomsRepository from "./RoomsRepository";
import MessagesRepository from "./MessagesRepository";
import UsersRepository from "./UsersRepository";

export default ($axios) => ({
  rooms: RoomsRepository($axios),
  messages: MessagesRepository($axios),
  users: UsersRepository($axios),
});
