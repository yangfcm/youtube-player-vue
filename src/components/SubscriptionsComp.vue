<script setup lang="ts">
import { onMounted, inject, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth';
import AppLoader from '@/components/LoaderComp.vue';
import AppErrorMessage from '@/components/ErrorMessageComp.vue';
import AppMoreButton from '@/components/MoreButton.vue';
import { bearify } from '@/settings/utils';
import { AsyncStatus } from '@/settings/types';

const auth = useAuthStore();
const { subscriptions } = storeToRefs(auth);
const { fetchSubscriptions } = auth;
const hasMore = computed(() => !!subscriptions.value.data?.nextPageToken)
const token = inject<string>('token')

onMounted(() => {
  if (token && (!subscriptions.value.data || subscriptions.value.data.items.length === 0)) {
    fetchSubscriptions(bearify(token));
  }
});

const handleLoadMore = () => {
  const pageToken = subscriptions.value.data?.nextPageToken
  if (pageToken && token) {
    fetchSubscriptions(bearify(token), pageToken);
  }
}
</script>

<template>
  <app-loader v-if="subscriptions.status === AsyncStatus.LOADING && !subscriptions.data"></app-loader>
  <app-error-message v-if="subscriptions.status === AsyncStatus.FAIL" :message="subscriptions.error"
    class="mb-3"></app-error-message>
  <div>subscriptions{{ subscriptions.data?.items.length }}</div>
  <app-more-button
    v-if="hasMore" 
    :loading="subscriptions.status === AsyncStatus.LOADING"
    @onLoadMore="handleLoadMore"
  >
    More Subscriptions
  </app-more-button>
</template>