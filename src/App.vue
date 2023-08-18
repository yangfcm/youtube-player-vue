<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import AppHeader from './components/AppHeader.vue';
import { useSettingStore } from './stores/setting';
import { storeToRefs } from 'pinia';

const settingStore = useSettingStore()
const { setting } = storeToRefs(settingStore);
</script>

<template>
  <v-app>
    <app-header></app-header>
    <v-navigation-drawer v-model="setting.openSidebar" :permanent="$vuetify.display.mdAndUp">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </v-navigation-drawer>
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<style scoped>
</style>
