import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'

export function useSubscribe(channelId: string) {
  const authStore = useAuthStore()
  const {
    subscribeChannel: subscribeChannelAction,
    unsubscribeChannel: unsubscribeChannelAction,
    fetchChannelSubscription: fetchChannelSubscriptionAction,
  } = authStore
  const { authState } = storeToRefs(authStore)

  const status = computed(() => authState.value.subscriptionIds[channelId].status)
  const error = computed(() => authState.value.subscriptionIds[channelId].error)
  const subscriptionId = computed(() => authState.value.subscriptionIds[channelId].data)

  const subscribeChannel = async () => {
    await subscribeChannelAction(channelId)
  }

  const unsubscribeChannel = async () => {
    await unsubscribeChannelAction(channelId)
  }

  const fetchChannelSubscription = async () => {
    await fetchChannelSubscriptionAction(channelId)
  }

  return {
    status,
    error,
    subscriptionId,
    subscribeChannel,
    unsubscribeChannel,
    fetchChannelSubscription,
  }
}
