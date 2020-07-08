<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    test
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  computed: {
    ...mapGetters(["videos", "error", "video"]),
  },
  methods: {
    ...mapActions({
      fetchVideos: "fetchVideos",
    }),
  },
  async created() {
    await this.fetchVideos({ chart: "mostPopular" });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
