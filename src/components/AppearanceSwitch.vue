<script setup lang="ts">
import { ref, watch } from 'vue';
import { useTheme } from 'vuetify';

const theme = useTheme()
const model = ref(theme.global.name.value === 'dark' ? true : false)
watch(model, (newValue) => {
  theme.global.name.value = newValue ? 'dark' : 'light'
  localStorage.setItem('darkTheme', newValue ? '1' : '0')
})

</script>

<template>
  <div
    @click.stop="() => {}">
    <v-switch
      v-model="model"
      :label="`Appearance: ${model ? 'Dark' : 'Light'}`"
      color="primary"
      hide-details
      inset
      :append-icon="model ? 'mdi-weather-night' : 'mdi-weather-sunny'" 
    ></v-switch>
  </div>
</template>