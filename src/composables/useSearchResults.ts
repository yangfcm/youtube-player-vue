import { onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useSearchResultsStore } from '@/stores/searchResults'

export function useSearchResults(keyword: string) {
  const searchResultsStore = useSearchResultsStore()
  const { fetchResults } = searchResultsStore
  const { searchResultsState } = storeToRefs(searchResultsStore)

  const status = computed(() => searchResultsState.value.status)
  const error = computed(() => searchResultsState.value.error)
  const nextPageToken = computed(() => searchResultsState.value.results?.nextPageToken)
  const hasMore = computed(() => !!searchResultsState.value.results?.nextPageToken)
  const searchResults = computed(() => searchResultsState.value.results?.items || [])

  const fetchMore = async () => {
    if (!nextPageToken.value) return
    await fetchResults(keyword, nextPageToken.value)
  }

  onMounted(() => {
    if (searchResults.value.length === 0) {
      fetchResults(keyword)
    }
  })

  return {
    searchResults,
    status,
    error,
    hasMore,
    fetchMore,
  }
}
