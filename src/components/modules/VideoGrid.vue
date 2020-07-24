<template>
  <div v-if="!videos || videos.length === 0">
    <app-info-message>No videos found</app-info-message>
  </div>
  <div v-else class="app-video-grid">
    <app-video-grid-item v-for="(video, index) in videos" :key="index" :video="video"></app-video-grid-item>
  </div>
</template>

<script>
import InfoMessage from "../common/InfoMessage";
import VideoGridItem from "./VideoGridItem";
export default {
  components: {
    appInfoMessage: InfoMessage,
    appVideoGridItem: VideoGridItem,
  },
  props: ["videos"],
};
</script>

<style scoped>
.app-video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  gap: 1.8rem;
}
</style>