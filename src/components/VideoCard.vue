<script setup lang="ts">
import { type VideoMetaSnippetStats } from '@/stores/types';
import { formatNumber, fromNow } from '@/settings/utils';
import { PLACEHOLDER_IMAGE_RECTANGLE } from '@/settings/constants';

defineProps<{
  video: VideoMetaSnippetStats
}>()

</script>

<template>
  <v-card>
    <router-link :to="`/video/${video.id}`">
      <v-img :lazy-src="PLACEHOLDER_IMAGE_RECTANGLE" :src="video.snippet.thumbnails.high?.url"></v-img>
    </router-link>
    <v-tooltip :text="video.snippet.title" location="bottom">
      <template v-slot:activator="{props}">
        <router-link :to="`/video/${video.id}`">
          <v-card-title v-bind="props">{{ video.snippet.title }}</v-card-title>
        </router-link>
      </template>
    </v-tooltip>
    <router-link :to="`/channel/${video.snippet.channelId}`">
      <v-card-subtitle>{{ video.snippet.channelTitle  }}</v-card-subtitle>
    </router-link>
    <v-card-text>
      {{ formatNumber(parseInt(video.statistics.viewCount)) }} views
      •
      {{ fromNow(video.snippet.publishedAt) }}
    </v-card-text>
  </v-card>
</template>