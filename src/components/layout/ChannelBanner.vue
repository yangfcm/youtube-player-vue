<template>
  <div class="app-banner-container" v-if="channelIntro">
    <div class="app-banner-title-container">
      <div class="app-banner-image">
        <img
          class="ui tiny image circular"
          :src="channelIntro.snippet.thumbnails.medium.url"
          :alt="channelIntro.snippet.title"
        />
      </div>
      <div class="app-banner-title">
        <h2 class="ui header app-banner-title-text">{{ channelIntro.snippet.title }}</h2>
      </div>
    </div>
    <!-- <div>
        <app-subscribe-button-auth
          [channelId]="channelIntro.id"
        ></app-subscribe-button-auth>
    </div>-->
  </div>
</template>

<script>
export default {
  props: ["channelIntro"],
};
</script>

<style scoped>
.app-banner-container {
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.app-banner-title-container {
  display: flex;
}
.app-banner-image {
  margin-right: 1rem;
  min-height: 80px;
  display: flex;
  align-items: center;
}
.app-banner-title {
  display: flex !important;
  align-items: center;
}
.app-banner-title-text {
  display: flex;
  padding-top: 5px;
  padding-bottom: 5px;
}
@media (max-width: 576px) {
  .app-banner-title-text {
    flex-direction: column;
  }
}
@media (max-width: 576px) {
  .app-banner-container {
    flex-direction: column;
  }
}
</style>