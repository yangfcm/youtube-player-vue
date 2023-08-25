<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia';
import { usePopularVideosStore } from '@/stores/popularVideos'
import AppLoader from '@/components/LoaderComp.vue'
import AppErrorMessage from '@/components/ErrorMessageComp.vue'
import AppVideoGrid from '@/components/VideoGrid.vue';
import { AsyncStatus } from '@/settings/types';

const popularVideosStore = usePopularVideosStore()
const { fetchPopularVideos } = popularVideosStore;
const { status, error, videos, hasMore } = storeToRefs(popularVideosStore)

onMounted(() => {
  fetchPopularVideos()
});

</script>

<template>
  <app-loader v-if="status===AsyncStatus.LOADING"></app-loader>
  <app-error-message v-if="status===AsyncStatus.FAIL" :message="error"></app-error-message>
  <app-video-grid v-if="status===AsyncStatus.SUCCESS" :videos="videos?.items || []"></app-video-grid>
</template>