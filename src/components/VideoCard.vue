<script setup lang="ts">
import { type VideoMetaSnippetStats } from '@/stores/types';
defineProps<{
  video: VideoMetaSnippetStats
}>()
</script>

<template>
  <div>{{ video.snippet.title }}</div>
</template>