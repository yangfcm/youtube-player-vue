<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useChannelPlayLists } from '@/composables/useChannelPlayLists'
import AppLoader from '@/components/LoaderComp.vue'
import AppErrorMessage from '@/components/ErrorMessage.vue'
import AppItemsGrid from '@/components/ItemsGrid.vue'
import AppMoreButton from '@/components/MoreButton.vue'
import { AsyncStatus } from '@/settings/types'

const route = useRoute()
const channelId = route.params.id.toString()
const { playlists, status, error, hasMore, fetchMore } = useChannelPlayLists(channelId)
</script>

<template>
  <app-loader v-if="status === AsyncStatus.LOADING && !playlists.length"></app-loader>
  <app-error-message
    v-if="status === AsyncStatus.FAIL"
    :message="error"
    class="mb-3"
  ></app-error-message>
  <app-items-grid :playlists="playlists"></app-items-grid>
  <app-more-button v-if="hasMore" :loading="status === AsyncStatus.LOADING" @onLoadMore="fetchMore">
    More Playlists
  </app-more-button>
</template>
