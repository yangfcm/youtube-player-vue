import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { type AxiosResponse } from 'axios'
import { AsyncStatus } from '@/settings/types'
import { gAuthAxios } from '@/settings/api'
import type { PlayListsRespone, SubscriptionsResponse } from './types'
import { fetchSubscriptionsAPI, fetchPlayListsAPI } from './api'

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
  subscriptions: {
    status: AsyncStatus
    error: string
    data?: SubscriptionsResponse
    subscriptionIds: Record<string, string>
  }
  playlists: {
    status: AsyncStatus
    error: string
    data?: PlayListsRespone
  }
}

export const useAuthStore = defineStore('auth', () => {
  const auth = ref<Auth>({
    user: null,
    status: AsyncStatus.IDLE,
    subscriptions: {
      status: AsyncStatus.IDLE,
      error: '',
      subscriptionIds: {},
    },
    playlists: {
      status: AsyncStatus.IDLE,
      error: '',
    },
  })

  // function signin(authData: Auth) {
  //   auth.value = authData
  // }

  function signout() {
    auth.value.user = null
    auth.value.status = AsyncStatus.IDLE
    auth.value.subscriptions = {
      status: AsyncStatus.IDLE,
      error: '',
      subscriptionIds: {},
    }
    auth.value.playlists = {
      status: AsyncStatus.IDLE,
      error: '',
    }
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

  const subscriptions = computed(() => {
    return auth.value.subscriptions
  })

  const playlists = computed(() => {
    return auth.value.playlists
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

  const fetchSubscriptions = async (pageToken?: string) => {
    try {
      auth.value.subscriptions.status = AsyncStatus.LOADING
      auth.value.subscriptions.error = ''
      const options: Record<string, string> = {}
      if (pageToken) options.pageToken = pageToken
      const response = await fetchSubscriptionsAPI(options)
      const currentItems = auth.value.subscriptions.data?.items || []
      auth.value.subscriptions.status = AsyncStatus.SUCCESS
      auth.value.subscriptions.data = {
        ...response.data,
        items: [...currentItems, ...response.data.items],
      }
      response.data.items.forEach(
        (item) =>
          (auth.value.subscriptions.subscriptionIds[item.snippet.resourceId.channelId] = item.id),
      )
    } catch (err: any) {
      auth.value.subscriptions.status = AsyncStatus.FAIL
      auth.value.subscriptions.error = err.message
    }
  }

  const fetchPlayLists = async (pageToken?: string) => {
    try {
      auth.value.playlists.status = AsyncStatus.LOADING
      auth.value.playlists.error = ''
      const options: Record<string, string> = {}
      if (pageToken) options.pageToken = pageToken
      const response = await fetchPlayListsAPI(options)
      const currentItems = auth.value.playlists.data?.items || []
      auth.value.playlists.status = AsyncStatus.SUCCESS
      auth.value.playlists.data = {
        ...response.data,
        items: [...currentItems, ...response.data.items],
      }
    } catch (err: any) {
      auth.value.playlists.status = AsyncStatus.FAIL
      auth.value.playlists.error = err.message
    }
  }

  return {
    status,
    user,
    isSignedIn,
    subscriptions,
    playlists,
    // signin,
    signout,
    fetchUserByToken,
    fetchSubscriptions,
    fetchPlayLists,
    authState: auth,
  }
})
