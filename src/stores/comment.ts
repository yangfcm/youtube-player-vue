import { ref } from 'vue'
import { defineStore } from 'pinia'
import { AsyncStatus } from '@/settings/types'
import type { CommentOrder, CommentResponse, ReplyResponse } from './types'

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

export const useCommentStore = defineStore('comment', () => {})
