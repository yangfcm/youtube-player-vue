<script setup lang="ts">
import { onMounted, inject } from 'vue'
import { useTheme } from 'vuetify'
import AppHeaderComp from './components/HeaderComp.vue'
import AppSidebarComp from './components/SidebarComp.vue'
import { useAuth } from './composables/useAuth'

const theme = useTheme()
const { fetchUserByToken } = useAuth()

onMounted(() => {
  const token = inject<string>('token')
  if (token) fetchUserByToken(token)

  // Use the saved dark theme.
  const savedDarkTheme = localStorage.getItem('darkTheme') === '1' ? true : false
  if (savedDarkTheme) {
    theme.global.name.value = 'dark'
  }
})
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

<style scoped></style>
