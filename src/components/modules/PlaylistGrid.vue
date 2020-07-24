<template>
  <div>
    <div v-if="!playlists || playlists.length === 0">
      <app-info-message>There is no playlist created.</app-info-message>
    </div>
    <div v-else class="app-playlist-grid">
      <app-playlist-grid-item
        v-for="(playlist,index) in playlists"
        :key="index"
        :playlist="playlist"
      ></app-playlist-grid-item>
    </div>
  </div>
</template>

<script>
import InfoMessage from "../common/InfoMessage";
import PlaylistGridItem from "./PlaylistGridItem";
export default {
  components: {
    appPlaylistGridItem: PlaylistGridItem,
    appInfoMessage: InfoMessage,
  },
  props: ["playlists"],
};
</script>

<style scoped>
.app-playlist-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(17rem, 1fr));
  gap: 0.5rem;
}
</style>