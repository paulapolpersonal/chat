<template>
  <div>
    <div id="map">
      <l-map :zoom="5" :center="mapCenter" @click="addMarker" ref="worldMap">
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
    <b-alert
      :show="showBanner"
      class="banner"
      variant="success"
      dismissible
      @dismissed="closeBanner"
      >{{ bannerText }}</b-alert
    >
    <b-alert :show="error" class="banner" variant="danger" dismissible>{{
      error
    }}</b-alert>
    <ChatBox
      v-if="chatBoxOpen"
      :room="room"
      @closeChatBox="closeChatBox"
      @showSuccessBanner="showSuccessBanner"
    />
  </div>
</template>

<script>
import ChatBox from "~/components/ChatBox.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  components: { ChatBox },

  data() {
    return {
      chatBoxOpen: false,
      room: {},
      mapCenter: [46.7712, 23.6236],
      bannerText: "",
      showBanner: false,
    };
  },

  mounted() {
    this.fetchRooms();
    this.handleRoomsCable();
  },

  computed: {
    ...mapGetters({
      rooms: "homepage/rooms",
      error: "user/error",
    }),
  },

  methods: {
    ...mapActions({
      fetchRooms: "homepage/fetchRooms",
      createRoom: "homepage/createRoom",
      fetchNewRoom: "homepage/addRoom",
    }),

    showSuccessBanner(text) {
      this.showBanner = true;
      this.bannerText = text;
    },

    closeBanner(text) {
      this.showBanner = false;
    },

    addMarker(event) {
      const location = `${event.latlng.lat}, ${event.latlng.lng}`;

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
      this.$consumer.subscriptions.create(
        {
          channel: "RoomsChannel",
        },
        {
          received: (data) => {
            if (data) this.fetchNewRoom(data);
          },
        }
      );
    },
  },
};
</script>
