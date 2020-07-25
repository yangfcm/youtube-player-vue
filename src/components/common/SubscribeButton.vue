<template>
  <div style="padding-top: 8px;">
    <div v-if="signedIn===true">
      <button
        class="ui inverted button"
        :class="subscriptionId ? 'red' : 'orange'"
        style="width: 120px;"
        @mouseover="handleMouseOver"
        @mouseleave="handleMouseLeave"
        @click="handleToggleSubscribe"
        :disabled="buttonText==='Subscribing' || buttonText==='Unsubscribing'"
      >{{ buttonText }}</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  data: function () {
    return {
      subscriptionId: "",
      buttonText: "",
      BUTTON_TEXT: {
        UNSUBSCRIBE: "Unsubscribe",
        SUBSCRIBE: "Subscribe",
        SUBSCRIBING: "Subscribing",
        UNSUBSCRIBING: "Unsubscribing",
        SUBSCRIBED: "Subscribed",
        UNSUBSCRIBED: "Unsubscribed",
      },
    };
  },
  props: ["channelId"],
  computed: {
    ...mapState(["channel"]),
    ...mapGetters(["signedIn"]),
  },
  watch: {
    signedIn(value) {
      this.buttonText = "";
      if (value) {
        this.fetchChannelSubscriptionId();
      } else {
        this.subscriptionId = "";
      }
    },
  },
  methods: {
    ...mapActions([
      "subscribeChannel",
      "unsubscribeChannel",
      "fetchChannelSubscription",
    ]),

    handleMouseOver() {
      if (this.buttonText === "Subscribed") {
        this.buttonText = this.BUTTON_TEXT.UNSUBSCRIBE;
      }
      if (this.buttonText === "Unsubscribed") {
        this.buttonText = this.BUTTON_TEXT.SUBSCRIBE;
      }
    },

    handleMouseLeave() {
      if (this.buttonText === "Subscribe") {
        this.buttonText = this.BUTTON_TEXT.UNSUBSCRIBED;
      }
      if (this.buttonText === "Unsubscribe") {
        this.buttonText = this.BUTTON_TEXT.SUBSCRIBED;
      }
    },

    async handleToggleSubscribe() {
      if (this.subscriptionId) {
        // Unsubscribe channel
        this.buttonText = this.BUTTON_TEXT.UNSUBSCRIBING;
        await this.unsubscribeChannel(this.subscriptionId);
      } else {
        // Subscribe channel
        this.buttonText = this.BUTTON_TEXT.SUBSCRIBING;
        await this.subscribeChannel(this.channelId);
      }
      this.subscriptionId = this.channel.subscriptionId;
      // When subscribe/unsubscribe operation finishes, update button text
      if (!this.subscriptionId) {
        this.buttonText = this.BUTTON_TEXT.UNSUBSCRIBED;
      } else {
        this.buttonText = this.BUTTON_TEXT.SUBSCRIBED;
      }
    },

    fetchChannelSubscriptionId() {
      this.fetchChannelSubscription(this.channelId).then(() => {
        this.subscriptionId = this.channel.subscriptionId;
        if (this.subscriptionId) {
          this.buttonText = this.BUTTON_TEXT.SUBSCRIBED;
        } else {
          this.buttonText = this.BUTTON_TEXT.UNSUBSCRIBED;
        }
      });
    },
  },

  created() {
    this.fetchChannelSubscriptionId();
  },
};
</script>

<style scoped>
</style>