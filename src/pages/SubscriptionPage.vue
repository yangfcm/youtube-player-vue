<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth';
import AppGoogleAuth from '@/components/GoogleAuthComp.vue';

const { isSignedIn } = storeToRefs(useAuthStore());

</script>
<template>
  <app-google-auth v-if="!isSignedIn"></app-google-auth>
  <div v-if="isSignedIn">subscriptions page</div>
</template>