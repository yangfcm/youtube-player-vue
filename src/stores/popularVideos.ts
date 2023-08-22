import { ref, computed } from 'vue'
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

  const status = computed(() => popularVideos.value.status)
  const error = computed(() => popularVideos.value.error)
  const videos = computed(() => popularVideos.value.videos)
  const hasMore = computed(() => !!popularVideos.value.videos?.nextPageToken)

  const fetchPopularVideos = async (pageToken?: string) => {
    try {
      popularVideos.value.status = AsyncStatus.LOADING
      const options: Record<string, string> = {
        chart: 'mostPopular',
      }
      if (pageToken) options.pageToken = pageToken
      const response: AxiosResponse<VideosResponse> = await fetchVideosAPI(options)

      popularVideos.value.videos = response.data
      popularVideos.value.error = ''
      popularVideos.value.status = AsyncStatus.SUCCESS
    } catch (err: any) {
      popularVideos.value.status = AsyncStatus.FAIL
      popularVideos.value.error = err.message
    }
  }

  return {
    videos,
    status,
    error,
    hasMore,
    fetchPopularVideos,
  }
})
