import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { type AxiosResponse } from 'axios'
import { AsyncStatus } from '@/settings/types'
import { gAuthAxios } from '@/settings/api'

type UserInfoResponse = {
  email: string
  email_verified: boolean
  family_name: string
  given_name: string
  locale: string
  name: string
  picture: string
  sub: string
}

type Auth = {
  user: UserInfoResponse | null
  status: AsyncStatus
}

export const useAuthStore = defineStore('auth', () => {
  const auth = ref<Auth>({
    user: null,
    status: AsyncStatus.IDLE,
  })

  // function signin(authData: Auth) {
  //   auth.value = authData
  // }

  function signout() {
    auth.value.user = null
    auth.value.status = AsyncStatus.IDLE
  }

  const status = computed(() => {
    return auth.value.status
  })

  const user = computed(() => {
    return auth.value.user
  })

  const isSignedIn = computed(() => {
    if (!auth.value.user) return false
    return true
  })

  const fetchUserByToken = async (token: string) => {
    try {
      auth.value.status = AsyncStatus.LOADING
      const response: AxiosResponse<UserInfoResponse> = await gAuthAxios.get('/', {
        params: {
          access_token: token,
        },
      })
      auth.value.user = response.data
      auth.value.status = AsyncStatus.SUCCESS
    } catch {
      signout()
    }
  }

  return {
    status,
    user,
    isSignedIn,
    // signin,
    signout,
    fetchUserByToken,
  }
})
