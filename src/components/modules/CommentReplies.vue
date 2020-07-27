<template>
  <div v-if="commentItem.snippet.totalReplyCount > 0">
    <a @click="handleToggleShowReplies" style="cursor: pointer;">
      {{ showReplies ? 'Hide' : 'Show'}}
      {{ commentItem.snippet.totalReplyCount }}
      {{ commentItem.snippet.totalReplyCount === 1 ? 'Reply' : 'Replies'}}
    </a>
    <div style="margin-bottom: 8px;"></div>
    <div v-if="showReplies">
      <app-loader v-if="!error && !replies"></app-loader>
      <app-error-message v-if="error">{{ error }}</app-error-message>
      <div v-if="replies && !error">
        <app-comment-item v-for="(reply, index) in replies.items" :key="index" :reply="reply"></app-comment-item>
      </div>
      <app-more-button
        :nextPageToken="replies && replies.nextPageToken"
        :isLoadingMore="isLoadingMore"
        @onClickMore="handleMore($event)"
      >More replies</app-more-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import MoreButton from "./MoreButton";
import Loader from "../common/Loader";
import ErrorMessage from "../common/ErrorMessage";
import CommentItem from "./CommentItem";

export default {
  components: {
    appLoader: Loader,
    appErrorMessage: ErrorMessage,
    appMoreButton: MoreButton,
    appCommentItem: CommentItem,
  },
  data: function () {
    return {
      replies: null,
      error: "",
      showReplies: false,
      isLoadingMore: false,
    };
  },
  props: ["commentItem"],
  computed: {
    ...mapState(["comment"]),
    ...mapGetters(["commentErrorMessage"]),
  },
  methods: {
    ...mapActions(["fetchReplies"]),
    async handleToggleShowReplies() {
      this.showReplies = !this.showReplies;
      if (this.replies) return;
      await this.fetchReplies([this.commentItem.id]);
      if (this.comment.commentError) {
        this.error = this.commentErrorMessage;
      } else if (this.comment.replies) {
        this.replies = this.comment.replies;
        this.error = null;
      }
    },
    async handleMore($event) {
      const pageToken = $event;
      this.isLoadingMore = true;
      await this.fetchReplies([this.commentItem.id, pageToken]);
      if (!this.comment.commentError) {
        this.replies = {
          ...this.replies,
          items: this.replies.items.concat(this.comment.replies.items),
          nextPageToken: this.comment.replies.nextPageToken,
        };
      }
      this.isLoadingMore = false;
    },
  },
};
</script>

<style scoped></style>
