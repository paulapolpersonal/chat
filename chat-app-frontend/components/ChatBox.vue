<template>
  <div class="chat-box mt-2 mr-2">
    <div class="d-flex justify-content-between align-items-center p-2 header">
      <div>{{ room.name }}</div>
      <strong role="button" @click="closeChatBox()">X</strong>
    </div>
    <div id="messages-container" class="messages-container pb-2 px-2">
      <div
        v-for="(message, index) in messages"
        :key="index"
        :class="messageDirection(message)"
        class="chat-bubble my-1"
      >
        <strong class="username">{{ message.username }}</strong>
        <div>{{ message.message }}</div>
      </div>
    </div>
    <div class="mx-2 py-1">
      <form class="d-flex mb-2" @submit.prevent="addUsername(username)">
        <input
          class="form-control mr-2"
          placeholder="Username"
          v-model="username"
        />
        <input type="submit" value="Submit" />
      </form>
      <form @submit.prevent="sendMessage()" class="d-flex">
        <input
          class="form-control mr-2"
          placeholder="Write a message"
          v-model="message"
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      username: "",
      message: "",
      chatChannel: null,
    };
  },

  props: {
    room: {
      type: Object,
      default: () => {},
    },
  },

  watch: {
    room(value) {
      this.fetchMessages(value.id).then(() => {
        this.scrollDown();
      });
    },
  },

  mounted() {
    this.fetchMessages(this.room.id).then(() => {
      this.scrollDown();
    });
    this.handleChatCable();
    if (sessionStorage.getItem("username") !== undefined)
      this.username = sessionStorage.getItem("username");
  },

  computed: {
    ...mapGetters({
      messages: "chat/messages",
    }),
  },

  methods: {
    ...mapActions({
      fetchMessages: "chat/fetchMessages",
      addMessage: "chat/addMessage",
    }),

    messageDirection(message) {
      return message.username === this.username ? "outgoing" : "incoming";
    },

    handleChatCable() {
      this.chatChannel = this.$consumer.subscriptions.create(
        {
          channel: "ChatChannel",
          room_id: this.room.id,
        },
        {
          received: (data) => {
            this.addMessage(data);
            this.scrollDown();
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

    scrollDown() {
      const chatContainer = document.getElementById("messages-container");
      setTimeout(function () {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }, 0);
    },
  },
};
</script>

<style lang="scss">
@import "~/assets/css/chatbox.scss";
</style>
