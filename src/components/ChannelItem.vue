<script setup lang="ts">
import { useDisplay } from 'vuetify'
import { PLACEHOLDER_IMAGE_SQUARE } from '@/settings/constants'
import AppSubscribeButton from '@/components/SubscribeButton.vue'

export type ChannelItem = {
  id: string
  title: string
  imageUrl?: string
  description?: string
}

defineProps<{
  channel: ChannelItem
  variant?: 'text' | 'flat' | 'elevated' | 'tonal' | 'outlined' | 'plain'
}>()

const { name } = useDisplay()
</script>

<template>
  <v-card :variant="variant || 'elevated'">
    <div class="d-flex flex-column flex-sm-row">
      <router-link :to="`/channel/${channel.id}`">
        <v-avatar rounded="0" :style="`height: auto; width: ${name === 'xs' ? '100%' : '180px'}`">
          <v-img :lazy-src="PLACEHOLDER_IMAGE_SQUARE" :src="channel.imageUrl"></v-img>
        </v-avatar>
      </router-link>
      <div class="d-flex flex-column">
        <div class="d-flex align-center">
          <router-link :to="`/channel/${channel.id}`">
            <v-card-title>
              <v-icon icon="mdi-account-details"></v-icon>
              {{ channel.title }}
            </v-card-title>
          </router-link>
          <app-subscribe-button :channelId="channel.id"></app-subscribe-button>
        </div>
        <v-card-text v-if="!!channel.description">
          {{ channel.description }}
        </v-card-text>
      </div>
    </div>
  </v-card>
</template>
