<template>
  <div>
    <app-loader v-if="!channels && !error"></app-loader>
    <app-error-message v-if="error">{{ error }}</app-error-message>
    <div v-if="channels && !error" id="my-channel-content">
      <app-page-title>My Subscriptions</app-page-title>
      <app-channel-grid :channels="channels.items"></app-channel-grid>
      <app-blank></app-blank>
      <app-more-button
        :nextPageToken="channels.nextPageToken"
        :isLoadingMore="isLoadingMore"
        @onClickMore="handleMore($event)"
      >More channels</app-more-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import Loader from "../common/Loader";
import ErrorMessage from "../common/ErrorMessage";
import PageTitle from "../common/PageTitle";
import MoreButton from "../modules/MoreButton";
import ChannelGrid from "../modules/ChannelGrid";
import Blank from "../common/Blank";

export default {
  components: {
    appLoader: Loader,
    appErrorMessage: ErrorMessage,
    appPageTitle: PageTitle,
    appMoreButton: MoreButton,
    appChannelGrid: ChannelGrid,
    appBlank: Blank,
  },
  data: function () {
    return {
      channels: null,
      error: "",
      isLoadingMore: false,
    };
  },
  computed: {
    ...mapState(["channel"]),
    ...mapGetters(["channelErrorMessage"]),
  },
  methods: {
    ...mapActions(["fetchMyChannels"]),
    async handleMore($event) {
      if (this.isLoadingMore) return;
      this.isLoadingMore = true;
      const nextPageToken = $event;
      await this.fetchMyChannels(nextPageToken);
      if (this.channel.channelError) {
        this.error = this.channelErrorMessage;
      } else if (this.channel.myChannels) {
        this.channels = {
          ...this.channels,
          items: this.channels.items.concat(this.channel.myChannels.items),
          nextPageToken: this.channel.myChannels.nextPageToken,
        };
        this.error = "";
      }
      this.isLoadingMore = false;
    },
  },
  async created() {
    await this.fetchMyChannels();
    if (this.channel.channelError) {
      this.error = this.channelErrorMessage;
    } else if (this.channel.myChannels) {
      this.channels = this.channel.myChannels;
      this.error = "";
    }
  },
};
</script>

<style scoped>
</style>