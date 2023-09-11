import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useSettingStore } from '@/stores/setting'

export function useDarkTheme() {
  const settingStore = useSettingStore()
  const { setDarkTheme: setDarkThemeAction } = settingStore
  const { settingState } = storeToRefs(settingStore)

  const darkTheme = computed(() => settingState.value.darkTheme)
  const setDarkTheme = (dark: boolean) => {
    setDarkThemeAction(dark)
    localStorage.setItem('dark', dark ? '1' : '0')
  }

  return { darkTheme, setDarkTheme }
}
