<script setup lang="ts">
defineProps<{
  message?: string
}>()
</script>

<template>
  <div>
    <v-alert icon="mdi-alert" type="error">{{ message || 'Oops, something went wrong.' }}</v-alert>
  </div>
</template>
