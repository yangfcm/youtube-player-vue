<template>
  <div class="ui items">
    <div class="item">
      <router-link
        class="ui small image"
        style="position: relative"
        :to="`/plalist/${playlist.id.playlistId}`"
      >
        <img :src="playlist.snippet.thumbnails.medium.url" />
        <div class="app-image-cover">
          <p>
            <i class="list icon"></i>
            Play List
          </p>
        </div>
      </router-link>
      <div class="content">
        <router-link
          class="header"
          :to="`/playlist/${playlist.id.playlistId}`"
        >{{ playlist.snippet.title }}</router-link>
        <div class="meta">
          <router-link
            :to="`/channel/${playlist.snippet.channelId}`"
          >{{ playlist.snippet.channelTitle }}</router-link>
          <div class="ui right floated">
            <i class="calendar plus icon"></i>
            {{ playlist.snippet.publishedAt | date }}
          </div>
        </div>
        <div class="description" style="overflow: auto;">{{ playlist.snippet.description }}</div>
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
.app-image-cover {
  height: 100%;
  width: 100%;
  color: white;
  position: absolute;
  z-index: 10;
  background: rgba(0, 0, 0, 0.4);
  top: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>