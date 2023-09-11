<script setup lang="ts">
import { ref, watch } from 'vue';
import { useTheme } from 'vuetify';

const theme = useTheme()
const model = ref(theme.global.name.value === 'dark' ? true : false)
watch(model, (newValue) => {
  theme.global.name.value = newValue ? 'dark' : 'light'
})

</script>

<template>
  <div
    @click.stop="() => {}">
    <v-switch
      v-model="model"
      :label="`Appearance: ${model ? 'On' : 'Off'}`"
      color="primary"
      hide-details
      inset
    ></v-switch>
  </div>
</template>