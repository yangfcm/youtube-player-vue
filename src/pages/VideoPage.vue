<script setup lang="ts">
import { computed } from 'vue';
import { useDisplay } from 'vuetify';
import { useRoute } from 'vue-router';
import { useVideo } from '@/composables/useVideo';
import AppLoader from '@/components/LoaderComp.vue';
import AppErrorMessage from '@/components/ErrorMessageComp.vue';
import AppVideoPlayer from '@/components/VideoPlayerComp.vue';
import AppPlayListVideosComp from '@/components/PlayListVideosComp.vue'
import AppVideoComments from '@/components/VideoComments.vue'
import { AsyncStatus } from '@/settings/types';
import { formatNumber, fromNow } from '@/settings/utils';

const { mdAndDown } = useDisplay()
const route = useRoute();
const videoId = computed(() => route.params.id as string);
const playListId = route.query.playListId as string;

const { video, status, error } = useVideo(videoId);
</script>

<template>
  <div class="pa-3">
    <app-loader v-if="status === AsyncStatus.LOADING"> </app-loader>
    <app-error-message
      v-if="status === AsyncStatus.FAIL"
      :message="error"
    >
    </app-error-message>
    <template v-if="status === AsyncStatus.SUCCESS">
      <app-error-message v-if="!video" message="The video isn't available.">
      </app-error-message>
      <template v-else>
        <app-video-player :videoId="videoId"></app-video-player>
        <h1 class="pb-3 pt-2 text-h4 overflow-auto text-primary">{{ video.snippet.title }}</h1>
        <router-link :to="`/channel/${video.snippet.channelId}`" class="text-h6">
          {{ video.snippet.channelTitle }}
        </router-link>
        <div class="mb-3">{{ formatNumber(parseInt(video.statistics.viewCount)) }} views
        •
        {{ fromNow(video.snippet.publishedAt) }}
        </div>
        <div>{{ video.snippet.description }}</div>
        <v-divider class="my-3"></v-divider>
        <v-row>
          <v-col>
            <app-video-comments :videoId="videoId"></app-video-comments>
          </v-col>
          <v-col :cols="mdAndDown ? 12 : 5 ">
            <app-play-list-videos-comp :playListId = "playListId"></app-play-list-videos-comp>
          </v-col>
        </v-row>
      </template>
      
    </template>
  </div>
</template>