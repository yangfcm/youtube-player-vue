<template>
  <div class="ui card app-video-card">
    <router-link :to="`/video/${videoId}`" class="image">
      <img
        :src="video.snippet.thumbnails.medium.url"
        :alt="video.snippet.title"
        :title="video.snippet.title"
      />
    </router-link>
    <div class="content">
      <div class="header app-video-title">
        <router-link
          :to="`/video/${videoId}`"
          :title="video.snippet.title"
          v-html="video.snippet.title"
        ></router-link>
      </div>
      <div class="meta">
        <router-link :to="`/channel/${video.snippet.channelId}`">{{ video.snippet.channelTitle }}</router-link>
      </div>
    </div>
    <div class="extra content">
      <span>
        <i class="calendar icon"></i>
        {{ video.snippet.publishedAt | date }}
      </span>
      <span v-if="video.statistics" class="right floated">
        <i class="eye icon"></i>
        {{ video.statistics.viewCount | decimal }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["video"],
  computed: {
    videoId() {
      return typeof this.video.id === "string"
        ? this.video.id
        : this.video.id.videoId;
    },
  },
};
</script>

<style scoped>
.app-video-card {
  width: 100%;
  height: 100%;
  margin: 0 !important;
}
.app-video-title {
  line-height: 23px;
  max-height: 46px;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>