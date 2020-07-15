<template>
  <div class="hello">
    <h1>{{ msg }}</h1>test
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  computed: {
    ...mapGetters(["videos", "error", "video"])
  },
  methods: {
    ...mapActions({
      fetchVideos: "fetchVideos",
      fetchVideo: "fetchVideo"
    })
  },
  async created() {
    await this.fetchVideo("CacIlFaXph0");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
