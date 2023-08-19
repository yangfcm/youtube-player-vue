<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useSettingStore } from '@/stores/setting';
import AppGoogleAuth from './GoogleAuthComp.vue';
import { useAuthStore } from '@/stores/auth';

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
    <app-google-auth v-if="!isSignedIn"></app-google-auth>
    <div v-if="isSignedIn">user</div>
  </v-app-bar>
</template>

<style scoped></style>