<script setup lang="ts">
import { onMounted, ref, onUnmounted } from 'vue';
import { type GsiResponse } from '@/settings/types';
import { decodeJwtResponse } from '@/settings/utils';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore()
const { signin, signout } = authStore;

const gsiScriptLoaded = ref(false);

const initializeGsi = () => {
  const { google } = window as any;
  if (!google || gsiScriptLoaded.value) {
    console.log("loaded!");
    return;
  };
  gsiScriptLoaded.value = true;
  google.accounts.id.initialize({
    client_id: import.meta.env.VITE_CLIENT_ID,
    callback: (response: GsiResponse) => {
      const decoded = decodeJwtResponse(response.credential);
      if(decoded === null) {
        signout();
        return;
      }
      signin({
        email: decoded.email as string,
        exp: decoded.exp as number,
        family_name: decoded.family_name as string,
        given_name: decoded.given_name as string,
        locale: decoded.locale as string,
        name: decoded.name as string,
        picture: decoded.picture as string,
      })
    }
  });
  google.accounts.id.renderButton(
    document.getElementById('google-auth-button'),
    {
      theme: 'filled_blue',
      text: 'continue_with'
    }
  )
};

onMounted(() => {
  const script = document.createElement("script")
  script.src = "https://accounts.google.com/gsi/client"
  script.onload = initializeGsi
  script.async = true
  script.id = "google-client-script"
  document.querySelector("body")?.appendChild(script)
  if(!script) return;
});

onUnmounted(() => {
  const { google } = window as any;
  google?.accounts.id.cancel();
  document.getElementById('google-client-script')?.remove();
});
</script>

<template> 
  <div id="google-auth-button">
  </div> 
</template>
