<template>
  <div class="ui three item menu red stackable">
    <router-link class="item" to="videos" active-class="active">
      <i class="video icon"></i> Videos
    </router-link>
    <router-link class="item" to="playlist" active-class="active">
      <i class="list icon"></i>Playlist
    </router-link>
    <router-link class="item" to="intro" active-class="active">
      <i class="info circle icon"></i>Intro
    </router-link>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
</style>