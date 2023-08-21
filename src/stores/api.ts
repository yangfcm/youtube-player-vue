import { type AxiosResponse } from 'axios'
import { appAxios } from '@/settings/api'
import { MAX_RESULTS_24, PART_SNIPPET_STATS } from '@/settings/constants'
import { type VideoResponse, type VideosResponse } from './types'

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
