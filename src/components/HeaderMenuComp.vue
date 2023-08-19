<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const { signout } = authStore;
const { auth } = storeToRefs(authStore);

</script>

<template>
  <v-menu v-if="!!auth">
    <template v-slot:activator="{ props }">
      <v-avatar :image="auth.picture" v-bind="props"></v-avatar>
    </template>
    <v-list>
      <v-list-item
        :prepend-avatar="auth.picture"
        :title="auth.name"
        :subtitle="auth.email"
      > 
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item>
        <v-btn block prepend-icon="mdi-logout" @click="signout" title="">Sign out</v-btn>
      </v-list-item>
    </v-list>
  </v-menu>
</template>