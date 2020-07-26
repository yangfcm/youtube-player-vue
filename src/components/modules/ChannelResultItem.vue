<template>
  <div class="ui items">
    <div class="ui item">
      <router-link class="ui small image circular" :to="`/channel/${channel.id.channelId}`">
        <img :src="channel.snippet.thumbnails.medium.url" :title="channel.snippet.channelTitle" />
      </router-link>
      <div class="content">
        <router-link
          class="header"
          :to="`/channel/${channel.id.channelId}`"
        >{{ channel.snippet.channelTitle }}</router-link>
        <div class="description">{{ channel.snippet.description }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["channel"],
};
</script>
<style scoped>
</style>