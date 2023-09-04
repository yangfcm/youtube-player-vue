import { onMounted, computed, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'

export function usePlayLists() {
  const authStore = useAuthStore()
  const { fetchPlayLists } = authStore
  const { authState, isSignedIn } = storeToRefs(authStore)

  const status = computed(() => authState.value.playlists.status)
  const error = computed(() => authState.value.playlists.error)
  const playlists = computed(() => authState.value.playlists.data?.items || [])
  const nextPageToken = computed(() => authState.value.playlists.data?.nextPageToken)
  const hasMore = computed(() => !!authState.value.playlists.data?.nextPageToken)

  const fetchMore = async () => {
    if (!nextPageToken.value) return
    await fetchPlayLists(nextPageToken.value)
  }

  watch(isSignedIn, (newData, oldData) => {
    if (newData && !oldData) {
      fetchPlayLists()
    }
  })

  onMounted(() => {
    if (isSignedIn && playlists.value.length === 0) {
      fetchPlayLists()
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
