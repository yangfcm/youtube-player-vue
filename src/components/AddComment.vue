<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
  videoId: string,
}>()

const comment = ref('')

const handleAddComment = () => {
  const commentToAdd = comment.value.trim()
  if(!commentToAdd) return
  console.log(commentToAdd);
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
      ></v-text-field>
      <v-btn
        type="submit"
        color="primary"
        prepend-icon="mdi-send"
      >
        <template v-slot:prepend>
          <v-icon></v-icon>
        </template>
        Submit
      </v-btn>
    </div>
  </v-form>
</template>