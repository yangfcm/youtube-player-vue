<script setup lang="ts">

export type ChannelItem = {
  id: string;
  title: string;
  imageUrl?: string;
  description: string;
}

defineProps<{
  channel: ChannelItem
}>()
</script>


<template>
  <v-card>
    <v-card-title>{{ channel.title }}</v-card-title>
  </v-card>
</template>