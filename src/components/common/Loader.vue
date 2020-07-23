<template>
  <div>
    <app-blank></app-blank>
    <div class="ui active centered inline loader"></div>
    <app-blank></app-blank>
  </div>
</template>

<script>
import Blank from "./Blank";
export default {
  components: {
    appBlank: Blank,
  },
};
</script>

<style scoped></style>
