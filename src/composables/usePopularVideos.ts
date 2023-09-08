import { onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { usePopularVideosStore } from '@/stores/popularVideos'

export function usePopularVideos() {
  const popularVideosStore = usePopularVideosStore()
  const { fetchPopularVideos } = popularVideosStore
  const { popularVideosState } = storeToRefs(popularVideosStore)

  const status = computed(() => popularVideosState.value.status)
  const error = computed(() => popularVideosState.value.error)
  const nextPageToken = computed(() => popularVideosState.value.videos?.nextPageToken)
  const hasMore = computed(() => !!popularVideosState.value.videos?.nextPageToken)
  const videos = computed(() => popularVideosState.value.videos?.items || [])

  const fetchMore = async () => {
    if (!nextPageToken.value) return
    await fetchPopularVideos(nextPageToken.value)
  }

  onMounted(() => {
    if (videos.value.length === 0) {
      fetchPopularVideos()
    }
  })

  return {
    videos,
    status,
    error,
    hasMore,
    fetchMore,
  }
}
