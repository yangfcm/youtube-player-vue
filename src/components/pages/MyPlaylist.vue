<template>
  <!-- MyPlaylist page - Playlist for authed user -->
  <div>
    <app-user-banner></app-user-banner>
    <app-menu></app-menu>
    <app-my-playlist-content v-if="signedIn === true"></app-my-playlist-content>
    <app-require-auth v-if="signedIn === false"></app-require-auth>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import UserBanner from "../layout/UserBanner";
import Menu from "../layout/Menu";
import RequireAuth from "../modules/RequireAuth";
import MyPlaylistContent from "../modules/MyPlaylistContent";

export default {
  components: {
    appMenu: Menu,
    appUserBanner: UserBanner,
    appRequireAuth: RequireAuth,
    appMyPlaylistContent: MyPlaylistContent,
  },
  computed: {
    ...mapGetters(["signedIn"]),
  },
};
</script>

<style scoped></style>
