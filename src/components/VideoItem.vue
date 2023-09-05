<script setup lang="ts">
import { useDisplay } from 'vuetify';
import { PLACEHOLDER_IMAGE_RECTANGLE } from '@/settings/constants';
import { fromNow } from '@/settings/utils';

export type VideoListItem = {
  id: string;
  title: string;
  channelId?: string;
  channelTitle?: string;
  publishedAt?: Date;
  imageUrl?: string;
  playListId?: string;
}

defineProps<{
  video: VideoListItem,
}>()

const { name } = useDisplay();
</script>

<template>
  <v-card class="mb-3">
    <div class="d-flex flex-column flex-sm-row">
      <router-link :to="{
        path: `/video/${video.id}`,
        query: { playListId: video.playListId }
      }">
        <v-avatar
          rounded="0"
          :style="`height: auto; width: ${name === 'xs' ? '100%' : '230px'}`"
        >
          <v-img
            :lazy-src="PLACEHOLDER_IMAGE_RECTANGLE"
            :src="video.imageUrl"
            :cover="true"
          ></v-img>
        </v-avatar>
      </router-link>
      <div class="d-flex flex-column">
        <router-link :to="{
        path: `/video/${video.id}`,
        query: { playListId: video.playListId }
      }">
          <v-card-title :title="video.title">{{ video.title }}</v-card-title>
        </router-link>
        <router-link :to="`/channel/${video.channelId}`">
          <v-card-subtitle>{{ video.channelTitle }}</v-card-subtitle>
        </router-link>
        <v-card-text v-if="video.publishedAt" class="mt-auto d-flex align-end">
          {{ fromNow(video.publishedAt) }}
        </v-card-text>
      </div>
    </div>
  </v-card>
</template>