<template>
  <div class="app-banner-container">
    <div class="app-banner-image">
      <i class="user secret icon huge" v-if="signedIn === false"></i>
      <img
        v-if="signedIn === true"
        class="ui tiny image circular"
        :src="auth.user && auth.user.picture"
        :alt="auth.user.name"
      />
    </div>

    <div class="app-banner-title">
      <h2 class="ui header app-banner-title-text">
        <span style="margin-right: 3px;"
          >Welcome
          {{ signedIn === true ? ` back, ${auth.user.name}` : "" }}
        </span>
      </h2>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  computed: {
    ...mapState(["auth"]),
    ...mapGetters(["signedIn"]),
  },
};
</script>
<style scoped>
.app-banner-container {
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
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
}
@media (max-width: 576px) {
  .app-banner-title-text {
    flex-direction: column;
  }
}
</style>
