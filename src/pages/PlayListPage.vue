<script setup lang="ts">
import { useAuth } from '@/composables/useAuth';
import { usePlayLists } from '@/composables/usePlayLists';
import AppGoogleAuth from '@/components/GoogleAuthComp.vue';
import AppLoader from '@/components/LoaderComp.vue';
import AppErrorMessage from '@/components/ErrorMessageComp.vue';
import AppMoreButton from '@/components/MoreButton.vue';
import AppItemsGrid from '@/components/ItemsGrid.vue';
import { AsyncStatus } from '@/settings/types';

const { playlists, status, error, hasMore, fetchMore } = usePlayLists();
const { isSignedIn } = useAuth();

</script>

<template>
  <app-google-auth v-if="!isSignedIn"></app-google-auth>
  <div v-if="isSignedIn">
    <app-loader v-if="status === AsyncStatus.LOADING && !playlists.length"></app-loader>
    <app-error-message
      v-if="status === AsyncStatus.FAIL"
      :message="error"
      class="mb-3">
    </app-error-message>
    <app-items-grid :playlists="playlists"></app-items-grid>
    <app-more-button
        v-if="hasMore" 
        :loading="status === AsyncStatus.LOADING"
        @onLoadMore="fetchMore"
      >
        More Playlists
      </app-more-button>
  </div>
</template>