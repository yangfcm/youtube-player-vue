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
  <div class="app-items-grid">
    <template v-if="videos">
      <app-video-card v-for="video in videos" :key="(video.id as string)" :video="video"></app-video-card>
    </template>
    <template v-if="subscriptions">subscriptions grid</template>
    <template v-if="playlists">playlists grid</template>
  </div>
</template>

<style scoped>
  .app-items-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
    gap: 1.2rem;
  }
</style>