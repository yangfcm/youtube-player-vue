<template>
  <div>
    <app-blank></app-blank>
    <h3 class="ui red header center aligned">
      <i class="exclamation triangle icon"> </i><slot></slot>
    </h3>
    <app-blank></app-blank>
  </div>
</template>

<script>
import Blank from "./Blank";
export default {
  components: {
    appBlank: Blank,
  },
  props: ["errorMessage"],
};
</script>
<style scoped></style>
