<script setup lang="ts">
import { ref } from 'vue'
import { useSubscribe } from '@/composables/useSubscribe';
import { useAuth } from '@/composables/useAuth';
import { AsyncStatus } from '@/settings/types';

const props = defineProps<{
  channelId: string
}>()

const hovered = ref(false)
const { isSignedIn } = useAuth()
const { status, subscribed, subscribeChannel, unsubscribeChannel } = useSubscribe(props.channelId)

</script>

<template>
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