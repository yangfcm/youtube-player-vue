<script setup lang="ts">
import { onMounted } from 'vue';
import AppHeaderComp from './components/HeaderComp.vue';
import AppSidebarComp from './components/SidebarComp.vue';
import { useAuthStore } from './stores/auth';

const { fetchUserByToken } = useAuthStore()

onMounted(() => {
  const token = localStorage.getItem('token')
  if(token) fetchUserByToken(token)
});
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
