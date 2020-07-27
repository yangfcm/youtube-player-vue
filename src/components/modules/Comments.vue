<template>
  <div>
    <app-loader v-if="!error && !comments && !comment.commentsDisabled"></app-loader>
    <app-error-message v-if="error">{{ error }}</app-error-message>
    <app-info-message v-if="comment.commentsDisabled && !error">Comment is disabled</app-info-message>
    <div v-if="comments && !error">
      <h3 class="ui header">
        <i class="comments icon"></i>
        <div class="content">Comments</div>
      </h3>
      <app-comment-form
        :videoId="videoId"
        :channelId="channelId"
        @commentAdded="handleCommentAdded($event)"
      ></app-comment-form>
      <app-info-message v-if="comments.items.length === 0">No comment in the video</app-info-message>
      <div v-for="(comment, index) in comments.items" :key="index">
        <app-comment-item :comment="comment"></app-comment-item>
      </div>
      <app-more-button
        :nextPageToken="comments.nextPageToken"
        :isLoadingMore="isLoadingMore"
        @onClickMore="handleMore($event)"
      >More comments</app-more-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
import Loader from "../common/Loader";
import ErrorMessage from "../common/ErrorMessage";
import InfoMessage from "../common/InfoMessage";
import Blank from "../common/Blank";
import CommentItem from "./CommentItem";
import MoreButton from "./MoreButton";
import Breakline from "../common/Breakline";
import CommentReplies from "./CommentReplies";
import CommentForm from "./CommentForm";

export default {
  components: {
    appBlank: Blank,
    appLoader: Loader,
    appErrorMessage: ErrorMessage,
    appInfoMessage: InfoMessage,
    appCommentItem: CommentItem,
    appMoreButton: MoreButton,
    appBreakline: Breakline,
    appCommentReplies: CommentReplies,
    appCommentForm: CommentForm,
  },
  data: function () {
    return {
      comments: null,
      error: "",
      isLoadingMore: false,
    };
  },
  props: ["videoId", "channelId"],
  computed: {
    ...mapState(["comment"]),
    ...mapGetters(["commentErrorMessage"]),
  },
  watch: {
    videoId(value) {
      this.comments = null;
      this.fetchVideoComments();
    },
  },
  methods: {
    ...mapActions(["fetchComments"]),
    handleMore($event) {
      const pageToken = $event;
      this.isLoadingMore = true;
      this.fetchVideoComments(pageToken);
    },
    async fetchVideoComments(pageToken = null) {
      await this.fetchComments([this.videoId, pageToken]);
      if (this.comment.commentError) {
        this.error = this.commentErrorMessage;
      } else if (this.comment.comments) {
        if (!pageToken) {
          this.comments = this.comment.comments;
        } else {
          this.comments = {
            ...this.comments,
            items: this.comments.items.concat(this.comment.comments.items),
            nextPageToken: this.comment.comments.nextPageToken,
          };
        }
        this.error = "";
        this.isLoadingMore = false;
      }
    },
    handleCommentAdded($event) {
      const addedComment = $event;
      console.log(addedComment);
      this.comments = {
        ...this.comments,
        items: [addedComment, ...this.comments.items],
      };
    },
  },
  created() {
    this.fetchVideoComments();
  },
};
</script>

<style scoped></style>
