<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth';
import AppGoogleAuth from '@/components/GoogleAuthComp.vue';
import AppSubscriptionsComp from '@/components/SubscriptionsComp.vue'

const auth = useAuthStore();
const { isSignedIn } = storeToRefs(auth);

</script>
<template>
  <app-google-auth v-if="!isSignedIn"></app-google-auth>
  <div v-if="isSignedIn">
    <app-subscriptions-comp></app-subscriptions-comp>
  </div>
</template>