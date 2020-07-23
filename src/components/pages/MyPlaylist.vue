<template>
  <!-- MyPlaylist page - Playlist for authed user -->
  <div>
    <app-user-banner></app-user-banner>
    <app-menu></app-menu>
  </div>
</template>

<script>
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
};
</script>

<style scoped></style>
