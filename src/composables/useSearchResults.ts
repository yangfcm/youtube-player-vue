import { onMounted, computed, watch, type Ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useSearchResultsStore } from '@/stores/searchResults'

export function useSearchResults(keyword: Ref<string>) {
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
    await fetchResults(keyword.value.trim(), nextPageToken.value)
  }

  onMounted(() => {
    if (searchResults.value.length === 0) {
      fetchResults(keyword.value.trim())
    }
  })

  watch(keyword, (newValue, oldValue) => {
    if (newValue && newValue.trim() !== oldValue?.trim()) {
      searchResultsStore.$reset()
      fetchResults(newValue?.trim())
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
