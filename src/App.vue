<script setup lang="ts">
import { onMounted, inject } from 'vue';
import AppHeaderComp from './components/HeaderComp.vue';
import AppSidebarComp from './components/SidebarComp.vue';
import { useAuthStore } from './stores/auth';

const { fetchUserByToken } = useAuthStore()

onMounted(() => {
  const token = inject<string>('token')
  if(token) fetchUserByToken(token)
});
</script>

<template>
  <v-app>
    <app-header-comp></app-header-comp>
    <app-sidebar-comp></app-sidebar-comp>
    <v-main>
      <div class="pa-3">
      <RouterView />
      </div>
    </v-main>
  </v-app>
</template>

<style scoped>
</style>
