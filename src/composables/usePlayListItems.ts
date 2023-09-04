import { onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { usePlayListItemsStore } from '@/stores/playListItems'

export function usePlayListItems(playListId: string) {
  const playListItemsStore = usePlayListItemsStore()
  const { fetchPlayListItems } = playListItemsStore
  const { playListItemsState } = storeToRefs(playListItemsStore)

  const status = computed(() => playListItemsState.value.status)
  const error = computed(() => playListItemsState.value.error)
  const nextPageToken = computed(
    () => playListItemsState.value.playLists[playListId]?.nextPageToken,
  )
  const hasMore = computed(() => !!playListItemsState.value.playLists[playListId]?.nextPageToken)
  const playListItems = computed(() => playListItemsState.value.playLists[playListId]?.items || [])

  const fetchMore = async () => {
    if (!nextPageToken.value) return
    await fetchPlayListItems(playListId, nextPageToken.value)
  }

  onMounted(() => {
    if (playListId && playListItems.value.length === 0) {
      fetchPlayListItems(playListId)
    }
  })

  return {
    playListItems,
    status,
    error,
    hasMore,
    fetchMore,
  }
}
