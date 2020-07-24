<template>
  <div class="ui two column centered grid" v-if="nextPageToken">
    <div class="column">
      <button class="fluid ui button" @click="handleClick" :disabled="isLoadingMore">
        <div class="ui active centered inline loader mini" v-if="isLoadingMore"></div>
        <slot v-else></slot>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["nextPageToken", "isLoadingMore"],
  methods: {
    handleClick() {
      this.$emit("onClickMore", this.nextPageToken);
    },
  },
};
</script>

<style scoped>
</style>