<script setup lang="ts">

export type PlayListItem = {
  id: string;
  title: string;
  imageUrl?: string;
  channelId: string;
  channelTitle: string;
  publishedAt: Date;
}

defineProps<{
  playList: PlayListItem
}>()
</script>


<template>
  <v-card>
    <v-card-title>{{ playList.title }}</v-card-title>
  </v-card>
</template>