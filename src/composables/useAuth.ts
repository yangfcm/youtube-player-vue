import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'

export function useAuth() {
  const authStore = useAuthStore()
  const { fetchUserByToken, signout } = authStore
  const { authState } = storeToRefs(authStore)

  const status = computed(() => authState.value.status)
  const user = computed(() => authState.value.user)
  const isSignedIn = computed(() => !!authState.value.user)

  return {
    status,
    user,
    isSignedIn,
    fetchUserByToken,
    signout,
  }
}
