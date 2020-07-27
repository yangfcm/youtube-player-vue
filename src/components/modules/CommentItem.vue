<template>
  <div class="ui feed">
    <div class="event">
      <div class="label">
        <img :src="item.authorProfileImageUrl" />
      </div>
      <div class="content">
        <div class="summary">
          <a>{{ item.authorDisplayName }}</a>
          <div class="date">{{ item.publishedAt | date }}</div>
        </div>
        <div v-html="item.textDisplay" class="text" style="width: 100%; overflow: auto;"></div>
      </div>
    </div>
    <app-breakline></app-breakline>
  </div>
</template>

<script>
import Breakline from "../common/Breakline";
export default {
  components: {
    appBreakline: Breakline,
  },
  props: ["comment", "reply"],
  computed: {
    item() {
      // This component is for holding one comment or reply.
      if (this.comment) {
        return {
          authorProfileImageUrl: this.comment.snippet.topLevelComment.snippet
            .authorProfileImageUrl,
          authorDisplayName: this.comment.snippet.topLevelComment.snippet
            .authorDisplayName,
          publishedAt: this.comment.snippet.topLevelComment.snippet.publishedAt,
          textDisplay: this.comment.snippet.topLevelComment.snippet.textDisplay,
        };
      }
      if (this.reply) {
        return {
          authorProfileImageUrl: this.reply.snippet.authorProfileImageUrl,
          authorDisplayName: this.reply.snippet.authorDisplayName,
          publishedAt: this.reply.snippet.publishedAt,
          textDisplay: this.reply.snippet.textDisplay,
        };
      }
      return null;
    },
  },
};
</script>

<style scoped></style>
