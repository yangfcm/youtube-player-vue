<template>
  <div class="hello">
    <h1>{{ msg }}</h1>test
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  computed: {
    ...mapState(["video", "channel"]),
    ...mapGetters(["videoErrorMessage", "channelErrorMessage"])
  },
  methods: {
    ...mapActions({
      fetchVideos: "fetchVideos",
      fetchVideo: "fetchVideo",
      fetchMyChannels: "fetchMyChannels"
    })
  },
  async created() {
    await this.fetchVideo("CacIlFaXph");
    await this.fetchMyChannels();
    console.log(this.video.video);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
