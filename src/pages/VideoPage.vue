<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useVideo } from '@/composables/useVideo';
import AppLoader from '@/components/LoaderComp.vue';
import AppErrorMessage from '@/components/ErrorMessageComp.vue';
import AppVideoPlayer from '@/components/VideoPlayerComp.vue';
import { AsyncStatus } from '@/settings/types';
import { formatNumber, fromNow } from '@/settings/utils';

const route = useRoute();
const videoId = route.params.id as string;

const { video, status, error } = useVideo(videoId);
</script>

<template>
  <app-loader v-if="status === AsyncStatus.LOADING"> </app-loader>
  <app-error-message
    v-if="status === AsyncStatus.FAIL"
    :message="error"
  >
  </app-error-message>
  <template v-if="status === AsyncStatus.SUCCESS">
    <template v-if="!video">
      The video isn't available.
    </template>
    <template v-else>
      <app-video-player :videoId="videoId"></app-video-player>
      <h1 class="pa-0 text-h4 overflow-auto">{{ video.snippet.title }}</h1>
      <router-link :to="`/channel/${video.snippet.channelId}`" class="text-h6">
        {{ video.snippet.channelTitle }}
      </router-link>
      <div>{{ formatNumber(parseInt(video.statistics.viewCount)) }} views
      •
      {{ fromNow(video.snippet.publishedAt) }}
      </div>
      <v-divider class="my-3"></v-divider>
      <div>{{ video.snippet.description }}</div>
    </template>
  </template>
</template>