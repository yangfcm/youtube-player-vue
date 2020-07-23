<template>
  <!-- Home page - housing popular/recommended videos -->
  <div>
    <app-user-banner></app-user-banner>
    <app-menu></app-menu>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import UserBanner from "../layout/UserBanner";
import Menu from "../layout/Menu";

export default {
  components: {
    appMenu: Menu,
    appUserBanner: UserBanner,
  },
  data: function() {
    return {
      videos: null,
      error: null,
    };
  },
  computed: {
    ...mapState(["video"]),
    ...mapGetters(["videoErrorMessage"]),
  },
  methods: {
    ...mapActions(["fetchVideos"]),
  },
  async created() {
    await this.fetchVideos({ chart: "mostPopular" });
    if (this.video.videos) {
      this.videos = this.video.videos;
    }
    console.log(this.videos);
  },
};
</script>

<style scoped></style>
