<script setup lang="ts">
import { onMounted, ref, onUnmounted } from 'vue';
import { useDisplay } from 'vuetify';
import { useAuth } from '@/composables/useAuth';
import { AsyncStatus, type GsiAuthResponse } from '@/settings/types'

const { name } = useDisplay(); 
const auth = useAuth()
const { status, fetchUserByToken } = auth; 

const gsiScriptLoaded = ref(false);
const client = ref<any>(null);

const initializeGsi = () => {
  const { google } = window as any;
  if (!google || gsiScriptLoaded.value) return;
  gsiScriptLoaded.value = true;
  client.value = google.accounts.oauth2.initTokenClient({
    client_id: import.meta.env.VITE_CLIENT_ID,
    scope: 'https://www.googleapis.com/auth/userinfo.profile',
    callback: async (res: GsiAuthResponse) => {
      await fetchUserByToken(res.access_token);
    }
  });
};

const logingWithGoogle = () => {
  client?.value?.requestAccessToken();
}

onMounted(() => {
  const script = document.createElement("script")
  script.src = "https://accounts.google.com/gsi/client"
  script.onload = initializeGsi
  script.async = true
  script.id = "google-client-script"
  document.querySelector("body")?.appendChild(script)
});

onUnmounted(() => {
  const { google } = window as any;
  google?.accounts.id.cancel();
  document.getElementById('google-client-script')?.remove();
});
</script>

<template>
  <v-btn
      variant="outlined"
      icon="mdi-google"
      @click="logingWithGoogle"
      :loading="status === AsyncStatus.LOADING"
      v-if="name === 'xs'"
    > 
    </v-btn>
  <v-btn
    variant="outlined"
    prepend-icon="mdi-google"
    @click="logingWithGoogle"
    :loading="status === AsyncStatus.LOADING"
    v-else
  >
    Sign In
  </v-btn>
</template>