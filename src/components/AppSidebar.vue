<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia';
import { useSettingStore } from '@/stores/setting';

const settingStore = useSettingStore()
const { setting } = storeToRefs(settingStore);
</script>

<template>
  <v-navigation-drawer v-model="setting.openSidebar" :permanent="$vuetify.display.mdAndUp">
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
  </v-navigation-drawer>
</template>