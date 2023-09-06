<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useChannelProfile } from '@/composables/useChannelProfile';
import AppLoader from '@/components/LoaderComp.vue'
import AppErrorMessage from '@/components/ErrorMessageComp.vue'
import { AsyncStatus } from '@/settings/types';
import { formatNumber, fromNow } from '@/settings/utils';

const route = useRoute()
const channelId = route.params.id as string;
const { status, error, channelProfile } = useChannelProfile(channelId);

</script>

<template>
  <app-loader v-if="status === AsyncStatus.LOADING && !channelProfile"></app-loader>
  <app-error-message v-if="status === AsyncStatus.FAIL">{{ error }}</app-error-message>
  <template v-if="status === AsyncStatus.SUCCESS && !!channelProfile">
    <v-card variant="flat">
      <v-card-title>Description</v-card-title>
      <v-card-text>{{ channelProfile.snippet.description }}</v-card-text>
    </v-card> 
    <v-card variant="flat">
      <v-card-title>Stats</v-card-title>
      <v-list density="compact" class="py-0">
        <v-list-item>
          Joined
          {{ fromNow(channelProfile.snippet.publishedAt) }}
        </v-list-item>
        <v-list-item>
          {{ formatNumber(Number(channelProfile.statistics.videoCount)) }} videos
        </v-list-item>
        <v-list-item>
          {{ formatNumber(Number(channelProfile.statistics.subscriberCount)) }} subscribers
        </v-list-item>
        <v-list-item>
          {{ formatNumber(Number(channelProfile.statistics.viewCount)) }} views
        </v-list-item>
      </v-list>
    </v-card>
  </template>
</template>