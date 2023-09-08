import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useCommentStore } from '@/stores/comment'

export function usePostComment(videoId: string) {
  const commentStore = useCommentStore()
  const { postVideoComment: postVideoCommentAction, resetPostStatus } = commentStore
  const { commentState } = storeToRefs(commentStore)
  const status = computed(() => commentState.value.postStatus)
  const error = computed(() => commentState.value.postError)
  const postVideoComment = async (comment: string) => {
    await postVideoCommentAction(videoId, comment)
  }

  return { postVideoComment, status, error, reset: resetPostStatus }
}
