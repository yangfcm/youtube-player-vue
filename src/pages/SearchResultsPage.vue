<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useSearchResults } from '@/composables/useSearchResults'
import AppLoader from '@/components/LoaderComp.vue'
import AppErrorMessage from '@/components/ErrorMessage.vue'
import AppMoreButton from '@/components/MoreButton.vue'
import { AsyncStatus } from '@/settings/types'
import AppSearchItem from '@/components/SearchItem.vue'

const route = useRoute()
const keyword = computed(() => route.params.keyword?.toString())
const { searchResults, status, error, hasMore, fetchMore } = useSearchResults(keyword)
</script>

<template>
  <div class="pa-3">
    <h1 class="text-h5 mb-4">Search results for "{{ keyword }}"</h1>
    <app-loader v-if="status === AsyncStatus.LOADING && searchResults.length === 0"></app-loader>
    <app-error-message v-if="status === AsyncStatus.FAIL">{{ error }}</app-error-message>
    <app-search-item v-for="(item, index) in searchResults" :key="index" :item="item" class="mb-3">
    </app-search-item>
    <app-more-button
      v-if="hasMore"
      :loading="status === AsyncStatus.LOADING"
      @onLoadMore="fetchMore"
    >
      More results
    </app-more-button>
  </div>
</template>
