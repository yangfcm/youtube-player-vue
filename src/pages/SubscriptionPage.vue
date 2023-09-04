<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth';
import { useSubscriptions } from '@/composables/useSubscriptions';
import AppGoogleAuth from '@/components/GoogleAuthComp.vue';
import AppLoader from '@/components/LoaderComp.vue';
import AppErrorMessage from '@/components/ErrorMessageComp.vue';
import AppMoreButton from '@/components/MoreButton.vue';
import AppItemsGrid from '@/components/ItemsGrid.vue';
import { AsyncStatus } from '@/settings/types';

const { subscriptions, status, error, hasMore, fetchMore } = useSubscriptions()

const { isSignedIn } = storeToRefs(useAuthStore());

</script>
<template>
  <app-google-auth v-if="!isSignedIn"></app-google-auth>
  <div v-if="isSignedIn">
    <app-loader v-if="status === AsyncStatus.LOADING && !subscriptions.length"></app-loader>
    <app-error-message
      v-if="status === AsyncStatus.FAIL"
      :message="error"
      class="mb-3"
    ></app-error-message>
    <app-items-grid :subscriptions="subscriptions" :minWidth="'10rem'"></app-items-grid>
    <app-more-button
      v-if="hasMore"
      :loading="status === AsyncStatus.LOADING"
      @onLoadMore="fetchMore"
    >
      More Subscriptions
    </app-more-button>
  </div>
</template>