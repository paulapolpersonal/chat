import RoomsRepository from "./RoomsRepository";
import MessagesRepository from "./MessagesRepository";

export default ($axios) => ({
  rooms: RoomsRepository($axios),
  messages: MessagesRepository($axios),
});
