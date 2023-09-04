import { onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useVideoStore } from '@/stores/video'

export function useVideo(videoId: string) {
  const videoStore = useVideoStore()
  const { fetchVideo } = videoStore
  const { videoState } = storeToRefs(videoStore)

  const status = computed(() => videoState.value.status)
  const error = computed(() => videoState.value.error)
  const video = computed(() => videoState.value.video[videoId])

  onMounted(() => {
    if (!video.value && videoId) {
      fetchVideo(videoId)
    }
  })

  return {
    status,
    error,
    video,
  }
}
