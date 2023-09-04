<script setup lang="ts">
import { useDisplay } from 'vuetify';
import type { PlayListItemDetails } from '@/stores/types';

defineProps<{
  video: PlayListItemDetails
}>()

const { name } = useDisplay();
</script>

<template>
  <v-card variant="outlined" class="mb-3">
    <div class="d-flex">
      <v-avatar 
        :size="name === 'xs' ? 150 : 230"
        rounded="0"
        style="height: auto"
      >
        <v-img :src="video.snippet.thumbnails.high?.url"></v-img>
      </v-avatar>
      <div>
        <v-card-title>{{ video.snippet.title }}</v-card-title>
      </div>
    </div>
  </v-card>
</template>