import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export type Auth = {
  email: string
  exp: number
  family_name: string
  given_name: string
  locale: string
  name: string
  picture: string
}

export const useAuthStore = defineStore('auth', () => {
  const auth = ref<Auth | null>(null)

  function signin(authData: Auth) {
    auth.value = authData
  }

  function signout() {
    auth.value = null
  }

  const isSignedIn = computed(() => {
    if (!auth.value) return false
    return Date.now() < auth.value.exp * 1000
  })

  return { auth, isSignedIn, signin, signout }
})
