<script setup lang="ts">
import { useDisplay } from 'vuetify';
import { PLACEHOLDER_IMAGE_RECTANGLE } from '@/settings/constants';

export type ChannelItem = {
  id: string;
  title: string;
  imageUrl?: string;
  description: string;
}

defineProps<{
  channel: ChannelItem
}>()

const { name } = useDisplay()
</script>


<template>
  <v-card class="mb-3">
    <div class="d-flex flex-column flex-sm-row">
      <router-link :to="`/channel/${channel.id}`">
        <v-avatar
          rounded="0"
          :style="`height: auto; width: ${name === 'xs' ? '100%' : '230px'}`"
        >
          <v-img
            :lazy-src="PLACEHOLDER_IMAGE_RECTANGLE"
            :src="channel.imageUrl"
          ></v-img>
        </v-avatar>
      </router-link>
      <div class="d-flex flex-column">
        <router-link :to="`/channel/${channel.id}`">
          <v-card-title>{{ channel.title }}</v-card-title>
        </router-link>
        <v-card-text>
          {{ channel.description }}
        </v-card-text>
      </div>
    </div>
  </v-card>
</template>