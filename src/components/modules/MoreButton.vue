<template>
  <div class="ui two column centered grid" v-if="nextPageToken">
    <div class="column">
      <button class="fluid ui button" @click="handleClick">
        <slot></slot>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["nextPageToken"],
  methods: {
    handleClick() {
      this.$emit("onClickMore", this.nextPageToken);
    },
  },
};
</script>

<style scoped>
</style>