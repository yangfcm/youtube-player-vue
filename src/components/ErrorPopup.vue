<script setup lang="ts">
import { computed } from 'vue';
import { ref, watch } from 'vue';

const props = defineProps<{
  message?: string
}>()

const showError = ref(false)
const message = computed(() => props.message || '')

watch(message, (newValue) => {
  if(newValue) {
    showError.value = true
  }
})

</script>

<template>
  <v-snackbar v-model="showError" :timeout="5000" color="red">
    {{ message || '' }}
    <template v-slot:actions>
      <v-btn
        variant="text"
        @click="showError = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>