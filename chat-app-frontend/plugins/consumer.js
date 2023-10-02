import { createConsumer } from "@rails/actioncable";

export default ({ $axios }, inject) => {
  const consumer = createConsumer("ws://localhost:5000/cable");

  inject("consumer", consumer);
};
