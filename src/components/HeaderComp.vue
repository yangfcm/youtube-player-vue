<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useSettingStore } from '@/stores/setting';
import { useAuthStore } from '@/stores/auth';
import AppGoogleAuth from './GoogleAuthComp.vue';
import AppHeaderMenu from './HeaderMenuComp.vue';

const settingStore = useSettingStore();
const authStore = useAuthStore();
const { toggleSidebar } = settingStore;
const { isSignedIn } = storeToRefs(authStore);

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
    <template v-slot:append>
      <app-google-auth v-if="!isSignedIn"></app-google-auth>
      <app-header-menu v-if="isSignedIn">user</app-header-menu>
    </template>
  </v-app-bar>
</template>

<style scoped></style>