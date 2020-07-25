<template>
  <div class="ui card centered" style="margin: 0;">
    <router-link :to="`/channel/${channel.snippet.resourceId.channelId}`" class="image">
      <img :src="channel.snippet.thumbnails.medium.url" :alt="channel.snippet.title" />
    </router-link>
    <div class="content" style="overflow: hidden; min-height: 72px">
      <router-link
        class="header ui aligned center"
        :to="`/channel/${channel.snippet.resourceId.channelId}`"
      >{{ channel.snippet.title }}</router-link>
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