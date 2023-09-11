<script setup lang="ts">
import { computed } from 'vue'
import { useComments } from '@/composables/useComments'
import { useAuth } from '@/composables/useAuth'
import AppSortComments from './SortComments.vue'
import AppAddComment from './AddComment.vue'
import AppLoader from '@/components/LoaderComp.vue'
import AppErrorMessage from '@/components/ErrorMessage.vue'
import AppMoreButton from '@/components/MoreButton.vue'
import AppCommentItem from '@/components/CommentItem.vue'
import { AsyncStatus } from '@/settings/types'

const props = defineProps<{
  videoId: string
}>()

const { isSignedIn } = useAuth()
const videoId = computed(() => props.videoId)
const { comments, status, error, hasMore, fetchMore, setOrder, order } = useComments(videoId)
</script>

<template>
  <div class="text-h6 mb-2">
    <v-icon icon="mdi-comment-text-multiple"></v-icon>
    Comments
    <app-sort-comments @onSetOrder="setOrder" :order="order"></app-sort-comments>
  </div>
  <div v-if="isSignedIn" class="mb-2">
    <app-add-comment :videoId="videoId"></app-add-comment>
  </div>
  <app-loader v-if="status === AsyncStatus.LOADING && !comments.length"></app-loader>
  <app-error-message v-if="status === AsyncStatus.FAIL" :message="error"></app-error-message>
  <v-alert
    v-if="status === AsyncStatus.SUCCESS && !comments.length"
    class="text-center"
    border="bottom"
  >
    <v-icon icon="mdi-alert"></v-icon>&nbsp;&nbsp;Nobody has left comment.
  </v-alert>
  <div v-for="comment in comments" :key="comment.id">
    <app-comment-item :comment="comment"></app-comment-item>
  </div>
  <app-more-button v-if="hasMore" :loading="status === AsyncStatus.LOADING" @onLoadMore="fetchMore">
    More comments
  </app-more-button>
</template>
