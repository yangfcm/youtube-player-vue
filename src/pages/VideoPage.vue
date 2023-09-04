<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useVideo } from '@/composables/useVideo';
import AppLoader from '@/components/LoaderComp.vue';
import AppErrorMessage from '@/components/ErrorMessageComp.vue';
import AppVideoPlayer from '@/components/VideoPlayerComp.vue';
import { AsyncStatus } from '@/settings/types';

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
    </template>
  </template>
</template>