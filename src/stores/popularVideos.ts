import { ref } from 'vue'
import { defineStore } from 'pinia'
import { AsyncStatus } from '@/settings/types'
import { type VideosResponse } from './types'
import { fetchVideosAPI } from './api'
import type { AxiosResponse } from 'axios'

type PopularVideosStore = {
  error: string
  status: AsyncStatus
  videos?: VideosResponse
}

export const usePopularVideosStore = defineStore('popularVideos', () => {
  const popularVideos = ref<PopularVideosStore>({
    error: '',
    status: AsyncStatus.IDLE,
  })

  const fetchPopularVideos = async (pageToken?: string) => {
    try {
      popularVideos.value.status = AsyncStatus.LOADING
      popularVideos.value.error = ''
      const options: Record<string, string> = {
        chart: 'mostPopular',
      }
      if (pageToken) options.pageToken = pageToken
      const response: AxiosResponse<VideosResponse> = await fetchVideosAPI(options)

      const currentItems = popularVideos.value.videos?.items || []
      popularVideos.value.videos = {
        ...response.data,
        items: [...currentItems, ...response.data.items],
      }
      popularVideos.value.status = AsyncStatus.SUCCESS
    } catch (err: any) {
      popularVideos.value.status = AsyncStatus.FAIL
      popularVideos.value.error = err.message
    }
  }

  return {
    fetchPopularVideos,
    popularVideosState: popularVideos,
  }
})
