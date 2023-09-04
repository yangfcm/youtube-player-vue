<script setup lang="ts">
import { useSubscriptions } from '@/composables/useSubscriptions';
import AppLoader from '@/components/LoaderComp.vue';
import AppErrorMessage from '@/components/ErrorMessageComp.vue';
import AppMoreButton from '@/components/MoreButton.vue';
import AppItemsGrid from '@/components/ItemsGrid.vue';
import { AsyncStatus } from '@/settings/types';

const { subscriptions, status, error, hasMore, fetchMore } = useSubscriptions()

</script>

<template>
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
</template>