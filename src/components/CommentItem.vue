<script setup lang="ts">
import { fromNow } from '@/settings/utils';
import AppCommentReplies from '@/components/CommentReplies.vue'
import type { CommentSnippet, ReplySnippet } from '@/stores/types';

const props = defineProps<{
  comment: CommentSnippet | ReplySnippet
}>()

const isTopComment = (props.comment as CommentSnippet).snippet.topLevelComment;
const totalReplyCount = isTopComment ? (props.comment as CommentSnippet).snippet.totalReplyCount : 0
const commentItem = isTopComment ? (props.comment as CommentSnippet).snippet.topLevelComment.snippet : (props.comment as ReplySnippet).snippet
</script>

<template>
  <v-card variant="flat" class="mb-3">
    <div class="d-flex">
      <div class="mr-1 pa-1">
        <v-avatar
          :image="commentItem.authorProfileImageUrl"
          v-bind="props"
        >
          <v-icon icon="mdi-account" color="white" size="large"></v-icon>
        </v-avatar>
      </div>
      <div>
        <span class="font-weight-bold">{{ commentItem.authorDisplayName }}</span>&nbsp;&nbsp;
        <span class="font-weight-light">{{ fromNow(commentItem.publishedAt) }}</span>
        <div>
          {{ commentItem.textOriginal }}
        </div>
        <app-comment-replies
          :comment="(comment as CommentSnippet)"
          v-if="(comment as CommentSnippet).snippet.totalReplyCount > 0"
        ></app-comment-replies>
      </div>
    </div>
  </v-card>
</template>