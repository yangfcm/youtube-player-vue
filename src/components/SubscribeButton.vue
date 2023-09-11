<script setup lang="ts">
import { ref } from 'vue'
import { useSubscribe } from '@/composables/useSubscribe';
import { useAuth } from '@/composables/useAuth';
import { AsyncStatus } from '@/settings/types';
import AppErrorPopup from '@/components/ErrorPopup.vue'

const props = defineProps<{
  channelId: string
}>()

const hovered = ref(false)
const { isSignedIn } = useAuth()
const { status, error, subscribed, subscribeChannel, unsubscribeChannel } = useSubscribe(props.channelId)

</script>

<template>
  <app-error-popup :message="error"></app-error-popup>
  <v-btn
    v-if="isSignedIn && subscribed !== undefined"
    :color="subscribed ? 'secondary' : ''"
    :loading="status === AsyncStatus.LOADING"
    width="150"
    @mouseenter="() => hovered = true"
    @mouseleave="() => hovered = false"
    @click="() => {
      if(subscribed === true) {
        unsubscribeChannel()
      }
      if(subscribed === false) {
        subscribeChannel()
      }
    }"
  >
    {{ subscribed ? 
      (hovered ? 'Unsubscribe' : 'Subscribed') : 
      'Subscribe' }}
  </v-btn>
</template>