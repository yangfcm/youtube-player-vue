<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useChannelProfile } from '@/composables/useChannelProfile';
import AppLoader from '@/components/LoaderComp.vue'
import AppErrorMessage from '@/components/ErrorMessageComp.vue'
import AppChannelBanner from '@/components/ChannelBanner.vue'
import AppChannelItem from '@/components/ChannelItem.vue'
import { AsyncStatus } from '@/settings/types';

const route = useRoute()
const channelId = route.params.id as string;
const { status, error, channelProfile } = useChannelProfile(channelId);

const MAX_LENGTH = 150;

const shownChannelDescription = computed(() => {
  const channelDescription = channelProfile.value?.snippet.description || '';
  const trancatedChannelDescription = channelDescription.substring(0, MAX_LENGTH);
  return channelDescription.length >= MAX_LENGTH ? trancatedChannelDescription + '...' : channelDescription;
});

</script>

<template>
  <app-loader v-if="status === AsyncStatus.LOADING && !channelProfile"></app-loader>
  <app-error-message v-if="status===AsyncStatus.FAIL">{{ error }}</app-error-message>
  <div v-if="status===AsyncStatus.SUCCESS && !!channelProfile">
    <app-channel-banner :imageUrl="channelProfile.brandingSettings?.image?.bannerExternalUrl"></app-channel-banner>
    <app-channel-item
      :channel="{
        id: channelId,
        title: channelProfile.snippet.title,
        imageUrl: channelProfile.snippet.thumbnails.medium?.url,
        description: shownChannelDescription,
      }"
      class="pa-3"
      variant="flat"
    ></app-channel-item>    
    <v-tabs align-tabs="title">
      <v-tab :to="`/channel/${channelId}/videos`">Videos</v-tab>
      <v-tab :to="`/channel/${channelId}/playlists`">Playlists</v-tab>
      <v-tab :to="`/channel/${channelId}/profile`">About</v-tab>
    </v-tabs>
    <div class="pa-3">
      <RouterView></RouterView>
    </div>
  </div>
</template>