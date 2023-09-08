<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'

const { signout, user } = useAuth()
</script>

<template>
  <v-menu v-if="!!user">
    <template v-slot:activator="{ props }">
      <v-avatar :image="user.picture" v-bind="props">
        <v-icon icon="mdi-account" color="white" size="large"></v-icon>
      </v-avatar>
    </template>
    <v-list>
      <v-list-item :prepend-avatar="user.picture" :title="user.name" :subtitle="user.email">
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item>
        <v-btn block prepend-icon="mdi-logout" @click="signout" title="">Sign out</v-btn>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
