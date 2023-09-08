<script setup lang="ts">
import {
  type PlayListMetaSnippetDetails,
  type SubscriptionSnippet,
  type VideoMetaSnippetStats,
} from '@/stores/types'
import AppVideoCard from './VideoCard.vue'
import AppChannelCard from './ChannelCard.vue'
import AppPlayListCard from './PlayListCard.vue'

const props = defineProps<{
  videos?: VideoMetaSnippetStats[]
  playlists?: PlayListMetaSnippetDetails[]
  subscriptions?: SubscriptionSnippet[]
  minWidth?: string
}>()

const minWidth = props.minWidth || '18rem'
</script>

<template>
  <div class="app-items-grid">
    <template v-if="videos">
      <app-video-card
        v-for="video in videos"
        :key="video.id as string"
        :video="video"
      ></app-video-card>
    </template>
    <template v-if="subscriptions">
      <app-channel-card
        v-for="subscription in subscriptions"
        :key="subscription.id"
        :subscription="subscription"
      ></app-channel-card>
    </template>
    <template v-if="playlists">
      <app-play-list-card
        v-for="playlist in playlists"
        :key="playlist.id as string"
        :playlist="playlist"
      ></app-play-list-card>
    </template>
  </div>
</template>

<style scoped>
.app-items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(v-bind('minWidth'), 1fr));
  gap: 1.2rem;
}
</style>
