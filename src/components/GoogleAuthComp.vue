<script setup lang="ts">
import { onMounted, ref, onUnmounted } from 'vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore()
const { signin, signout } = authStore;

const gsiScriptLoaded = ref(false);
const client = ref<any>(null);

const initializeGsi = () => {
  const { google } = window as any;
  if (!google || gsiScriptLoaded.value) {
    console.log("loaded!");
    return;
  };
  gsiScriptLoaded.value = true;
  client.value = google.accounts.oauth2.initTokenClient({
    client_id: import.meta.env.VITE_CLIENT_ID,
    scope: 'https://www.googleapis.com/auth/userinfo.profile',
    callback: (res: any) => {
      console.log(res); // get token.
      // @TODO: Fetch user info via: https://www.googleapis.com/oauth2/v3/userinfo?access_token=... and proceed with login.
    }
  })
  // google.accounts.id.initialize({
  //   client_id: import.meta.env.VITE_CLIENT_ID,
  //   callback: (response: GsiResponse) => {
  //     const decoded = decodeJwtResponse(response.credential);
  //     console.log(response.credential, decoded);
  //     if(decoded === null) {
  //       signout();
  //       return;
  //     }
  //     signin({
  //       email: decoded.email as string,
  //       exp: decoded.exp as number,
  //       family_name: decoded.family_name as string,
  //       given_name: decoded.given_name as string,
  //       locale: decoded.locale as string,
  //       name: decoded.name as string,
  //       picture: decoded.picture as string,
  //     });
  //   }
  // });
  // google.accounts.id.renderButton(
  //   document.getElementById('google-auth-button'),
  //   {
  //     theme: 'filled_blue',
  //     text: 'continue_with'
  //   }
  // )
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
  <button @click="logingWithGoogle">Login with google</button>
</template>