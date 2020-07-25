<template>
  <div>
    <app-info-message v-if="!videos || videos.length === 0">There is no video in the playlist</app-info-message>
    <div v-else class="app-list-container">
      <h2 class="ui header">Play list videos</h2>
      <app-video-list-item v-for="(video, index) in videos" :key="index" :video="video"></app-video-list-item>
    </div>
  </div>
</template>

<script>
import InfoMessage from "../common/InfoMessage";
import VideoListItem from "./VideoListItem";

export default {
  components: {
    appInfoMessage: InfoMessage,
    appVideoListItem: VideoListItem,
  },
  props: ["videos"],
};
</script>

<style scoped>
.app-list-container {
  max-width: 990px;
  margin: 0 auto;
}
</style>