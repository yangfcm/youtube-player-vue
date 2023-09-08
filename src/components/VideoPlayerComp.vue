<script setup lang="ts">
defineProps<{
  videoId: string
}>()
</script>

<template>
  <div class="app-player-container mb-2">
    <iframe
      :src="`https://www.youtube.com/embed/${videoId}`"
      alt="video"
      title="video player"
      class="app-player"
    >
    </iframe>
  </div>
</template>

<style scoped>
.app-player-container {
  position: relative;
  max-width: 100%;
  height: 0;
  overflow: hidden;
  background: #dcddde;
  padding-bottom: 75%;
  background: black;
}
@media screen and (min-width: 500px) {
  .app-player-container {
    padding-bottom: 55%;
  }
}
@media screen and (min-width: 1500px) {
  .app-player-container {
    padding-bottom: 45%;
  }
}
.app-player {
  width: 100%;
  height: 100%;
  position: absolute;
  border: none;
}
</style>
