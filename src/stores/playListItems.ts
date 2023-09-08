import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { AxiosResponse } from 'axios'
import { AsyncStatus } from '@/settings/types'
import { fetchPlayListItemsAPI } from './api'
import type { PlayListItemsResponse } from './types'

type PlayListItemsStore = {
  error: string
  status: AsyncStatus
  playLists: Record<string, PlayListItemsResponse>
}

export const usePlayListItemsStore = defineStore('playListItems', () => {
  const playListItems = ref<PlayListItemsStore>({
    error: '',
    status: AsyncStatus.IDLE,
    playLists: {},
  })

  const fetchPlayListItems = async (playListId: string, pageToken?: string) => {
    if (!playListId) return
    try {
      playListItems.value.status = AsyncStatus.LOADING
      playListItems.value.error = ''
      const options: Record<string, string> = {}
      if (pageToken) options.pageToken = pageToken
      const response: AxiosResponse<PlayListItemsResponse> = await fetchPlayListItemsAPI(
        playListId,
        options,
      )

      const currentItems = playListItems.value.playLists[playListId]?.items || []
      playListItems.value.status = AsyncStatus.SUCCESS
      playListItems.value.playLists[playListId] = {
        ...response.data,
        items: [...currentItems, ...response.data.items],
      }
    } catch (err: any) {
      playListItems.value.status = AsyncStatus.FAIL
      playListItems.value.error = err.message
    }
  }

  return {
    playListItemsState: playListItems,
    fetchPlayListItems,
  }
})
