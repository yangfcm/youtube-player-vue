import { onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useChannelStore } from '@/stores/channel'

export function useChannelVideos(channelId: string) {
  const channelStore = useChannelStore()
  const { fetchChannelVideos } = channelStore
  const { channelState } = storeToRefs(channelStore)

  const status = computed(() => channelState.value.videos.status)
  const error = computed(() => channelState.value.videos.error)
  const videos = computed(() => channelState.value.videos.data[channelId]?.items || [])
  const nextPageToken = computed(() => channelState.value.videos.data[channelId]?.nextPageToken)
  const hasMore = computed(() => !!channelState.value.videos.data[channelId]?.nextPageToken)

  const fetchMore = async () => {
    if (!nextPageToken.value) return
    await fetchChannelVideos(channelId, nextPageToken.value)
  }

  onMounted(() => {
    if (videos.value.length === 0) {
      fetchChannelVideos(channelId)
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
