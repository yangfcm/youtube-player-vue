<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth';
import AppGoogleAuth from '@/components/GoogleAuthComp.vue';
import AppPlayListComp from '@/components/PlayListComp.vue';

const { isSignedIn } = storeToRefs(useAuthStore());

</script>
<template>
  <app-google-auth v-if="!isSignedIn"></app-google-auth>
  <app-play-list-comp v-if="isSignedIn"></app-play-list-comp>
</template>