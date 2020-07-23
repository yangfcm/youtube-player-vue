<template>
  <!-- Home page - housing popular/recommended videos -->
  <div>
    <app-user-banner></app-user-banner>
    <app-menu></app-menu>
    <app-loader v-if="!videos && !error"></app-loader>
    <app-error-message v-if="error">
      {{ error }}
    </app-error-message>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import UserBanner from "../layout/UserBanner";
import Menu from "../layout/Menu";
import Loader from "../common/Loader";
import ErrorMessage from "../common/ErrorMessage";

export default {
  components: {
    appMenu: Menu,
    appUserBanner: UserBanner,
    appLoader: Loader,
    appErrorMessage: ErrorMessage,
  },
  data: function() {
    return {
      videos: null,
      error: null,
    };
  },
  computed: {
    ...mapState(["video"]),
    ...mapGetters(["videoErrorMessage"]),
  },
  methods: {
    ...mapActions(["fetchVideos"]),
  },
  async created() {
    await this.fetchVideos({ chart: "mostPopular" });
    if (this.video.videoError) {
      this.error = this.videoErrorMessage;
      return;
    }
    if (this.video.videos) {
      this.videos = this.video.videos;
    }
  },
};
</script>

<style scoped></style>
