<script setup lang="ts">
import type { ResultItemMetaSnippet } from '@/stores/types'
import AppChannelItem from './ChannelItem.vue'
import AppPlayListItem from './PlayListItem.vue'
import AppVideoItem from './VideoItem.vue'
import type { VideoId, ChannelId, PlayListId } from '@/stores/types'

const props = defineProps<{
  item: ResultItemMetaSnippet
}>()

const kind = typeof props.item.id === 'string' ? '' : props.item.id.kind.split('#')[1]
</script>

<template>
  <div>
    <app-video-item
      v-if="kind==='video'"
      :video="{
        id: (item.id as VideoId).videoId,
        title: item.snippet.title,
        channelId: item.snippet.channelId,
        channelTitle: item.snippet.channelTitle,
        publishedAt: item.snippet.publishedAt,
        imageUrl: item.snippet.thumbnails?.high?.url,
      }"
    ></app-video-item>
    <app-channel-item
      v-if="kind==='channel'"
      :channel="{
        id: (item.id as ChannelId).channelId,
        title: item.snippet.title,
        imageUrl: item.snippet.thumbnails?.high?.url,
        description: item.snippet.description,
      }"
    ></app-channel-item>
    <app-play-list-item
      v-if="kind==='playlist'"
      :playList="{
        id: (item.id as PlayListId).playlistId,
        title: item.snippet.title,
        imageUrl: item.snippet.thumbnails?.high?.url,
        channelId: item.snippet.channelId,
        channelTitle: item.snippet.channelTitle,
        publishedAt: item.snippet.publishedAt,
      }"
    ></app-play-list-item>
  </div>
</template>