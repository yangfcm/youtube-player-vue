import { onMounted, computed, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useCommentStore } from '@/stores/comment'
import type { CommentOrder } from '@/stores/types'

export function useComments(videoId: string) {
  const commentStore = useCommentStore()
  const { fetchComments, setCommentOrder } = commentStore
  const { commentState } = storeToRefs(commentStore)

  const status = computed(() => commentState.value.comments[videoId]?.status)
  const error = computed(() => commentState.value.comments[videoId]?.error)
  const order = computed(() => commentState.value.comments[videoId]?.order || 'relevance')
  const nextPageToken = computed(
    () => commentState.value.comments[videoId]?.data[order.value]?.nextPageToken,
  )
  const hasMore = computed(
    () => !!commentState.value.comments[videoId]?.data[order.value]?.nextPageToken,
  )
  const comments = computed(
    () => commentState.value.comments[videoId]?.data[order.value]?.items || [],
  )

  const setOrder = (order: CommentOrder) => {
    setCommentOrder(videoId, order)
  }

  const fetchMore = async () => {
    if (!nextPageToken.value) return
    await fetchComments(videoId, order.value, nextPageToken.value)
  }

  onMounted(() => {
    if (comments.value.length === 0) {
      fetchComments(videoId, order.value)
    }
  })

  watch(order, (newValue, oldValue) => {
    if (comments.value.length === 0) {
      fetchComments(videoId, newValue)
    }
  })

  return {
    comments,
    order,
    status,
    error,
    hasMore,
    setOrder,
    fetchMore,
  }
}
