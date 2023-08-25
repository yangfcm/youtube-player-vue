<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia';
import { usePopularVideosStore } from '@/stores/popularVideos'
import AppLoader from '@/components/LoaderComp.vue'
import AppErrorMessage from '@/components/ErrorMessageComp.vue'
import AppVideoGrid from '@/components/VideoGrid.vue';
import AppMoreButton from '@/components/MoreButton.vue';
import { AsyncStatus } from '@/settings/types';

const popularVideosStore = usePopularVideosStore()
const { fetchPopularVideos } = popularVideosStore;
const { status, error, videos, hasMore } = storeToRefs(popularVideosStore)

onMounted(() => {
  if(!videos.value || videos.value.items.length === 0) {
    fetchPopularVideos()
  }
});

</script>

<template>
  <app-loader v-if="status===AsyncStatus.LOADING && !videos?.items.length"></app-loader>
  <app-error-message v-if="status===AsyncStatus.FAIL" :message="error" class="mb-3"></app-error-message>
  <app-video-grid :videos="videos?.items || []"></app-video-grid>
  <app-more-button
    v-if="hasMore"
    :loading="status===AsyncStatus.LOADING"
    @onLoadMore="() => {
      if(videos?.nextPageToken) {
        fetchPopularVideos(videos?.nextPageToken);
      }
    }"
  >
    More Videos
  </app-more-button>
</template>