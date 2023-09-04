import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { AsyncStatus } from '@/settings/types'
import { type VideoMetaSnippetStats, type VideoResponse } from './types'
import { fetchVideoAPI } from './api'
import { type AxiosResponse } from 'axios'

type VideoStore = {
  error: string
  status: AsyncStatus
  video: Record<string, VideoMetaSnippetStats>
}

export const useVideoStore = defineStore('video', () => {
  const videoStore = ref<VideoStore>({
    error: '',
    status: AsyncStatus.IDLE,
    video: {},
  })

  const status = computed(() => videoStore.value.status)
  const error = computed(() => videoStore.value.error)
  const video = computed(() => videoStore.value.video || {})

  const fetchVideo = async (videoId: string) => {
    try {
      videoStore.value.status = AsyncStatus.LOADING
      videoStore.value.error = ''
      const response: AxiosResponse<VideoResponse> = await fetchVideoAPI(videoId)
      const video = response.data.items[0]
      if (video) {
        videoStore.value.video = {
          ...(videoStore.value.video || {}),
          [video.id as string]: video,
        }
      }
      videoStore.value.status = AsyncStatus.SUCCESS
    } catch (err: any) {
      videoStore.value.status = AsyncStatus.FAIL
      videoStore.value.error = err.message
    }
  }

  return {
    videoState: videoStore,
    video,
    status,
    error,
    fetchVideo,
  }
})
