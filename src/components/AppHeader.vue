<script setup lang="ts">
import { useSettingStore } from '@/stores/setting';

const settingStore = useSettingStore();
const { toggleSidebar } = settingStore;
</script>

<template>
  <v-app-bar color="primary">
    <v-app-bar-nav-icon @click="toggleSidebar">
    </v-app-bar-nav-icon>
    <v-app-bar-title>
      <RouterLink to="/">
        <v-icon icon="mdi-youtube"></v-icon>
        LiteTube
      </RouterLink>
    </v-app-bar-title>
  </v-app-bar>
</template>

<style scoped></style>