<script setup lang="ts">
import { useRoute } from 'vue-router';
import AppPlayListVideosComp from '@/components/PlayListVideosComp.vue'

const route = useRoute();
const playListId = route.params.id.toString();

</script>

<template>
  <div class="pa-3">
    <app-play-list-videos-comp :playListId = "playListId"></app-play-list-videos-comp>
  </div>
</template>