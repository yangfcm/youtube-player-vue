<template>
  <div class="ui form" v-if="signedIn">
    <div class="field">
      <label>Publish your comment</label>
      <textarea rows="2" v-model="commentText"></textarea>
    </div>
    <div class="ui red message" v-if="error">{{ error }}</div>
    <div>
      <button
        class="ui primary button"
        @click="handleSubmit"
        :disabled="!commentText.trim() || isPublishing"
      >Submit</button>
    </div>
    <app-blank></app-blank>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import Blank from "../common/Blank";
export default {
  components: {
    appBlank: Blank,
  },
  data: function () {
    return {
      commentText: "",
      error: "",
      isPublishing: false,
    };
  },
  props: ["channelId", "videoId"],
  computed: {
    ...mapState(["comment"]),
    ...mapGetters(["signedIn", "commentErrorMessage"]),
  },
  methods: {
    ...mapActions(["addComment"]),
    async handleSubmit() {
      this.isPublishing = true;
      console.log(this.commentText);
      await this.addComment([this.channelId, this.videoId, this.commentText]);
      if (this.comment.commentError) {
        this.error = this.comment.commentError;
      } else {
        this.$emit("commentAdded", this.comment.addedComment);
        this.commentText = "";
      }
      this.isPublishing = false;
    },
  },
};
</script>

<style scoped>
</style>