<template>
  <!-- MyChannel page - Channels subscribed by authed user -->
  <div>
    <app-user-banner></app-user-banner>
    <app-menu></app-menu>
    <app-my-channel-content v-if="signedIn === true"></app-my-channel-content>
    <app-require-auth v-if="signedIn === false"></app-require-auth>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import UserBanner from "../layout/UserBanner";
import Menu from "../layout/Menu";
import RequireAuth from "../modules/RequireAuth";
import MyChannelContent from "../modules/MyChannelContent";

export default {
  components: {
    appMenu: Menu,
    appUserBanner: UserBanner,
    appRequireAuth: RequireAuth,
    appMyChannelContent: MyChannelContent,
  },
  computed: {
    ...mapGetters(["signedIn"]),
  },
};
</script>

<style scoped></style>
