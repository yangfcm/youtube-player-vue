<script setup lang="ts">
import { type PlayListMetaSnippetDetails } from '@/stores/types'
import { PLACEHOLDER_IMAGE_RECTANGLE } from '@/settings/constants'

defineProps<{
  playlist: PlayListMetaSnippetDetails
}>()
</script>

<template>
  <v-card>
    <router-link :to="`/playlist/${playlist.id}`">
      <v-img
        :lazy-src="PLACEHOLDER_IMAGE_RECTANGLE"
        :src="playlist.snippet.thumbnails.medium?.url"
      ></v-img>
    </router-link>
    <router-link :to="`/playlist/${playlist.id}`">
      <v-card-title>{{ playlist.snippet.title }}</v-card-title>
    </router-link>
    <v-chip-group class="px-4">
      <v-chip
        >{{ playlist.contentDetails.itemCount }} video{{
          playlist.contentDetails.itemCount > 1 ? 's' : ''
        }}</v-chip
      >
    </v-chip-group>
  </v-card>
</template>
