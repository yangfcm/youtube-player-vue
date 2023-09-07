<script setup lang="ts">
import AppSortComments from './SortComments.vue'
import AppAddComment from './AddComment.vue'

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
  <div class="my-2">
    <app-add-comment :videoId="videoId"></app-add-comment>
  </div>
</template>