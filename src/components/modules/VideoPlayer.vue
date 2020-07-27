<template>
  <div class="app-player-container">
    <iframe
      :src="videoSrc"
      alt="video"
      title="video player"
      class="app-player"
    ></iframe>
  </div>
</template>

<script>
export default {
  props: ["videoId"],
  computed: {
    videoSrc() {
      return `https://www.youtube.com/embed/${this.videoId}`;
    },
  },
};
</script>

<style scoped>
.app-player-container {
  position: relative;
  max-width: 100%;
  height: 0;
  overflow: hidden;
  background: #dcddde;
  padding-bottom: 62%;
}
.app-player {
  width: 100%;
  height: 100%;
  position: absolute;
}
</style>
