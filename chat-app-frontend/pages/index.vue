<template>
  <div>
    <div id="map">
      <l-map :zoom="5" :center="[46.7712, 23.6236]">
        <l-tile-layer
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        ></l-tile-layer>
        <l-marker :lat-lng="[55.9464418, 8.1277591]"></l-marker>
      </l-map>
    </div>
    <ChatBox />
  </div>
</template>

<script>
import ChatBox from "~/components/ChatBox.vue";

export default {
  components: { ChatBox },
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
