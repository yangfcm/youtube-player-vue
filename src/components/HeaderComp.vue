<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'
import { useSettingStore } from '@/stores/setting'
import { useAuth } from '@/composables/useAuth'
import AppGoogleAuth from './GoogleAuth.vue'
import AppHeaderMenu from './HeaderMenu.vue'

const router = useRouter()
const settingStore = useSettingStore()
const { toggleSidebar } = settingStore
const { isSignedIn } = useAuth()
const { name } = useDisplay()
const keyword = ref('')

const handleSearch = () => {
  if (!keyword.value.trim()) return
  router.push(`/search/${keyword.value}`)
}
</script>

<template>
  <v-app-bar color="primary">
    <v-app-bar-nav-icon @click="toggleSidebar"> </v-app-bar-nav-icon>
    <v-app-bar-title class="d-none d-sm-flex">
      <RouterLink to="/"> <v-icon icon="mdi-youtube"></v-icon> LiteTube </RouterLink>
    </v-app-bar-title>
    <template v-slot:append>
      <v-form @submit.prevent="handleSearch">
        <v-text-field
          density="compact"
          variant="solo"
          label="Search"
          append-inner-icon="mdi-magnify"
          single-line
          hide-details
          v-model="keyword"
          @click:append-inner="handleSearch"
          :style="`width: ${name === 'xs' ? '150px' : '250px'}`"
        ></v-text-field>
      </v-form>
      &nbsp;&nbsp;
      <app-google-auth v-if="!isSignedIn"></app-google-auth>
      <app-header-menu v-if="isSignedIn">user</app-header-menu>
    </template>
  </v-app-bar>
</template>

<style scoped></style>
