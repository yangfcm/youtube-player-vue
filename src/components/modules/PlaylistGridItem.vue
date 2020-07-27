<template>
  <div class="ui card centered" style="width: 100%; height: 100%; margin: 0;">
    <router-link :to="`/playlist/${playlist.id}`" class="image">
      <img :src="playlist.snippet.thumbnails.medium.url" :alt="playlist.snippet.title" />
    </router-link>
    <div class="content">
      <router-link :to="`/playlist/${playlist.id}`" class="header">{{ playlist.snippet.title}}</router-link>
      <div class="ui blue label tiny" style="margin-left: 0; margin-top: 3px;">
        {{ playlist.contentDetails.itemCount }}
        <span v-if="playlist.contentDetails.itemCount">videos</span>
        <span v-else>video</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["playlist"],
};
</script>

<style scoped>
</style>