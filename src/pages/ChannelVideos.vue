<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useChannelVideos } from '@/composables/useChannelVideos';
import AppLoader from '@/components/LoaderComp.vue'
import AppErrorMessage from '@/components/ErrorMessageComp.vue'
import AppItemsGrid from '@/components/ItemsGrid.vue';
import AppMoreButton from '@/components/MoreButton.vue';
import { AsyncStatus } from '@/settings/types';

const route = useRoute()
const channelId = route.params.id.toString()
const { videos, status, error, hasMore, fetchMore } = useChannelVideos(channelId)

</script>

<template>
  <app-loader v-if="status === AsyncStatus.LOADING && !videos.length"></app-loader>
  <app-error-message v-if="status === AsyncStatus.FAIL" :message="error" class="mb-3"></app-error-message>
  <app-items-grid :videos="videos"></app-items-grid>
  <app-more-button
    v-if="hasMore"
    :loading="status === AsyncStatus.LOADING"
    @onLoadMore="fetchMore"
  >
    More Videos
  </app-more-button>
</template>