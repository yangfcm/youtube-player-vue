<script setup lang="ts">
import { useDisplay } from 'vuetify';
import type { PlayListItemDetails } from '@/stores/types';

defineProps<{
  video: PlayListItemDetails
}>()

const { name } = useDisplay();
</script>

<template>
  <v-card class="mb-3">
    <div class="d-flex flex-column flex-sm-row">
      <v-avatar 
        rounded="0"
        :style="`height: auto; width: ${name === 'xs' ? '100%' : '230px'}`"
      >
        <v-img :src="video.snippet.thumbnails.high?.url"></v-img>
      </v-avatar>
      <div>
        <v-card-title :title="video.snippet.title">{{ video.snippet.title }}</v-card-title>
      </div>
    </div>
  </v-card>
</template>