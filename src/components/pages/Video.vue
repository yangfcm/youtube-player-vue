<template>
  <div>
    <app-loader v-if="!error && !videoDetail"></app-loader>
    <app-error-message v-if="error">{{ error }}</app-error-message>
    <div v-if="videoDetail" class="ui grid stackable">
      <div class="sixteen wide tablet ten wide computer column">
        <app-video-player :videoId="videoId"></app-video-player>
        <app-video-info :videoDetail="videoDetail"></app-video-info>
        <app-blank></app-blank>
        <app-comments :videoId="videoId" :channelId="channelId"></app-comments>
      </div>
      <div class="sixteen wide tablet six wide computer column">
        <app-video-sidebar
          :videoId="videoId"
          :playlistId="playlistId"
        ></app-video-sidebar>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import Loader from "../common/Loader";
import ErrorMessage from "../common/ErrorMessage";
import Blank from "../common/Blank";
import VideoPlayer from "../modules/VideoPlayer";
import VideoInfo from "../modules/VideoInfo";
import VideoSidebar from "../modules/VideoSidebar";
import Comments from "../modules/Comments";

export default {
  components: {
    appLoader: Loader,
    appErrorMessage: ErrorMessage,
    appBlank: Blank,
    appVideoPlayer: VideoPlayer,
    appVideoInfo: VideoInfo,
    appComments: Comments,
    appVideoSidebar: VideoSidebar,
  },
  data: function() {
    return {
      videoDetail: null,
      error: "",
    };
  },
  computed: {
    ...mapState(["video"]),
    ...mapGetters(["videoErrorMessage"]),
    videoId() {
      return this.$route.params.id;
    },
    playlistId() {
      return this.$route.query.playlistId;
    },
    channelId() {
      if (this.videoDetail) {
        return this.videoDetail.snippet.channelId;
      }
      return "";
    },
  },
  methods: {
    ...mapActions(["fetchVideo"]),
  },
  async created() {
    await this.fetchVideo(this.videoId);
    if (this.video.videoError) {
      this.error = this.videoErrorMessage;
    } else if (this.video.video && !this.video.video.items[0]) {
      this.$router.push("/not-found");
    } else if (this.video.video && this.video.video.items[0]) {
      this.videoDetail = this.video.video.items[0];
      this.error = "";
    }
  },
};
</script>
<style scoped></style>
