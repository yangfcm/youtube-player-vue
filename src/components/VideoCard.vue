<script setup lang="ts">
import { type VideoMetaSnippetStats } from '@/stores/types'
import { formatNumber, fromNow } from '@/settings/utils'
import { PLACEHOLDER_IMAGE_RECTANGLE } from '@/settings/constants'

const props = defineProps<{
  video: VideoMetaSnippetStats
}>()

const videoId = typeof props.video.id === 'string' ? props.video.id : props.video.id.videoId
</script>

<template>
  <v-card>
    <router-link :to="`/video/${videoId}`">
      <v-img
        :lazy-src="PLACEHOLDER_IMAGE_RECTANGLE"
        :src="video.snippet.thumbnails.high?.url"
        :cover="true"
      ></v-img>
    </router-link>
    <v-tooltip :text="video.snippet.title" location="bottom">
      <template v-slot:activator="{ props }">
        <router-link :to="`/video/${videoId}`">
          <v-card-title v-bind="props">{{ video.snippet.title }}</v-card-title>
        </router-link>
      </template>
    </v-tooltip>
    <router-link :to="`/channel/${video.snippet.channelId}`">
      <v-card-subtitle>{{ video.snippet.channelTitle }}</v-card-subtitle>
    </router-link>
    <v-card-text>
      <template v-if="video.statistics?.viewCount">
        {{ formatNumber(parseInt(video.statistics.viewCount)) }} views •
      </template>
      {{ fromNow(video.snippet.publishedAt) }}
    </v-card-text>
  </v-card>
</template>
