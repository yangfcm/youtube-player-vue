import { ref } from 'vue'
import { defineStore } from 'pinia'
import { AsyncStatus } from '@/settings/types'
import { fetchSearchResultsAPI } from './api'
import type { SearchResultsResponse } from './types'

type SearchResultsStore = {
  error: string
  status: AsyncStatus
  results?: SearchResultsResponse
}

export const useSearchResultsStore = defineStore('searchResults', () => {
  const searchResults = ref<SearchResultsStore>({
    error: '',
    status: AsyncStatus.IDLE,
  })

  const $reset = () => {
    searchResults.value = {
      error: '',
      status: AsyncStatus.IDLE,
    }
  }

  const fetchResults = async (keyword: string, pageToken?: string) => {
    try {
      searchResults.value.status = AsyncStatus.LOADING
      searchResults.value.error = ''
      const options: Record<string, string> = {}
      if (pageToken) options.pageToken = pageToken
      const response = await fetchSearchResultsAPI(keyword, options)
      const currentItems = searchResults.value.results?.items || []
      searchResults.value.results = {
        ...response.data,
        items: [...currentItems, ...response.data.items],
      }
      searchResults.value.status = AsyncStatus.SUCCESS
    } catch (err: any) {
      searchResults.value.status = AsyncStatus.FAIL
      searchResults.value.error = err.message
    }
  }

  return {
    fetchResults,
    searchResultsState: searchResults,
    $reset,
  }
})
