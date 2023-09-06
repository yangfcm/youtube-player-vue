import { ref } from 'vue'
import { defineStore } from 'pinia'
import { AsyncStatus } from '@/settings/types'
import { fetchChannelProfileAPI, fetchChannelVideosAPI, fetchChannelPlayListsAPI } from './api'
import type { AxiosResponse } from 'axios'
import type { ChannelDetails, PlayListsRespone, VideosResponse } from './types'

type ChannelStore = {
  profile: {
    status: AsyncStatus
    error: ''
    data: Record<string, ChannelDetails>
  }
  videos: {
    status: AsyncStatus
    error: ''
    data: Record<string, VideosResponse>
  }
  playlists: {
    status: AsyncStatus
    error: ''
    data: Record<string, PlayListsRespone>
  }
}

export const useChannelStore = defineStore('channel', () => {
  const channel = ref<ChannelStore>({
    profile: {
      status: AsyncStatus.IDLE,
      error: '',
      data: {},
    },
    videos: {
      status: AsyncStatus.IDLE,
      error: '',
      data: {},
    },
    playlists: {
      status: AsyncStatus.IDLE,
      error: '',
      data: {},
    },
  })

  const fetchChannelProfile = async (channelId: string) => {
    try {
      channel.value.profile.status = AsyncStatus.LOADING
      channel.value.profile.error = ''
      const response = await fetchChannelProfileAPI(channelId)
      channel.value.profile.status = AsyncStatus.SUCCESS
      channel.value.profile.data[channelId] = response.data.items[0]
    } catch (err: any) {
      channel.value.profile.status = AsyncStatus.FAIL
      channel.value.profile.error = err.message
    }
  }
  const fetchChannelVideos = async (channelId: string, pageToken?: string) => {}
  const fetchChannelPlayLists = async (channelId: string, pageToken?: string) => {}

  return {
    channelState: channel,
    fetchChannelProfile,
    fetchChannelVideos,
    fetchChannelPlayLists,
  }
})
