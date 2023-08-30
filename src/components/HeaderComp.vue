<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useDisplay } from 'vuetify';
import { useSettingStore } from '@/stores/setting';
import { useAuthStore } from '@/stores/auth';
import AppGoogleAuth from './GoogleAuthComp.vue';
import AppHeaderMenu from './HeaderMenuComp.vue';

const settingStore = useSettingStore();
const authStore = useAuthStore();
const { toggleSidebar } = settingStore;
const { isSignedIn } = storeToRefs(authStore);
const { name } = useDisplay();
const keyword = ref('');

</script>

<template>
  <v-app-bar color="primary">
    <v-app-bar-nav-icon @click="toggleSidebar">
    </v-app-bar-nav-icon>
    <v-app-bar-title class="d-none d-sm-flex">
      <RouterLink to="/">
        <v-icon icon="mdi-youtube"></v-icon> LiteTube
      </RouterLink>
    </v-app-bar-title>
    <template v-slot:append>
      <v-text-field 
        density="compact"
        variant="solo"
        label="Search"
        append-inner-icon="mdi-magnify"
        single-line
        hide-details
        v-model="keyword"
        @click:append-inner="() => { $router.push(`/search/${keyword}`) }"
        :style="`width: ${name === 'xs' ? '150px' : '250px'}`"
      ></v-text-field>&nbsp;&nbsp;
      <app-google-auth v-if="!isSignedIn"></app-google-auth>
      <app-header-menu v-if="isSignedIn">user</app-header-menu>
    </template>
  </v-app-bar>
</template>

<style scoped></style>