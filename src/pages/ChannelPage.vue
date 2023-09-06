<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useChannelProfile } from '@/composables/useChannelProfile';
import AppLoader from '@/components/LoaderComp.vue'
import AppErrorMessage from '@/components/ErrorMessageComp.vue'
import AppChannelBanner from '@/components/ChannelBanner.vue'
import { AsyncStatus } from '@/settings/types';

const route = useRoute()
const channelId = route.params.id as string;
const { status, error, channelProfile } = useChannelProfile(channelId);

</script>

<template>
  <app-loader v-if="status === AsyncStatus.LOADING && !channelProfile"></app-loader>
  <app-error-message v-if="status===AsyncStatus.FAIL">{{ error }}</app-error-message>
  <div v-if="status===AsyncStatus.SUCCESS && !!channelProfile">
    <app-channel-banner :imageUrl="channelProfile.brandingSettings?.image?.bannerExternalUrl"></app-channel-banner>
    {{ channelProfile.snippet.title }}
  </div>
  <v-tabs align-tabs="title">
    <v-tab :to="`/channel/${channelId}/videos`">Videos</v-tab>
    <v-tab :to="`/channel/${channelId}/playlists`">Playlists</v-tab>
  </v-tabs>
  <RouterView></RouterView>
</template>