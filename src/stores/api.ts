import { type AxiosResponse } from 'axios'
import { appAxios } from '@/settings/api'
import {
  MAX_RESULTS_15,
  MAX_RESULTS_24,
  PART_SNIPPET,
  PART_SNIPPET_CONTENT_STATUS,
  PART_SNIPPET_STATS,
  PART_SNIPPET_STATS_BRANDING,
} from '@/settings/constants'
import {
  type ChannelDetailsResponse,
  type CommentResponse,
  type PlayListItemsResponse,
  type PlayListsRespone,
  type ReplyResponse,
  type SearchResultsResponse,
  type SubscriptionsResponse,
  type VideoCommentRequestBody,
  type VideoResponse,
  type VideosResponse,
} from './types'
import { bearify } from '@/settings/utils'

export const fetchVideosAPI = async (
  options: Record<string, string>,
): Promise<AxiosResponse<VideosResponse>> => {
  return await appAxios.get('/videos', {
    params: {
      part: PART_SNIPPET_STATS,
      maxResults: MAX_RESULTS_24 / 2,
      ...options,
    },
  })
}

export const fetchVideoAPI = async (videoId: string): Promise<AxiosResponse<VideoResponse>> => {
  return await appAxios.get('/videos', {
    params: {
      part: PART_SNIPPET_STATS,
      id: videoId,
    },
  })
}

export const fetchSubscriptionsAPI = async (
  options?: Record<string, string>,
): Promise<AxiosResponse<SubscriptionsResponse>> => {
  const token = localStorage.getItem('token')
  if (!token) throw new Error('User is not logged in')
  return await appAxios.get('/subscriptions', {
    params: {
      part: PART_SNIPPET,
      mine: 'true',
      order: 'alphabetical',
      maxResults: MAX_RESULTS_24 * 2,
      ...options,
    },
    headers: {
      Authorization: bearify(token),
    },
  })
}

export const fetchPlayListsAPI = async (
  options?: Record<string, string>,
): Promise<AxiosResponse<PlayListsRespone>> => {
  const token = localStorage.getItem('token')
  if (!token) throw new Error('User is not logged in')
  return await appAxios.get('/playlists', {
    params: {
      part: PART_SNIPPET_CONTENT_STATUS,
      mine: 'true',
      maxResults: MAX_RESULTS_24 * 2,
      ...options,
    },
    headers: {
      Authorization: bearify(token),
    },
  })
}

export const fetchChannelProfileAPI = async (
  channelId: string,
): Promise<AxiosResponse<ChannelDetailsResponse>> => {
  return await appAxios.get('/channels', {
    params: {
      id: channelId,
      part: PART_SNIPPET_STATS_BRANDING,
    },
  })
}

export const fetchChannelVideosAPI = async (
  channelId: string,
  options: Record<string, string>,
): Promise<AxiosResponse<VideosResponse>> => {
  return await appAxios.get('/search', {
    params: {
      channelId,
      part: PART_SNIPPET,
      order: 'date',
      type: 'video',
      maxResults: MAX_RESULTS_24,
      ...options,
    },
  })
}

export const fetchChannelPlayListsAPI = async (
  channelId: string,
  options: Record<string, string>,
): Promise<AxiosResponse<PlayListsRespone>> => {
  return await appAxios.get('/playlists', {
    params: {
      channelId,
      maxResults: MAX_RESULTS_24,
      part: PART_SNIPPET_CONTENT_STATUS,
      ...options,
    },
  })
}

export const fetchPlayListItemsAPI = async (
  playlistId: string,
  options: Record<string, string>,
): Promise<AxiosResponse<PlayListItemsResponse>> => {
  return await appAxios.get('/playlistItems', {
    params: {
      playlistId,
      part: PART_SNIPPET_CONTENT_STATUS,
      maxResults: MAX_RESULTS_15 * 2,
      ...options,
    },
  })
}

export const fetchSearchResultsAPI = async (
  keyword: string,
  options: Record<string, string>,
): Promise<AxiosResponse<SearchResultsResponse>> => {
  return await appAxios.get('/search', {
    params: {
      part: PART_SNIPPET,
      maxResults: MAX_RESULTS_15,
      q: keyword,
      ...options,
    },
  })
}

export const fetchCommentsAPI = async (
  videoId: string,
  options: Record<string, string>,
): Promise<AxiosResponse<CommentResponse>> => {
  return await appAxios.get('/commentThreads', {
    params: {
      part: PART_SNIPPET,
      maxResults: MAX_RESULTS_15,
      order: 'relevance',
      ...options,
      videoId,
    },
  })
}

export const fetchRepliesAPI = async (
  commentId: string,
  options: Record<string, string>,
): Promise<AxiosResponse<ReplyResponse>> => {
  return await appAxios.get('/comments', {
    params: {
      part: PART_SNIPPET,
      maxResults: MAX_RESULTS_15,
      ...options,
      parentId: commentId,
    },
  })
}

export const postVideoCommentAPI = async (videoId: string, comment: string) => {
  const token = localStorage.getItem('token')
  if (!token) throw new Error('User is not logged in')

  const requestBody: VideoCommentRequestBody = {
    snippet: {
      videoId,
      topLevelComment: {
        snippet: {
          textOriginal: comment,
        },
      },
    },
  }

  return await appAxios.post('/commentThreads', requestBody, {
    params: {
      part: PART_SNIPPET,
    },
    headers: {
      Authorization: bearify(token),
    },
  })
}
