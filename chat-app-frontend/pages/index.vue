<template>
  <div>
    <div id="map">
      <l-map :zoom="5" :center="[46.7712, 23.6236]" @click="addMarker">
        <l-tile-layer
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        ></l-tile-layer>
        <l-marker
          v-for="(room, index) in rooms"
          v-bind:key="index"
          :lat-lng="getLatLng(room)"
          @click="openChatBox(room)"
        >
        </l-marker>
      </l-map>
    </div>
    <ChatBox
      v-if="chatBoxOpen"
      :room="room"
      :key="room.id"
      @closeChatBox="closeChatBox"
    />
  </div>
</template>

<script>
import ChatBox from "~/components/ChatBox.vue";
import { createConsumer } from "@rails/actioncable";
import { mapGetters, mapActions } from "vuex";

export default {
  components: { ChatBox },

  data() {
    return {
      chatBoxOpen: false,
      room: {},
    };
  },

  mounted() {
    this.fetchRooms();
    this.handleRoomsCable();
  },

  computed: {
    ...mapGetters({
      rooms: "homepage/rooms",
    }),
  },

  methods: {
    ...mapActions({
      fetchRooms: "homepage/fetchRooms",
      createRoom: "homepage/createRoom",
    }),

    addMarker(event) {
      const location = `${JSON.stringify(event.latlng.lat)}, ${JSON.stringify(
        event.latlng.lng
      )}`;
      this.createRoom(location);
    },

    openChatBox(room) {
      if (this.chatBoxOpen) this.closeChatBox();
      this.room = room;
      this.chatBoxOpen = true;
    },

    closeChatBox() {
      this.room = null;
      this.chatBoxOpen = false;
    },

    getLatLng(room) {
      return room.location.split(",").map(parseFloat);
    },

    handleRoomsCable() {
      const consumer = createConsumer("ws://localhost:5000/cable");

      consumer.subscriptions.create(
        {
          channel: "RoomsChannel",
        },
        {
          received: (data) => {
            if (data === "success") this.fetchRooms();
          },
        }
      );
    },
  },
};
</script>

<style>
body,
html {
  height: 100%;
}

#map {
  width: 100%;
  height: 100%;
  position: absolute !important;
}
</style>
