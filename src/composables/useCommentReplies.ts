import { computed, watch, type Ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useCommentStore } from '@/stores/comment'

export function useCommentReplies(commentId: string, fetch: Ref<boolean>) {
  const commentStore = useCommentStore()
  const { fetchReplies } = commentStore
  const { commentState } = storeToRefs(commentStore)

  const status = computed(() => commentState.value.replies[commentId]?.status)
  const error = computed(() => commentState.value.replies[commentId]?.error)
  const nextPageToken = computed(() => commentState.value.replies[commentId]?.data?.nextPageToken)
  const hasMore = computed(() => !!commentState.value.replies[commentId]?.data?.nextPageToken)
  const replies = computed(() => commentState.value.replies[commentId]?.data?.items || [])

  const fetchMore = async () => {
    if (!nextPageToken.value) return
    await fetchReplies(commentId, nextPageToken.value)
  }

  watch(fetch, (value) => {
    if (value && replies.value.length === 0) {
      fetchReplies(commentId)
    }
  })

  return {
    replies,
    status,
    error,
    hasMore,
    fetchMore,
  }
}
