<template>
  <div class="container">
    <div class="d-flex flex-column align-items-stretch flex-shrink-0 bg-white">
      <div class="d-flex justify-content-between header">
        <div>{{ room.name }}</div>
        <div @click="closeChatBox()">cancel</div>
      </div>
      <div class="list-group list-group-flush border-bottom scrollarea">
        <div
          class="list-group-item list-group-item-action py-3 lh-tight"
          v-for="(message, index) in messages"
          :key="index"
        >
          <div class="d-flex w-100 align-items-center justify-content-between">
            <strong class="mb-1">{{ message?.username }}</strong>
          </div>
          <div class="col-10 mb-1 small">{{ message?.message }}</div>
        </div>
      </div>
    </div>
    <div>
      <div
        class="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom"
      >
        <form class="d-flex" @submit.prevent="addUsername(username)">
          <input class="fs-5 fw-semibold" v-model="username" />
          <input type="submit" value="Submit" />
        </form>
      </div>
      <form @submit.prevent="sendMessage()" class="d-flex mb-1">
        <input
          class="form-control"
          placeholder="Write a message"
          v-model="message"
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  </div>
</template>

<script>
import { createConsumer } from "@rails/actioncable";

export default {
  data() {
    return {
      username: "",
      message: "",
      messages: [],
      consumer: null,
      chatChannel: null,
    };
  },

  props: {
    room: {
      type: Object,
      default: () => {},
    },
  },

  mounted() {
    this.getMessages();
    this.consumer = createConsumer("ws://localhost:5000/cable");
    this.handleChatCable();
    if (sessionStorage.getItem("username") !== undefined)
      this.username = sessionStorage.getItem("username");
  },

  methods: {
    getMessages() {
      this.$axios
        .$get("/messages", { params: { room_id: this.room.id } })
        .then((response) => {
          this.messages = response;
        });
    },

    handleChatCable() {
      let that = this;
      this.chatChannel = this.consumer.subscriptions.create(
        {
          channel: "ChatChannel",
          room_id: this.room.id,
        },
        {
          received(data) {
            that.messages.push({ username: that.username, message: data });
            console.log(data);
          },
        }
      );
    },

    sendMessage() {
      this.chatChannel.send({
        username: this.username,
        message: this.message,
      });
      this.message = "";
    },

    addUsername(username) {
      sessionStorage.setItem("username", username);
    },

    closeChatBox() {
      this.$emit("closeChatBox");
    },
  },
};
</script>

<style>
.container {
  height: 400px;
  max-width: 500px;
  overflow: scroll;
  position: absolute;
  z-index: 400;
  right: 0;
  margin-top: 10px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.header {
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: white;
}
</style>
