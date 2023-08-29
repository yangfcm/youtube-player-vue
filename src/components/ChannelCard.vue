<script setup lang="ts">
import { type SubscriptionSnippet } from '@/stores/types';
import { PLACEHOLDER_IMAGE_SQUARE } from '@/settings/constants';

defineProps<{
  subscription: SubscriptionSnippet
}>()

</script>

<template>
  <v-card>
    <router-link :to="`/chanel/${subscription.snippet.resourceId.channelId}`">
      <v-img :lazy-src="PLACEHOLDER_IMAGE_SQUARE" :src="subscription.snippet.thumbnails.medium?.url"></v-img>
    </router-link>
    <v-tooltip :text="subscription.snippet.title" location="bottom">
      <template v-slot:activator="{ props }">
        <router-link :to="`/channel/${subscription.snippet.resourceId.channelId}`">
          <v-card-title v-bind="props" class="text-center">{{ subscription.snippet.title }}</v-card-title>
        </router-link>
      </template>
    </v-tooltip>
  </v-card>
</template>