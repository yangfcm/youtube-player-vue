<script setup lang="ts">
import AppSortComments from './SortComments.vue'
defineProps<{
  videoId: string,
}>()
</script>

<template>
  <div class="text-h6">
    <v-icon icon="mdi-comment-text-multiple"></v-icon>
    Comments
    <app-sort-comments></app-sort-comments>
    </div>
</template>