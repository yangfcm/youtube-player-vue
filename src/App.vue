<script setup lang="ts">
import AppHeaderComp from './components/HeaderComp.vue';
import AppSidebarComp from './components/SidebarComp.vue';
</script>

<template>
  <v-app>
    <app-header-comp></app-header-comp>
    <app-sidebar-comp></app-sidebar-comp>
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<style scoped>
</style>
