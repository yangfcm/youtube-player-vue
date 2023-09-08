import { ref } from 'vue'
import { defineStore } from 'pinia'
import { AsyncStatus } from '@/settings/types'
import { fetchChannelProfileAPI, fetchChannelVideosAPI, fetchChannelPlayListsAPI } from './api'
import type { ChannelDetails, PlayListsRespone, VideosResponse } from './types'

type ChannelStore = {
  profile: {
    status: AsyncStatus
    error: string
    data: Record<string, ChannelDetails>
  }
  videos: {
    status: AsyncStatus
    error: string
    data: Record<string, VideosResponse>
  }
  playlists: {
    status: AsyncStatus
    error: string
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
  const fetchChannelVideos = async (channelId: string, pageToken?: string) => {
    try {
      channel.value.videos.status = AsyncStatus.LOADING
      channel.value.videos.error = ''
      const options: Record<string, string> = {}
      if (pageToken) options.pageToken = pageToken
      const response = await fetchChannelVideosAPI(channelId, options)
      const currentItems = channel.value.videos.data[channelId]?.items || []
      channel.value.videos.data[channelId] = {
        ...response.data,
        items: [...currentItems, ...response.data.items],
      }
      channel.value.videos.status = AsyncStatus.SUCCESS
    } catch (err: any) {
      channel.value.videos.status = AsyncStatus.FAIL
      channel.value.videos.error = err.message
    }
  }
  const fetchChannelPlayLists = async (channelId: string, pageToken?: string) => {
    try {
      channel.value.playlists.status = AsyncStatus.LOADING
      channel.value.playlists.error = ''
      const options: Record<string, string> = {}
      if (pageToken) options.pageToken = pageToken
      const response = await fetchChannelPlayListsAPI(channelId, options)
      const currentItems = channel.value.playlists.data[channelId]?.items || []
      channel.value.playlists.data[channelId] = {
        ...response.data,
        items: [...currentItems, ...response.data.items],
      }
      channel.value.playlists.status = AsyncStatus.SUCCESS
    } catch (err: any) {
      channel.value.playlists.status = AsyncStatus.FAIL
      channel.value.playlists.error = err.message
    }
  }

  return {
    channelState: channel,
    fetchChannelProfile,
    fetchChannelVideos,
    fetchChannelPlayLists,
  }
})
