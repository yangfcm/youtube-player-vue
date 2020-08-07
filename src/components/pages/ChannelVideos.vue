<template>
  <div>
    <div>hello</div>
    <app-loader v-if="!videos && !error"></app-loader>
    <app-error-message v-if="error">{{ error }}</app-error-message>
    <div v-if="videos && !error" id="app-channel-videos">
      <app-page-title>Videos in Channel</app-page-title>
      <app-video-grid :videos="videos.items"></app-video-grid>
      <app-blank></app-blank>
      <app-more-button
        :nextPageToken="videos.nextPageToken"
        :isLoadingMore="isLoadingMore"
        @onClickMore="handleMore($event)"
      >More videos</app-more-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import Loader from "../common/Loader";
import InfoMessage from "../common/InfoMessage";
import ErrorMessage from "../common/ErrorMessage";
import PageTitle from "../common/PageTitle";
import VideoGrid from "../modules/VideoGrid";
import MoreButton from "../modules/MoreButton";
import Blank from "../common/Blank";

export default {
  components: {
    appLoader: Loader,
    appInfoMessage: InfoMessage,
    appErrorMessage: ErrorMessage,
    appPageTitle: PageTitle,
    appVideoGrid: VideoGrid,
    appMoreButton: MoreButton,
    appBlank: Blank,
  },
  data: function () {
    return {
      videos: null,
      error: "",
      isLoadingMore: false,
    };
  },
  computed: {
    ...mapState(["search"]),
    ...mapGetters(["searchErrorMessage"]),
    channelId() {
      return this.$route.params.id;
    },
  },
  methods: {
    ...mapActions(["searchVideos"]),

    async handleMore($event) {
      if (this.isLoadingMore) return;
      this.isLoadingMore = true;
      const nextPageToken = $event;
      await this.searchVideos([
        { channelId: this.channelId, order: "date", type: "video" },
        nextPageToken,
      ]);
      if (this.search.searchError) {
        this.error = this.searchErrorMessage;
      } else if (this.search.searchResults) {
        this.videos = {
          ...this.videos,
          items: this.videos.items.concat(this.search.searchResults.items),
          nextPageToken: this.search.searchResults.nextPageToken,
        };
        this.error = "";
      }
      this.isLoadingMore = false;
    },
  },
  async created() {
    await this.searchVideos([
      { channelId: this.channelId, order: "date", type: "video" },
    ]);
    if (this.search.searchError) {
      this.error = this.searchErrorMessage;
    } else if (this.search.searchResults) {
      this.videos = this.search.searchResults;
      this.error = "";
    }
  },
};
</script>

<style scoped></style>
