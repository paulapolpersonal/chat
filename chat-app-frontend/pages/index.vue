<template>
  <div>
    <div id="map">
      <l-map :zoom="5" :center="[46.7712, 23.6236]" @click="addMarker">
        <l-tile-layer
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        ></l-tile-layer>
        <!-- <l-marker :lat-lng="[55.9464418, 8.1277591]"></l-marker> -->
        <l-marker
          v-for="(room, index) in rooms"
          v-bind:key="index"
          :lat-lng="getLatLng(room)"
          @click="openChatBox(room)"
        >
        </l-marker>
      </l-map>
    </div>
    <ChatBox v-if="chatBoxOpen" :room="room" @closeChatBox="closeChatBox" />
  </div>
</template>

<script>
import ChatBox from "~/components/ChatBox.vue";

export default {
  components: { ChatBox },

  data() {
    return {
      chatBoxOpen: false,
      rooms: [],
      room: {},
    };
  },

  mounted() {
    this.getRooms();
  },

  methods: {
    addMarker(event) {
      const location = `${JSON.stringify(event.latlng.lat)}, ${JSON.stringify(
        event.latlng.lng
      )}`;
      this.createRoom(location);
    },

    openChatBox(room) {
      this.chatBoxOpen = true;
      this.room = room;
    },

    closeChatBox() {
      this.chatBoxOpen = false;
    },

    getRooms() {
      this.$axios.$get("/rooms").then((response) => {
        this.rooms = response;
      });
    },

    getLatLng(room) {
      return room.location.split(",").map(parseFloat);
    },

    createRoom(location) {
      this.$axios.$post("/rooms", { location: location }).then((response) => {
        this.rooms = response;
      });
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
