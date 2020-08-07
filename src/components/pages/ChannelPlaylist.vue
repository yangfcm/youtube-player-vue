<template>
  <div>
    <app-loader v-if="!playlists && !error"></app-loader>
    <app-error-message v-if="error">{{ error }}</app-error-message>
    <div v-if="playlists && !error" id="app-channel-playlist">
      <app-page-title>Playlist in Channel</app-page-title>
      <app-playlist-grid :playlists="playlists.items"></app-playlist-grid>
      <app-blank></app-blank>
      <app-more-button
        :nextPageToken="playlists.nextPageToken"
        :isLoadingMore="isLoadingMore"
        @onClickMore="handleMore($event)"
      >More playlist</app-more-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import Loader from "../common/Loader";
import ErrorMessage from "../common/ErrorMessage";
import PageTitle from "../common/PageTitle";
import MoreButton from "../modules/MoreButton";
import PlaylistGrid from "../modules/PlaylistGrid";
import Blank from "../common/Blank";

export default {
  components: {
    appLoader: Loader,
    appErrorMessage: ErrorMessage,
    appPageTitle: PageTitle,
    appMoreButton: MoreButton,
    appPlaylistGrid: PlaylistGrid,
    appBlank: Blank,
  },
  data: function () {
    return {
      playlists: null,
      error: "",
      isLoadingMore: false,
    };
  },
  computed: {
    ...mapState(["playlist"]),
    ...mapGetters(["playlistErrorMessage"]),
    channelId() {
      return this.$route.params.id;
    },
  },
  methods: {
    ...mapActions(["fetchPlaylist"]),
    async handleMore($event) {
      if (this.isLoadingMore) return;
      this.isLoadingMore = true;
      const nextPageToken = $event;
      await this.fetchPlaylist([this.channelId, nextPageToken]);
      if (this.playlist.playlistError) {
        this.error = this.playlistErrorMessage;
      } else {
        this.playlists = {
          ...this.playlists,
          items: this.playlists.items.concat(this.playlist.playlist.items),
          nextPageToken: this.playlist.playlist.nextPageToken,
        };
        this.error = "";
      }
      this.isLoadingMore = false;
    },
  },
  async created() {
    await this.fetchPlaylist([this.channelId]);
    if (this.playlist.playlistError) {
      this.error = this.playlistErrorMessage;
    } else if (this.playlist.playlist) {
      this.playlists = this.playlist.playlist;
      this.error = "";
    }
  },
};
</script>

<style scoped></style>
