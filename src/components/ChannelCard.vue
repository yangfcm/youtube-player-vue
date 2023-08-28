<script setup lang="ts">
import { type SubscriptionSnippet } from '@/stores/types';

defineProps<{
  subscription: SubscriptionSnippet
}>()

</script>

<template>
  <v-card>
    <v-card-title>{{ subscription.snippet.title }}</v-card-title>
  </v-card>
</template>