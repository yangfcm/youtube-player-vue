import { onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useChannelStore } from '@/stores/channel'

export function useChanneProfile(channelId: string) {
  const channelStore = useChannelStore()
  const { fetchChannelProfile } = channelStore
  const { channelState } = storeToRefs(channelStore)

  const status = computed(() => channelState.value.profile.status)
  const error = computed(() => channelState.value.profile.error)
  const channelProfile = computed(() => channelState.value.profile.data[channelId])

  onMounted(() => {
    fetchChannelProfile(channelId)
  })

  return {
    status,
    error,
    channelProfile,
  }
}
