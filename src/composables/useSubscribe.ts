import { onMounted, computed, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { UNSUBSCRIBED } from '@/settings/constants'

export function useSubscribe(channelId: string) {
  const authStore = useAuthStore()
  const {
    subscribeChannel: subscribeChannelAction,
    unsubscribeChannel: unsubscribeChannelAction,
    fetchChannelSubscription: fetchChannelSubscriptionAction,
  } = authStore
  const { authState } = storeToRefs(authStore)

  const status = computed(() => authState.value.subscriptionIds[channelId]?.status)
  const error = computed(() => authState.value.subscriptionIds[channelId]?.error)
  const subscriptionId = computed(() => authState.value.subscriptionIds[channelId]?.data)
  const subscribed = computed(() => {
    if (subscriptionId.value === undefined) return undefined
    return subscriptionId.value !== UNSUBSCRIBED
  })
  const isSignedIn = computed(() => !!authState.value.user)

  const subscribeChannel = async () => {
    if (isSignedIn.value) {
      await subscribeChannelAction(channelId)
    }
  }

  const unsubscribeChannel = async () => {
    if (isSignedIn.value) {
      await unsubscribeChannelAction(channelId)
    }
  }

  const fetchChannelSubscription = async () => {
    if (isSignedIn.value) {
      await fetchChannelSubscriptionAction(channelId)
    }
  }

  onMounted(() => {
    if (!subscriptionId.value && isSignedIn) {
      fetchChannelSubscription()
    }
  })

  watch(isSignedIn, (newValue) => {
    if (newValue) {
      fetchChannelSubscription()
    }
  })

  return {
    status,
    error,
    subscriptionId,
    subscribed,
    subscribeChannel,
    unsubscribeChannel,
    fetchChannelSubscription,
  }
}
