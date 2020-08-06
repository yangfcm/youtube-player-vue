<template>
  <div>
    <app-loader v-if="!channelIntro && !error"></app-loader>
    <app-error-message v-if="error">{{ error }}</app-error-message>
    <div v-if="channelIntro && !error" class="ui segments" id="app-channel-intro">
      <div class="ui segment">
        <p>
          <i class="calendar plus icon"></i>
          Published on {{ channelIntro.snippet.publishedAt | date }}
        </p>
      </div>
      <div class="ui segment">
        <p>
          <i class="file alternate icon"></i>
          Description -
          {{ channelIntro.snippet.description }}
        </p>
      </div>
      <div class="ui segment">
        <p>
          <i class="users icon"></i>
          {{ channelIntro.statistics.subscriberCount | decimal }}
          subscribers
        </p>
      </div>
      <div class="ui segment">
        <p>
          <i class="eye icon"></i>
          {{ channelIntro.statistics.viewCount | decimal }} views
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import ErrorMessage from "../common/ErrorMessage";
import Loader from "../common/Loader";

export default {
  components: {
    appLoader: Loader,
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
      this.channelIntro = this.channel.channelIntro.items[0];
      this.error = "";
      console.log(this.channelIntro);
      if (!this.channelIntro) {
        console.log("not found");
        this.$router.push("/not-found").catch(() => {
          console.log("error");
        });
      }
    }
  },
};
</script>

<style scoped></style>
