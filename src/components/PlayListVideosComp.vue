<script setup lang="ts">
import AppLoader from '@/components/LoaderComp.vue'
import AppErrorMessage from '@/components/ErrorMessage.vue'
import AppVideoItem from '@/components/VideoItem.vue'
import AppMoreButton from '@/components/MoreButton.vue'
import { AsyncStatus } from '@/settings/types'
import { usePlayListItems } from '@/composables/usePlayListItems'

const props = defineProps<{
  playListId: string
}>()
const { playListItems, status, error, hasMore, fetchMore } = usePlayListItems(props.playListId)
</script>

<template>
  <app-loader v-if="status === AsyncStatus.LOADING && playListItems.length === 0"></app-loader>
  <app-error-message
    v-if="status === AsyncStatus.FAIL"
    :message="error"
    class="mb-3"
  ></app-error-message>
  <app-video-item
    v-for="item in playListItems"
    :key="item.id as string"
    :video="{
      id: item.contentDetails.videoId,
      title: item.snippet.title,
      imageUrl: item.snippet.thumbnails?.high?.url,
      publishedAt: item.contentDetails.videoPublishedAt,
      channelTitle: item.snippet.videoOwnerChannelTitle,
      channelId: item.snippet.videoOwnerChannelId,
      playListId: playListId,
    }"
    :playListId="playListId"
    class="mb-3"
  ></app-video-item>
  <app-more-button v-if="hasMore" :loading="status === AsyncStatus.LOADING" @onLoadMore="fetchMore"
    >More Videos</app-more-button
  >
</template>
