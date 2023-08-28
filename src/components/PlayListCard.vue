<script setup lang="ts">
import { type PlayListMetaSnippetDetails } from '@/stores/types';

defineProps<{
  playlist: PlayListMetaSnippetDetails
}>()

</script>

<template>
  <v-card>
    <v-card-title>{{ playlist.snippet.title }}</v-card-title>
  </v-card>
</template>