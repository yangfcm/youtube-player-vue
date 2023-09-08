<script setup lang="ts">
import { ref } from 'vue'
import { useCommentReplies } from '@/composables/useCommentReplies'
import type { CommentSnippet } from '@/stores/types'
import AppLoader from '@/components/LoaderComp.vue'
import AppErrorMessage from '@/components/ErrorMessageComp.vue'
import AppMoreButton from '@/components/MoreButton.vue'
import AppCommentItem from '@/components/CommentItem.vue'
import { AsyncStatus } from '@/settings/types'

const props = defineProps<{
  comment: CommentSnippet
}>()

const showReply = ref(false)
const toggleShowReply = () => {
  showReply.value = !showReply.value
}
const { replies, status, error, hasMore, fetchMore } = useCommentReplies(
  props.comment.id,
  showReply,
)
</script>

<template>
  <v-btn variant="text" density="compact" color="secondary" @click="toggleShowReply">
    {{ comment.snippet.totalReplyCount }}
    {{ comment.snippet.totalReplyCount === 1 ? 'reply' : 'replies' }}
  </v-btn>
  <div v-if="showReply">
    <app-loader v-if="status === AsyncStatus.LOADING && !replies.length"></app-loader>
    <app-error-message v-if="status === AsyncStatus.FAIL" :message="error"></app-error-message>
    <div v-for="reply in replies" :key="reply.id">
      <app-comment-item :comment="reply"></app-comment-item>
    </div>
    <app-more-button
      v-if="hasMore"
      :loading="status === AsyncStatus.LOADING"
      @onLoadMore="fetchMore"
      >More replies</app-more-button
    >
  </div>
</template>
