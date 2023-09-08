<script setup lang="ts">
import { useDisplay } from 'vuetify'
import { PLACEHOLDER_IMAGE_RECTANGLE } from '@/settings/constants'
import { fromNow } from '@/settings/utils'

export type PlayListItem = {
  id: string
  title: string
  imageUrl?: string
  channelId: string
  channelTitle: string
  publishedAt: Date
}

defineProps<{
  playList: PlayListItem
}>()

const { name } = useDisplay()
</script>

<template>
  <v-card>
    <div class="d-flex flex-column flex-sm-row">
      <router-link :to="`/playlist/${playList.id}`">
        <v-avatar rounded="0" :style="`height: auto; width: ${name === 'xs' ? '100%' : '230px'}`">
          <v-img
            :lazy-src="PLACEHOLDER_IMAGE_RECTANGLE"
            :src="playList.imageUrl"
            :cover="true"
          ></v-img>
        </v-avatar>
      </router-link>
      <div class="d-flex flex-column">
        <router-link :to="`/playList/${playList.id}`">
          <v-card-title>
            <v-icon icon="mdi-playlist-play" color="info"></v-icon>
            {{ playList.title }}
          </v-card-title>
        </router-link>
        <router-link :to="`/channel/${playList.channelId}`">
          <v-card-subtitle>{{ playList.channelTitle }}</v-card-subtitle>
        </router-link>
        <v-card-text class="mt-auto d-flex align-end">
          {{ fromNow(playList.publishedAt) }}
        </v-card-text>
      </div>
    </div>
  </v-card>
</template>
