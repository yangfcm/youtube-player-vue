<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

const drawer = ref(true)
</script>

<template>
  <v-app>
    <v-app-bar color="primary">
      <v-app-bar-nav-icon @click="drawer = !drawer" class="d-flex d-md-none">
      </v-app-bar-nav-icon>
      <v-app-bar-title>
        <RouterLink to="/">
          <v-icon icon="mdi-youtube"></v-icon>
          LiteTube
        </RouterLink>
      </v-app-bar-title>
    </v-app-bar>
    <v-navigation-drawer :disable-resize-watcher="true" :permanent="true" class="d-none d-md-flex">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </v-navigation-drawer>
    <v-navigation-drawer v-model="drawer" class="d-flex d-md-none" :style="{left: 0}">
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
