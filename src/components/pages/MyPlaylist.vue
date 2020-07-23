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
export default {
  components: {
    appMenu: Menu,
    appUserBanner: UserBanner,
  },
};
</script>

<style scoped></style>
