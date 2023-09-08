<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useSettingStore } from '@/stores/setting'

const settingStore = useSettingStore()
const { setting } = storeToRefs(settingStore)
</script>

<template>
  <v-navigation-drawer v-model="setting.openSidebar" :permanent="$vuetify.display.mdAndUp">
    <v-list>
      <v-list-item link to="/" color="primary" title="Home">
        <template v-slot:prepend>
          <v-icon icon="mdi-home"></v-icon>
        </template>
      </v-list-item>
      <v-list-item link to="/subscription" color="primary" title="Subscription">
        <template v-slot:prepend>
          <v-icon icon="mdi-youtube-subscription"></v-icon>
        </template>
      </v-list-item>
      <v-list-item link to="/playlist" color="primary" title="Play List">
        <template v-slot:prepend>
          <v-icon icon="mdi-playlist-play"></v-icon>
        </template>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
