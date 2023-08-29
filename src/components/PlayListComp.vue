<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth';
import AppLoader from '@/components/LoaderComp.vue';
import AppErrorMessage from '@/components/ErrorMessageComp.vue';
import AppMoreButton from '@/components/MoreButton.vue';
import AppItemsGrid from '@/components/ItemsGrid.vue';
import { AsyncStatus } from '@/settings/types';

const auth = useAuthStore()
const { playlists } = storeToRefs(auth);
const { fetchPlayLists } = auth;
const hasMore = computed(() => !!playlists.value.data?.nextPageToken)

onMounted(() => {
  if(!playlists.value.data || playlists.value.data.items.length === 0) {
    fetchPlayLists();
  }
})

const handleLoadMore = () => {
  const pageToken = playlists.value.data?.nextPageToken
  if (pageToken) {
    fetchPlayLists(pageToken);
  }
}
</script>

<template>
  <app-loader v-if="playlists.status === AsyncStatus.LOADING && !playlists.data"></app-loader>
  <app-error-message
    v-if="playlists.status === AsyncStatus.FAIL"
    :message="playlists.error"
    class="mb-3">
  </app-error-message>
  <app-items-grid :playlists="playlists.data?.items"></app-items-grid>
  <app-more-button
      v-if="hasMore" 
      :loading="playlists.status === AsyncStatus.LOADING"
      @onLoadMore="handleLoadMore"
    >
      More Playlists
    </app-more-button>
</template>