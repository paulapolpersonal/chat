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
    <Banner
      :show="bannerText !== ''"
      variant="success"
      @dismissed="closeBanner"
      :text="bannerText"
    />
    <Banner :show="error !== null" variant="danger" :text="error" />
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
import Banner from "~/components/Banner.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  components: { ChatBox, Banner },

  data() {
    return {
      chatBoxOpen: false,
      room: {},
      mapCenter: [46.7712, 23.6236],
      bannerText: "",
      mapInstance: null,
      selectedMarkerId: null,
    };
  },

  mounted() {
    this.mapInstance = this.$refs.worldMap.mapObject;
    this.fetchRooms();
    this.handleRoomsCable();
  },

  computed: {
    ...mapGetters({
      rooms: "homepage/rooms",
      error: "user/error",
      newRoom: "homepage/newRoom",
    }),

    markerClass() {
      return this.selectedMarkerId === this.room.id ? "highlighted-marker" : "";
    },
  },

  methods: {
    ...mapActions({
      fetchRooms: "homepage/fetchRooms",
      createRoom: "homepage/createRoom",
      fetchNewRoom: "homepage/addRoom",
    }),

    showSuccessBanner(text) {
      this.bannerText = text;
    },

    closeBanner(text) {
      this.bannerText = "";
    },

    addMarker(event) {
      const location = `${event.latlng.lat}, ${event.latlng.lng}`;

      this.createRoom(location);
    },

    openChatBox(room, e) {
      this.room = room;
      this.chatBoxOpen = true;
      this.mapInstance.setView(this.getLatLng(room), 7);
      this.selectedMarkerId = room.id;
      var marker = L.marker(this.getLatLng(room));
      // debugger;
      // L.DomUtil.addClass(marker, "highlight-marker");
    },

    closeChatBox() {
      this.room = null;
      this.chatBoxOpen = false;
      this.mapInstance.setView(this.mapCenter, 5);
      this.selectedMarkerId = null;
    },

    getLatLng(room) {
      return room.location.split(",").map(parseFloat);
    },

    highlightedMarker(room) {
      return room.id === this.newRoom.id ? "highlight-marker" : "";
    },

    handleRoomsCable() {
      this.$consumer.subscriptions.create(
        {
          channel: "RoomsChannel",
        },
        {
          received: (data) => {
            if (data)
              this.fetchNewRoom(data).then(() => {
                this.openChatBox(this.newRoom);
                // this.mapInstance.setView(this.getLatLng(this.newRoom), 7);
                // var marker = L.marker(this.getLatLng(this.newRoom));
                // debugger;
                // L.DomUtil.addClass(marker._icon, "highlight-marker");
              });
          },
        }
      );
    },
  },
};
</script>

<style lang="scss">
.highlighted-marker {
  background-color: red !important;
}

// .leaflet-container .leaflet-marker-pane img,
// .leaflet-container .leaflet-shadow-pane img,
// .leaflet-container .leaflet-tile-pane img,
// .leaflet-container img.leaflet-image-layer,
// .leaflet-container .leaflet-tile {
//   background-color: red;
// }

.new-marker {
  content: "*";
}
</style>
