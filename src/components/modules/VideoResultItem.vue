<template>
  <div class="ui items">
    <div class="item">
      <router-link class="ui small image" :to="`/video/${video.id.videoId}`">
        <img :src="video.snippet.thumbnails.medium.url" />
      </router-link>
      <div class="content">
        <router-link class="header" :to="`/video/${video.id.videoId}`">
          {{
          video.snippet.title
          }}
        </router-link>
        <div class="meta">
          <router-link :to="`/channel/${video.snippet.channelId}`">{{ video.snippet.channelTitle }}</router-link>
          <div class="ui right floated">
            <i class="calendar plus icon"></i>
            {{ video.snippet.publishedAt | date }}
          </div>
        </div>
        <div class="description" style="overflow: auto;">{{ video.snippet.description }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["video"],
};
</script>
<style scoped>
</style>