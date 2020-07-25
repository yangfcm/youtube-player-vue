<template>
  <div>
    <app-error-message v-if="error">{{ error }}</app-error-message>
    <div v-else>
      <app-channel-banner :channelIntro="channelIntro"></app-channel-banner>
      <app-channel-menu></app-channel-menu>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import ChannelBanner from "../layout/ChannelBanner";
import ChannelMenu from "../layout/ChannelMenu";
import ErrorMessage from "../common/ErrorMessage";
export default {
  components: {
    appChannelBanner: ChannelBanner,
    appChannelMenu: ChannelMenu,
    appErrorMessage: ErrorMessage,
  },
  data: function () {
    return {
      channelIntro: null,
      error: "",
    };
  },
  computed: {
    ...mapState(["channel"]),
    ...mapGetters(["channelErrorMessage"]),
  },
  methods: {
    ...mapActions(["fetchChannelIntro"]),
  },
  async created() {
    const channelId = this.$route.params.id;
    await this.fetchChannelIntro(channelId);
    if (this.channel.channelError) {
      this.error = this.channelErrorMessage;
    } else if (this.channel.channelIntro) {
      if (!this.channel.channelIntro.items) {
        this.$router.push("/not-found");
      }
      this.channelIntro = this.channel.channelIntro.items[0];
      this.error = "";
    }
  },
};
</script>

<style scoped></style>
