<script setup lang="ts">
import { type PlayListMetaSnippetDetails, type SubscriptionSnippet, type VideoMetaSnippetStats } from '@/stores/types';
import AppVideoCard from './VideoCard.vue';

defineProps<{
  videos?: VideoMetaSnippetStats[],
  playlists?: PlayListMetaSnippetDetails[],
  subscriptions?: SubscriptionSnippet[],
}>()
</script>

<template>
  <div class="app-video-grid">
    <template v-if="videos">
      <app-video-card v-for="video in videos" :key="(video.id as string)" :video="video"></app-video-card>
    </template>
  </div>
</template>

<style scoped>
  .app-video-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
    gap: 1.2rem;
  }
</style>