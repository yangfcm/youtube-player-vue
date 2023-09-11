import { ref } from 'vue'
import { defineStore } from 'pinia'

type Setting = {
  openSidebar: boolean
  darkTheme: boolean
}

export const useSettingStore = defineStore('setting', () => {
  const setting = ref<Setting>({
    openSidebar: true,
    darkTheme: false,
  })
  function toggleSidebar() {
    setting.value.openSidebar = !setting.value.openSidebar
  }

  function setDarkTheme(dark: boolean) {
    setting.value.darkTheme = dark
  }

  return { settingState: setting, toggleSidebar, setDarkTheme }
})
