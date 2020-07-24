<template>
  <div>
    <div v-if="!channels || channels.length ===0">
      <app-info-message>You haven't subscribed any channels</app-info-message>
    </div>
    <div v-else class="app-channel-grid">
      <app-channel-grid-item v-for="(channel, index) in channels" :key="index" :channel="channel"></app-channel-grid-item>
    </div>
  </div>
</template>

<script>
import InfoMessage from "../common/InfoMessage";
import ChannelGridItem from "./ChannelGridItem";
export default {
  components: {
    appChannelGridItem: ChannelGridItem,
    appInfoMessage: InfoMessage,
  },
  props: ["channels"],
};
</script>

<style scoped>
.app-channel-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
  gap: 0.5rem;
}
</style>