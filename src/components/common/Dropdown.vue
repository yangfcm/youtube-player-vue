<template>
  <div class="ui vertical menu">
    <router-link class="item" to="/">Recommend</router-link>
    <router-link class="item" to="/subscription">Subscriptions</router-link>
    <router-link class="item" to="/playlist">Play list</router-link>
    <a class="item app-signout-btn" @click="handleSignout">Sign out</a>
  </div>
</template>

<script>
import googleAuth from "../../mixins/googleAuth";
export default {
  methods: {
    handleSignout() {
      this.handleGoogleSignout();
    }
  },
  mixins: [googleAuth]
};
</script>

<style scoped>
</style>