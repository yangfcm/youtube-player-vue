<template>
  <div class="ui vertical menu">
    <router-link class="item" to="/">Recommend</router-link>
    <router-link class="item" to="/subscription">Subscriptions</router-link>
    <router-link class="item" to="/playlist">Play list</router-link>
    <a class="item" @click="handleGoogleSignout">Sign out</a>
  </div>
</template>

<script>
import googleAuth from "../../mixins/googleAuth";
export default {
  mixins: [googleAuth]
};
</script>

<style scoped>
</style>