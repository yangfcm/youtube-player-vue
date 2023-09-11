<script setup lang="ts">
import { ref } from 'vue'
import { useSubscribe } from '@/composables/useSubscribe';
import { useAuth } from '@/composables/useAuth';

const props = defineProps<{
  channelId: string
}>()

const hovered = ref(false)
const { isSignedIn } = useAuth()
const { status, error, subscribed, subscribeChannel, unsubscribeChannel } = useSubscribe(props.channelId)


</script>

<template>
  <v-btn
    v-if="isSignedIn && subscribed !== undefined"
    :color="subscribed ? 'secondary' : ''"
    width="150"
    @mouseenter="() => hovered = true"
    @mouseleave="() => hovered = false"
  >
    {{ subscribed ? 
      (hovered ? 'Unsubscribe' : 'Subscribed') : 
      'Subscribe' }}
  </v-btn>
</template>