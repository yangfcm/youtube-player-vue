<script setup lang="ts">
import { useDisplay } from 'vuetify';
import type { PlayListItemDetails } from '@/stores/types';
import { PLACEHOLDER_IMAGE_RECTANGLE } from '@/settings/constants';
import { fromNow } from '@/settings/utils';

defineProps<{
  video: PlayListItemDetails,
  playListId: string,
}>()

const { name } = useDisplay();
</script>

<template>
  <v-card class="mb-3">
    <div class="d-flex flex-column flex-sm-row">
      <router-link :to="{
        path: `/video/${video.contentDetails.videoId}`,
        query: { playListId }
      }">
        <v-avatar
          rounded="0"
          :style="`height: auto; width: ${name === 'xs' ? '100%' : '230px'}`"
        >
          <v-img
            :lazy-src="PLACEHOLDER_IMAGE_RECTANGLE"
            :src="video.snippet.thumbnails.high?.url"
            :cover="true"
          ></v-img>
        </v-avatar>
      </router-link>
      <div class="d-flex flex-column">
        <router-link :to="{
        path: `/video/${video.contentDetails.videoId}`,
        query: { playListId }
      }">
          <v-card-title :title="video.snippet.title">{{ video.snippet.title }}</v-card-title>
        </router-link>
        <router-link :to="`/channel/${video.snippet.videoOwnerChannelId}`">
          <v-card-subtitle>{{ video.snippet.videoOwnerChannelTitle }}</v-card-subtitle>
        </router-link>
        <v-card-text class="mt-auto d-flex align-end">
          {{ fromNow(video.snippet.publishedAt) }}
        </v-card-text>
      </div>
    </div>
  </v-card>
</template>