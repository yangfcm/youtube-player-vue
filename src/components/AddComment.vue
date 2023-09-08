<script setup lang="ts">
import { ref } from 'vue'
import { usePostComment } from '@/composables/usePostComment'
import { AsyncStatus } from '@/settings/types'

const props = defineProps<{
  videoId: string
}>()

const comment = ref('')
const { postVideoComment, reset, status, error } = usePostComment(props.videoId)

const handleAddComment = () => {
  const commentToAdd = comment.value.trim()
  if (!commentToAdd) return
  postVideoComment(commentToAdd)
}
</script>

<template>
  <v-form @submit.prevent="handleAddComment">
    <div class="d-flex">
      <v-text-field
        color="primary"
        label="Leave your comment"
        variant="underlined"
        density="compact"
        class="flex-grow-1"
        v-model="comment"
        :disabled="status === AsyncStatus.LOADING"
        @update:focused="reset"
        :error-messages="error"
      ></v-text-field>
      <v-btn
        type="submit"
        color="primary"
        prepend-icon="mdi-send"
        :disabled="status === AsyncStatus.LOADING"
      >
        <template v-slot:prepend>
          <v-icon></v-icon>
        </template>
        Submit
      </v-btn>
    </div>
  </v-form>
</template>
