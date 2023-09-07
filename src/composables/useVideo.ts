import { onMounted, computed, watch, type Ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useVideoStore } from '@/stores/video'

export function useVideo(videoId: Ref<string>) {
  const videoStore = useVideoStore()
  const { fetchVideo } = videoStore
  const { videoState } = storeToRefs(videoStore)

  const status = computed(() => videoState.value.status)
  const error = computed(() => videoState.value.error)
  const video = computed(() => videoState.value.video[videoId.value])

  onMounted(() => {
    if (!video.value && videoId.value) {
      fetchVideo(videoId.value)
    }
  })

  watch(videoId, (newValue, oldValue) => {
    if (!video.value && newValue !== oldValue) {
      fetchVideo(newValue)
    }
  })

  return {
    status,
    error,
    video,
  }
}
