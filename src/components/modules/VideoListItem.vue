<template>
  <div class="ui card app-list-card">
    <router-link
      class="app-card-image-container"
      :to="
        video.snippet.playlistId
          ? `/video/${videoId}?playlistId=${video.snippet.playlistId}`
          : `/video/${videoId}`
      "
    >
      <img
        :src="video.snippet.thumbnails.medium.url"
        :alt="video.snippet.title"
        class="app-list-card-image"
      />
    </router-link>
    <div class="content app-list-card-content">
      <router-link
        :to="
          video.snippet.playlistId
            ? `/video/${videoId}?playlistId=${video.snippet.playlistId}`
            : `/video/${videoId}`
        "
        class="header app-list-card-title"
      >{{ video.snippet.title }}</router-link>
      <router-link :to="`/channel/${video.snippet.channelId}`">
        {{
        video.snippet.channelTitle
        }}
      </router-link>
      <div class="meta">
        <i class="calendar icon"></i>
        {{ video.snippet.publishedAt | date }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["video"],
  computed: {
    videoId() {
      let videoId = "";
      if (this.video && this.video.snippet.resourceId) {
        videoId = this.video.snippet.resourceId.videoId;
      } else if (this.video && this.video.id) {
        videoId = this.video.id.videoId;
      }
      return videoId;
    },
  },
};
</script>

<style scoped>
.app-list-card {
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-bottom: 10px !important;
  border: none;
  box-shadow: none;
}
.app-card-image-container {
  display: flex;
  align-items: center;
}
.app-list-card-image {
  max-width: 140px;
  height: auto;
}
.app-list-card-title {
  line-height: 23px;
  max-height: 46px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.app-list-card-content {
  flex-grow: 1;
  border: none !important;
}
</style>
