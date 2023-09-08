import { onMounted, computed, watch, type Ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useCommentStore } from '@/stores/comment'
import type { CommentOrder } from '@/stores/types'

export function useComments(videoId: Ref<string>) {
  const commentStore = useCommentStore()
  const { fetchComments, setCommentOrder } = commentStore
  const { commentState } = storeToRefs(commentStore)

  const status = computed(() => commentState.value.comments[videoId.value]?.status)
  const error = computed(() => commentState.value.comments[videoId.value]?.error)
  const order = computed(() => commentState.value.comments[videoId.value]?.order || 'relevance')
  const nextPageToken = computed(
    () => commentState.value.comments[videoId.value]?.data[order.value]?.nextPageToken,
  )
  const hasMore = computed(
    () => !!commentState.value.comments[videoId.value]?.data[order.value]?.nextPageToken,
  )
  const comments = computed(
    () => commentState.value.comments[videoId.value]?.data[order.value]?.items || [],
  )

  const setOrder = (order: CommentOrder) => {
    setCommentOrder(videoId.value, order)
  }

  const fetchMore = async () => {
    if (!nextPageToken.value) return
    await fetchComments(videoId.value, order.value, nextPageToken.value)
  }

  onMounted(() => {
    if (comments.value.length === 0) {
      fetchComments(videoId.value, order.value)
    }
  })

  watch(order, (newValue) => {
    if (comments.value.length === 0) {
      fetchComments(videoId.value, newValue)
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
