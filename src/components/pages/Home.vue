<template>
  <!-- Home page - housing popular/recommended videos -->
  <div>
    <app-user-banner></app-user-banner>
    <app-menu></app-menu>
    <app-loader v-if="!videos && !error"></app-loader>
    <app-error-message v-if="error">{{ error }}</app-error-message>
    <div v-if="videos && !error">
      <app-page-title>Recommended Videos</app-page-title>
      <app-video-grid :videos="videos.items"></app-video-grid>
      <app-blank></app-blank>
      <app-more-button
        :nextPageToken="videos.nextPageToken"
        @onClickMore="handleMore($event)"
      >More videos</app-more-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import UserBanner from "../layout/UserBanner";
import Menu from "../layout/Menu";
import Loader from "../common/Loader";
import ErrorMessage from "../common/ErrorMessage";
import PageTitle from "../common/PageTitle";
import VideoGrid from "../modules/VideoGrid";
import MoreButton from "../modules/MoreButton";
import Blank from "../common/Blank";

export default {
  components: {
    appMenu: Menu,
    appUserBanner: UserBanner,
    appLoader: Loader,
    appErrorMessage: ErrorMessage,
    appPageTitle: PageTitle,
    appVideoGrid: VideoGrid,
    appMoreButton: MoreButton,
    appBlank: Blank,
  },
  data: function () {
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

    handleMore($event) {
      console.log("ok", $event);
    },
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
