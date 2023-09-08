<script setup lang="ts"> 
const emit = defineEmits(['onLoadMore']);

defineProps<{
  loading?: boolean,
}>()

const handleClick = () => {
  emit('onLoadMore');
}
</script>

<template>
  <v-container class="px-0">
    <v-row no-gutters justify="center">
      <v-col xs="12" sm="6" lg="4">
        <v-btn :loading="!!loading" @click="handleClick" block density="compact">
          <slot>More</slot>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>