<script setup lang="ts">
import { onMounted, ref, onUnmounted } from 'vue';
import { type GsiResponse } from '../settings/types';

const gsiScriptLoaded = ref(false);

const initializeGsi = () => {
  const { google } = window as any;
  if (!google || gsiScriptLoaded.value) {
    console.log("loaded!");
    return;
  };
  gsiScriptLoaded.value = true;
  console.log('script loaded!', import.meta.env.VITE_CLIENT_ID, google);
  google.accounts.id.initialize({
    client_id: import.meta.env.VITE_CLIENT_ID,
    callback: (response: GsiResponse) => { console.log('google authed!', response); }
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
