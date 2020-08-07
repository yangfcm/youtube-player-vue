<template>
  <!-- PlaylistDetail page - Videos in a particular playlist -->
  <div>
    <app-blank></app-blank>
    <app-loader v-if="!error && !playlistDetail"></app-loader>
    <app-error-message v-if="error">{{ error }}</app-error-message>
    <div v-if="!error && playlistDetail">
      <app-video-list :videos="playlistDetail.items"></app-video-list>
      <app-blank></app-blank>
      <app-more-button
        :nextPageToken="playlistDetail.nextPageToken"
        :isLoadingMore="isLoadingMore"
        @onClickMore="handleMore($event)"
        >More videos</app-more-button
      >
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import Blank from "../common/Blank";
import ErrorMessage from "../common/ErrorMessage";
import Loader from "../common/Loader";
import VideoList from "../modules/VideoList";
import MoreButton from "../modules/MoreButton";

export default {
  components: {
    appBlank: Blank,
    appErrorMessage: ErrorMessage,
    appLoader: Loader,
    appVideoList: VideoList,
    appMoreButton: MoreButton,
  },
  data: function() {
    return {
      playlistDetail: null,
      error: "",
      isLoadingMore: false,
    };
  },
  computed: {
    ...mapState(["playlist"]),
    ...mapGetters(["playlistErrorMessage"]),
    playlistId() {
      return this.$route.params.id;
    },
  },
  methods: {
    ...mapActions(["fetchPlaylistDetail"]),
    async handleMore($event) {
      if (this.isLoadingMore) return;
      this.isLoadingMore = true;
      const nextPageToken = $event;
      await this.fetchPlaylistDetail([this.playlistId, nextPageToken]);
      if (this.playlist.playlistError) {
        this.error = this.playlistErrorMessage;
      } else {
        this.playlistDetail = {
          ...this.playlistDetail,
          items: this.playlistDetail.items.concat(
            this.playlist.playlistDetail.items
          ),
          nextPageToken: this.playlist.playlistDetail.nextPageToken,
        };
        this.error = "";
      }
      this.isLoadingMore = false;
    },
  },
  async created() {
    await this.fetchPlaylistDetail([this.playlistId]);
    if (this.playlist.playlistError && this.playlist.playlistError.response) {
      if (this.playlist.playlistError.response.data.error.code == 404) {
        this.$router.push("/not-found");
        return;
      }
      this.error = this.playlistErrorMessage;
      return;
    }
    this.playlistDetail = this.playlist.playlistDetail;
  },
};
</script>

<style scoped></style>
