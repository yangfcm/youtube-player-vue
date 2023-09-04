import { onMounted, computed, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'

export function useSubscriptions() {
  const authStore = useAuthStore()
  const { fetchSubscriptions } = authStore
  const { authState, isSignedIn } = storeToRefs(authStore)

  const status = computed(() => authState.value.subscriptions.status)
  const error = computed(() => authState.value.subscriptions.error)
  const subscriptions = computed(() => authState.value.subscriptions.data?.items || [])
  const nextPageToken = computed(() => authState.value.subscriptions.data?.nextPageToken)
  const hasMore = computed(() => !!authState.value.subscriptions.data?.nextPageToken)

  const fetchMore = async () => {
    if (!nextPageToken.value) return
    await fetchSubscriptions(nextPageToken.value)
  }

  watch(isSignedIn, (newData, oldData) => {
    if (newData && !oldData) {
      fetchSubscriptions()
    }
  })

  onMounted(() => {
    if (isSignedIn && subscriptions.value.length === 0) {
      fetchSubscriptions()
    }
  })

  return {
    subscriptions,
    status,
    error,
    hasMore,
    fetchMore,
  }
}
