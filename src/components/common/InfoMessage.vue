<template>
  <div class="ui segment basic">
    <h3 class="ui center aligned header">
      <i class="info circle icon"></i>
      <slot></slot>
    </h3>
  </div>
</template>

<script>
import Blank from "./Blank";
export default {
  components: {
    appBlank: Blank,
  },
  props: ["message"],
};
</script>

<style scoped>
</style>