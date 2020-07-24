<template>
  <div class="ui red message">
    <app-blank></app-blank>
    <div class="ui header aligned center">You have not signed in</div>
    <app-blank></app-blank>
    <div class="ui header aligned center">
      <button class="ui youtube button negative basic" @click="handleSignIn">
        <i class="youtube icon"></i>
        Sign in
      </button>
    </div>
    <app-blank></app-blank>
  </div>
</template>

<script>
import googleAuth from "../../mixins/googleAuth";
import Blank from "../common/Blank";
export default {
  components: {
    appBlank: Blank,
  },
  mixins: [googleAuth],
  methods: {
    handleSignIn() {
      this.handleGoogleSignin();
    },
  },
};
</script>

<style scoped>
</style>