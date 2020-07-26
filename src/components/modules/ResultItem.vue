<template>
  <div>
    <app-channel-result-item :channel="item" v-if="kind==='channel'"></app-channel-result-item>
    <app-playlist-result-item :playlist="item" v-if="kind==='playlist'"></app-playlist-result-item>
    <app-video-result-item :video="item" v-if="kind==='video'"></app-video-result-item>
    <app-breakline></app-breakline>
  </div>
</template>

<script>
import ChannelResultItem from "./ChannelResultItem";
import PlaylistResultItem from "./PlaylistResultItem";
import VideoResultItem from "./VideoResultItem";
import Breakline from "../common/Breakline";

export default {
  components: {
    appChannelResultItem: ChannelResultItem,
    appPlaylistResultItem: PlaylistResultItem,
    appVideoResultItem: VideoResultItem,
    appBreakline: Breakline,
  },
  props: ["item"],
  computed: {
    kind() {
      return this.item.id.kind.split("#")[1];
    },
  },
};
</script>
<style scoped>
</style>