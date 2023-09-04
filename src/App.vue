<script setup lang="ts">
import { onMounted, inject } from 'vue';
import AppHeaderComp from './components/HeaderComp.vue';
import AppSidebarComp from './components/SidebarComp.vue';
import { useAuth } from './composables/useAuth';

const { fetchUserByToken } = useAuth()

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
