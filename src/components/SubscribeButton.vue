<script setup lang="ts">
import { useSubscribe } from '@/composables/useSubscribe';
import { useAuth } from '@/composables/useAuth';

const props = defineProps<{
  channelId: string
}>()

const { isSignedIn } = useAuth()
const { status, error, subscribed, subscribeChannel, unsubscribeChannel } = useSubscribe(props.channelId)


</script>

<template>
  <v-btn
    v-if="isSignedIn && subscribed !== undefined"
    :color="subscribed ? 'secondary' : ''"
  >
    {{ subscribed ? 'Subscribed' : 'Unsubscribed' }}
  </v-btn>
</template>