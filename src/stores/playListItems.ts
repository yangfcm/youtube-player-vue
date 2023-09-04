import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { AxiosResponse } from 'axios'
import { useRoute } from 'vue-router'
import { AsyncStatus } from '@/settings/types'
import { fetchPlayListItemsAPI } from './api'
import type { PlayListItemsResponse } from './types'

type PlayListItemsStore = {
  error: string
  status: AsyncStatus
  playLists: Record<string, PlayListItemsResponse>
}

export const usePlayListItemsStore = defineStore('playListItems', () => {
  const route = useRoute()
  const routeParamId = route.params.id
  const playListId = Array.isArray(routeParamId) ? routeParamId[0] : routeParamId
  const playListItems = ref<PlayListItemsStore>({
    error: '',
    status: AsyncStatus.IDLE,
    playLists: {},
  })

  const status = computed(() => playListItems.value.status)
  const error = computed(() => playListItems.value.error)
  const nextPageToken = computed(() => playListItems.value.playLists[playListId]?.nextPageToken)
  const hasMore = computed(() => !!playListItems.value.playLists[playListId]?.nextPageToken)
  const videos = computed(() => playListItems.value.playLists[playListId]?.items || [])

  const fetchPlayListItems = async (pageToken?: string) => {
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

  const fetchMore = async () => {
    if (!nextPageToken.value) return
    await fetchPlayListItems(nextPageToken.value)
  }

  return {
    videos,
    status,
    error,
    hasMore,
    playListItemsState: playListItems.value,
    fetchPlayListItems,
    fetchMore,
  }
})
