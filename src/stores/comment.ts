import { ref } from 'vue'
import { defineStore } from 'pinia'
import { AsyncStatus } from '@/settings/types'
import type { CommentOrder, CommentResponse, ReplyResponse } from './types'
import { fetchCommentsAPI, postVideoCommentAPI } from './api'
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

  const setCommentOrder = (videoId: string, order: CommentOrder) => {
    if (comment.value.comments[videoId]) {
      comment.value.comments[videoId].order = order
    }
  }

  const resetPostStatus = () => {
    comment.value.postError = ''
    comment.value.postStatus = AsyncStatus.IDLE
  }

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

  const postVideoComment = async (videoId: string, commentText: string) => {
    try {
      comment.value.postStatus = AsyncStatus.LOADING
      comment.value.postError = ''
      const response = await postVideoCommentAPI(videoId, commentText)
      const order = comment.value.comments[videoId].order || 'relevance'
      const currentItems = comment.value.comments[videoId].data[order]?.items || []
      comment.value.postStatus = AsyncStatus.SUCCESS
      if (comment.value.comments[videoId].data[order]) {
        comment.value.comments[videoId].data[order]!.items = [response.data, ...currentItems]
      }
    } catch (err: any) {
      comment.value.postStatus = AsyncStatus.FAIL
      comment.value.postError = err.message
    }
  }

  return {
    commentState: comment,
    setCommentOrder,
    fetchComments,
    postVideoComment,
    resetPostStatus,
  }
})
