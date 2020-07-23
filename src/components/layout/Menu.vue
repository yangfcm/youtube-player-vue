<template>
  <div class="ui three item menu red stackable">
    <router-link class="item" to="/" exact active-class="active">
      <i class="thumbs up outline icon"></i> Recommend
    </router-link>
    <router-link class="item" to="/subscription" active-class="active">
      <i class="user plus icon"></i> Subscription
    </router-link>
    <router-link class="item" to="/playlist" active-class="active"
      ><i class="list icon"></i> Playlist</router-link
    >
  </div>
</template>

<script>
export default {};
</script>

<style scoped></style>
