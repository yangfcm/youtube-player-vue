<template>
  <div>
    <app-blank></app-blank>
    <div class="ui red message">
      <app-blank></app-blank>
      <div class="ui header aligned center">The page you requested doesn't exist.</div>
      <app-blank></app-blank>
      <div class="ui header aligned center">
        <router-link to="/" class="ui red basic button">Back to Home</router-link>
      </div>
      <app-blank></app-blank>
    </div>
  </div>
</template>

<script>
import Blank from "../common/Blank";
export default {
  components: {
    appBlank: Blank,
  },
};
</script>

<style scoped></style>
