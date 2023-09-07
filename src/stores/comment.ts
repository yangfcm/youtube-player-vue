import { ref } from 'vue'
import { defineStore } from 'pinia'
import { AsyncStatus } from '@/settings/types'
import type { CommentOrder, CommentResponse, ReplyResponse } from './types'
import { fetchCommentsAPI } from './api'
import { COMMENTS_TURNED_OFF_MESSAGE } from '@/settings/constants'

type CommentStore = {
  comments: Record<
    string,
    {
      status: AsyncStatus
      error: string
      data: {
        relevance?: CommentResponse
        time?: CommentResponse
      }
      order: CommentOrder
    }
  >
  replies: Record<
    string,
    {
      status: AsyncStatus
      error: string
      data?: ReplyResponse
    }
  >
  postStatus: AsyncStatus
  postError: string
}

export const useCommentStore = defineStore('comment', () => {
  const comment = ref<CommentStore>({
    comments: {},
    replies: {},
    postStatus: AsyncStatus.IDLE,
    postError: '',
  })

  const fetchComments = async (
    videoId: string,
    order: CommentOrder = 'relevance',
    pageToken?: string,
  ) => {
    if (!comment.value.comments[videoId]) {
      comment.value.comments[videoId] = {
        status: AsyncStatus.LOADING,
        error: '',
        data: {
          [order]: undefined,
        },
        order,
      }
    }
    try {
      comment.value.comments[videoId].status = AsyncStatus.LOADING
      comment.value.comments[videoId].error = ''
      const options: Record<string, string> = {}
      if (order) options.order = order
      if (pageToken) options.pageToken = pageToken
      const response = await fetchCommentsAPI(videoId, options)
      const currentItems = comment.value.comments[videoId]?.data[order]?.items || []
      comment.value.comments[videoId].status = AsyncStatus.SUCCESS
      comment.value.comments[videoId].data[order] = {
        ...response.data,
        items: [...currentItems, ...response.data.items],
      }
    } catch (err: any) {
      comment.value.comments[videoId].status = AsyncStatus.FAIL
      if (err.message?.includes('disabled comments')) {
        comment.value.comments[videoId].error = COMMENTS_TURNED_OFF_MESSAGE
        comment.value.comments[videoId].data[order] = undefined
      } else {
        comment.value.comments[videoId].error = err.message
      }
    }
  }

  const fetchReplies = async () => {}

  const postVideoComment = async () => {}

  return {
    commentState: comment,
    fetchComments,
  }
})
