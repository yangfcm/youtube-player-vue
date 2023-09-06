<script setup lang="ts">
const props = defineProps<{
  imageUrl?: string
}>()

</script>

<template>
  <template v-if="imageUrl">
    <div class="app-channel-banner" :style="`background-image: url(${props.imageUrl})`">
    </div>
  </template>
</template>

<style>
  .app-channel-banner {
    /* background-image: "url(v-bind('bannerImageUrl'))"; */
    width: 100%;
    height: 16vw;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 0 50%;
  }
</style>