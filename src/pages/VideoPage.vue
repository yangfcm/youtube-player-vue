<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useVideoStore } from '@/stores/video';
import AppLoader from '@/components/LoaderComp.vue';
import AppErrorMessage from '@/components/ErrorMessageComp.vue';
import { AsyncStatus } from '@/settings/types';

const route = useRoute();
const videoId = route.params.id as string;
const playlistId = route.query.playlistId;

const videoStore = useVideoStore();
const { video: videoItems, status, error, } = storeToRefs(videoStore);
const video = computed(() => videoItems.value[videoId]);
const { fetchVideo } = videoStore;

onMounted(() => {
  if(!video.value) {
    fetchVideo(videoId);
  }
})

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
    video page, video id: {{  video?.id }}
  </template>
</template>