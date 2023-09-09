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
        :class="message.username === username ? 'outgoing' : 'incoming'"
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
import { createConsumer } from "@rails/actioncable";
import { mapGetters, mapActions } from "vuex";

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
    this.fetchMessages(this.room.id).then(() => {
      this.messages = [...this.storedMessages];
      this.scrollDown();
    });
    this.handleChatCable();
    if (sessionStorage.getItem("username") !== undefined)
      this.username = sessionStorage.getItem("username");
  },

  computed: {
    ...mapGetters({
      storedMessages: "chat/messages",
    }),
  },

  methods: {
    ...mapActions({
      fetchMessages: "chat/fetchMessages",
    }),

    handleChatCable() {
      this.consumer = createConsumer("ws://localhost:5000/cable");

      this.chatChannel = this.consumer.subscriptions.create(
        {
          channel: "ChatChannel",
          room_id: this.room.id,
        },
        {
          received: (data) => {
            this.messages.push(data);
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
.chat-box {
  position: absolute;
  z-index: 400;
  right: 0;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  font-family: Arial, sans-serif;
  width: 500px;
}

.messages-container {
  height: 400px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.header {
  border-radius: 10px 10px 0 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.chat-bubble {
  color: #fff;
  border-radius: 5px;
  padding: 10px;
  word-break: break-word;
  width: 50%;
}

.incoming {
  align-self: flex-start;
  background-color: #007bff;
}

.outgoing {
  align-self: flex-end;
  background-color: #4caf50;
}

.username {
  font-size: 1rem;
}
</style>
