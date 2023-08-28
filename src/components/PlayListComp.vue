<script setup lang="ts">
import { onMounted, inject, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth';
import AppLoader from '@/components/LoaderComp.vue';
import AppErrorMessage from '@/components/ErrorMessageComp.vue';
import AppMoreButton from '@/components/MoreButton.vue';
import { bearify } from '@/settings/utils';
import { AsyncStatus } from '@/settings/types';

const auth = useAuthStore()
const { playlists } = storeToRefs(auth);
const { fetchPlayLists } = auth;
const hasMore = computed(() => !!playlists.value.data?.nextPageToken)
const token = inject<string>('token')

onMounted(() => {
  if(token && (!playlists.value.data || playlists.value.data.items.length === 0)) {
    fetchPlayLists(bearify(token));
  }
})

const handleLoadMore = () => {
  const pageToken = playlists.value.data?.nextPageToken
  if (pageToken && token) {
    fetchPlayLists(bearify(token), pageToken);
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
  <div>playlists {{ playlists.data?.items.length }}</div>
  <app-more-button
      v-if="hasMore" 
      :loading="playlists.status === AsyncStatus.LOADING"
      @onLoadMore="handleLoadMore"
    >
      More Playlists
    </app-more-button>
</template>