<template>
  <div>
    <app-loader v-if="!playlists && !error"></app-loader>
    <app-error-message v-if="error">{{ error }}</app-error-message>
    <div v-if="playlists && !error">
      <app-page-title>My Playlist</app-page-title>
      <app-playlist-grid :playlists="playlists.items"></app-playlist-grid>
      <app-blank></app-blank>
      <app-more-button>
        :nextPageToken="playlists.nextPageToken"
        :isLoadingMore = "isLoadingMore"
        @onClickMore = 'handleMore($event)'
      </app-more-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import Loader from "../common/Loader";
import ErrorMessage from "../common/ErrorMessage";
import PageTitle from "../common/PageTitle";
import MoreButton from "./MoreButton";
import PlaylistGrid from "./PlaylistGrid";
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
  },
  methods: {
    ...mapActions(["fetchMyPlaylist"]),
    handleMore($event) {
      console.log("handle more");
    },
  },
  async created() {
    await this.fetchMyPlaylist();
    if (this.playlist.playlistError) {
      this.error = this.playlistErrorMessage;
    } else if (this.playlist.myPlaylist) {
      this.playlists = this.playlist.myPlaylist;
      this.error = "";
    }
  },
};
</script>

<style scoped>
</style>