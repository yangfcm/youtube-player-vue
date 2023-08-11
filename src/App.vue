<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <v-app>
    <v-navigation-drawer>sidebar</v-navigation-drawer>
    <v-app-bar>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-app-bar-title>Application</v-app-bar-title>
    </v-app-bar>
    <v-main>
      main
    </v-main>
  </v-app>
</template>

<style scoped>
</style>
