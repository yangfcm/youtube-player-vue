import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSettingStore = defineStore('setting', () => {
  const setting = ref({
    openSidebar: true,
  })
  function toggleSidebar() {
    setting.value.openSidebar = !setting.value.openSidebar
  }

  return { setting, toggleSidebar }
})
