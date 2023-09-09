import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { type AxiosResponse } from 'axios'
import { AsyncStatus } from '@/settings/types'
import { gAuthAxios } from '@/settings/api'
import { UNSUBSCRIBED } from '@/settings/constants'
import type { PlayListsRespone, SubscriptionsResponse } from './types'
import {
  fetchSubscriptionsAPI,
  fetchPlayListsAPI,
  subscribeChannelAPI,
  unsubscribeChannelAPI,
} from './api'

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
  }
  playlists: {
    status: AsyncStatus
    error: string
    data?: PlayListsRespone
  }
  subscriptionIds: Record<
    string, // Channel id stirng
    {
      status: AsyncStatus
      error: string
      data: string // The subscription id for the channel id.
    }
  >
}

export const useAuthStore = defineStore('auth', () => {
  const auth = ref<Auth>({
    user: null,
    status: AsyncStatus.IDLE,
    subscriptions: {
      status: AsyncStatus.IDLE,
      error: '',
    },
    playlists: {
      status: AsyncStatus.IDLE,
      error: '',
    },
    subscriptionIds: {},
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
    }
    auth.value.playlists = {
      status: AsyncStatus.IDLE,
      error: '',
    }
    auth.value.subscriptionIds = {}
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
        // Populate subscription ids.
        (item) =>
          (auth.value.subscriptionIds[item.snippet.resourceId.channelId] = {
            status: AsyncStatus.IDLE,
            error: '',
            data: item.id,
          }),
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

  const subscribeChannel = async (channelId: string) => {
    if (!auth.value.subscriptionIds[channelId]) {
      auth.value.subscriptionIds[channelId] = {
        status: AsyncStatus.IDLE,
        error: '',
        data: UNSUBSCRIBED,
      }
    }
    try {
      auth.value.subscriptionIds[channelId].status = AsyncStatus.LOADING
      auth.value.subscriptionIds[channelId].error = ''
      const response = await subscribeChannelAPI(channelId)

      auth.value.subscriptionIds[channelId].status = AsyncStatus.SUCCESS
      auth.value.subscriptionIds[channelId].data = response.data.id
      const currentItems = auth.value.subscriptions.data?.items
      if (currentItems && auth.value.subscriptions.data) {
        auth.value.subscriptions.data.items = [response.data, ...currentItems]
      }
    } catch (err: any) {
      auth.value.subscriptionIds[channelId].status = AsyncStatus.FAIL
      auth.value.subscriptionIds[channelId].error = err.message
    }
  }

  const unsubscribeChannel = async (channelId: string) => {
    try {
      const subscriptionId = auth.value.subscriptionIds[channelId]?.data
      if (!subscriptionId) throw new Error("You haven't subscribed the channel.")
      auth.value.subscriptionIds[channelId].status = AsyncStatus.LOADING
      auth.value.subscriptionIds[channelId].error = ''
      await unsubscribeChannelAPI(subscriptionId)

      auth.value.subscriptionIds[channelId].data = UNSUBSCRIBED
      auth.value.subscriptionIds[channelId].status = AsyncStatus.SUCCESS
      if (auth.value.subscriptions.data) {
        auth.value.subscriptions.data.items = auth.value.subscriptions.data.items.filter(
          (item) => item.snippet.resourceId.channelId !== channelId,
        )
      }
    } catch (err: any) {
      auth.value.subscriptionIds[channelId].status = AsyncStatus.FAIL
      auth.value.subscriptionIds[channelId].error = err.message
    }
  }

  return {
    status,
    user,
    isSignedIn,
    signout,
    fetchUserByToken,
    fetchSubscriptions,
    fetchPlayLists,
    subscribeChannel,
    unsubscribeChannel,
    authState: auth,
  }
})
