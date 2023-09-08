import { onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useChannelStore } from '@/stores/channel'

export function useChannelPlayLists(channelId: string) {
  const channelStore = useChannelStore()
  const { fetchChannelPlayLists } = channelStore
  const { channelState } = storeToRefs(channelStore)

  const status = computed(() => channelState.value.playlists.status)
  const error = computed(() => channelState.value.playlists.error)
  const playlists = computed(() => channelState.value.playlists.data[channelId]?.items || [])
  const nextPageToken = computed(() => channelState.value.playlists.data[channelId]?.nextPageToken)
  const hasMore = computed(() => !!channelState.value.playlists.data[channelId]?.nextPageToken)

  const fetchMore = async () => {
    if (!nextPageToken.value) return
    await fetchChannelPlayLists(channelId, nextPageToken.value)
  }

  onMounted(() => {
    if (playlists.value.length === 0) {
      fetchChannelPlayLists(channelId)
    }
  })

  return {
    playlists,
    status,
    error,
    hasMore,
    fetchMore,
  }
}
