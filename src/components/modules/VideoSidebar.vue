<template>
  <div>
    <app-loader v-if="!sidebarVideos && !error"></app-loader>
    <app-error-message v-if="error">{{ error }}</app-error-message>
    <app-video-list v-if="sidebarVideos && !error" :videos="sidebarVideos.items"></app-video-list>
    <app-more-button
      :nextPageToken="sidebarVideos && sidebarVideos.nextPageToken"
      :isLoadingMore="isLoadingMore"
      @onClickMore="handleMore($event)"
    >More videos</app-more-button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import Loader from "../common/Loader";
import ErrorMessage from "../common/ErrorMessage";
import VideoList from "./VideoList";
import MoreButton from "./MoreButton";

export default {
  components: {
    appLoader: Loader,
    appErrorMessage: ErrorMessage,
    appVideoList: VideoList,
    appMoreButton: MoreButton,
  },
  data: function () {
    return {
      sidebarVideos: null,
      error: "",
      isLoadingMore: false,
    };
  },
  props: ["videoId", "playlistId"],
  computed: {
    ...mapState(["search", "playlist"]),
    ...mapGetters(["searchErrorMessage", "playlistErrorMessage"]),
  },
  watch: {
    videoId() {
      if (!this.playlistId) {
        this.fetchSidebarVideos();
      }
    },
  },
  methods: {
    ...mapActions(["searchVideos", "fetchPlaylistDetail"]),
    fetchSidebarVideos(pageToken = null) {
      if (this.playlistId) {
        // If the video is from a playlist,(playlistId exists in url)
        // Sidebar should fetch and display other videos from the playlist
        this.fetchPlaylistVideos(pageToken);
      } else {
        // Otherwise, sidebar will fetch and display related videos
        this.fetchRelatedVideos(pageToken);
      }
    },
    handleMore($event) {
      this.isLoadingMore = true;
      this.fetchSidebarVideos($event);
    },
    async fetchPlaylistVideos(pageToken = null) {
      await this.fetchPlaylistDetail([this.playlistId, pageToken]);
      if (this.playlist.playlistError) {
        this.error = this.playlistErrorMessage;
        return;
      }
      if (!pageToken) {
        this.sidebarVideos = this.playlist.playlistDetail;
      } else {
        this.sidebarVideos = {
          ...this.sidebarVideos,
          items: this.sidebarVideos.items.concat(
            this.playlist.playlistDetail.items
          ),
          nextPageToken: this.playlist.playlistDetail.nextPageToken,
        };
      }
      this.isLoadingMore = false;
    },
    async fetchRelatedVideos(pageToken = null) {
      await this.searchVideos([
        {
          relatedToVideoId: this.videoId,
          type: "video",
        },
        pageToken,
      ]);
      if (this.search.searchError) {
        this.error = this.searchErrorMessage;
        return;
      }
      if (!pageToken) {
        this.sidebarVideos = this.search.searchResults;
      } else {
        this.sidebarVideos = {
          ...this.sidebarVideos,
          items: this.sidebarVideos.items.concat(
            this.search.searchResults.items
          ),
          nextPageToken: this.search.searchResults.nextPageToken,
        };
      }
      this.isLoadingMore = false;
    },
  },
  created() {
    this.fetchSidebarVideos();
  },
};
</script>

<style scoped></style>
