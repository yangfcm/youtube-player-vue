import { type AxiosResponse } from 'axios'
import { appAxios } from '@/settings/api'
import {
  MAX_RESULTS_24,
  PART_SNIPPET,
  PART_SNIPPET_CONTENT_STATUS,
  PART_SNIPPET_STATS,
} from '@/settings/constants'
import {
  type PlayListsRespone,
  type SubscriptionsResponse,
  type VideoResponse,
  type VideosResponse,
} from './types'

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
  token: string,
  options?: Record<string, string>,
): Promise<AxiosResponse<SubscriptionsResponse>> => {
  return await appAxios.get('/subscriptions', {
    params: {
      part: PART_SNIPPET,
      mine: 'true',
      order: 'alphabetical',
      maxResults: MAX_RESULTS_24 * 2,
      ...options,
    },
    headers: {
      Authorization: token,
    },
  })
}

export const fetchPlayListsAPI = async (
  token: string,
  options?: Record<string, string>,
): Promise<AxiosResponse<PlayListsRespone>> => {
  return await appAxios.get('/playlists', {
    params: {
      part: PART_SNIPPET_CONTENT_STATUS,
      mine: 'true',
      maxResults: MAX_RESULTS_24 * 2,
      ...options,
    },
    headers: {
      Authorization: token,
    },
  })
}
