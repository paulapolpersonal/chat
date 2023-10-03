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
        <strong class="username">{{ message.user.name }}</strong>
        <div>{{ message.message }}</div>
      </div>
    </div>
    <div class="mx-2 py-1">
      <form class="d-flex mb-2" @submit.prevent="submitUser()">
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
    this.fetchUser(this.$browserDetect.meta.name).then(() => {
      if (this.user) this.username = this.user.name;
    });
  },

  computed: {
    ...mapGetters({
      messages: "chat/messages",
      user: "user/user",
    }),
  },

  methods: {
    ...mapActions({
      fetchMessages: "chat/fetchMessages",
      addMessage: "chat/addMessage",
      fetchUser: "user/fetchUser",
      createUser: "user/createUser",
      updateUser: "user/updateUser",
    }),

    messageDirection(message) {
      if (this.user) {
        return message.user.browser === this.user.browser
          ? "outgoing"
          : "incoming";
      }

      return "incoming";
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
        user_id: this.user.id,
        message: this.message,
        user: {
          name: this.user.name,
          browser: this.user.browser,
        },
      });
      this.message = "";
    },

    submitUser() {
      if (this.user) {
        this.updateUser({ id: this.user.id, name: this.username }).then(() => {
          this.$emit("showSuccessBanner");
          this.fetchMessages(this.room.id);
        });
      } else {
        this.createUser({
          browser: this.$browserDetect.meta.name,
          name: this.username,
        });
      }
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
