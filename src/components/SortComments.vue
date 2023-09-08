<script setup lang="ts">
import { mergeProps } from 'vue'
import type { CommentOrder } from '@/stores/types';

const emit = defineEmits(['onSetOrder'])
const setOrder = (order: CommentOrder) => {
  emit('onSetOrder', order);
}

</script>

<template>
  <v-menu>
     <template v-slot:activator="{ props: menu }">
        <v-tooltip location="top">
          <template v-slot:activator="{ props: tooltip }">
            <v-btn
              variant="text"
              v-bind="mergeProps(menu, tooltip)"
            >             
              <v-icon icon="mdi-sort-variant"></v-icon> Sort by
            </v-btn>
          </template>
          <span>Sort comments</span>
        </v-tooltip>
      </template>
      <v-list>
        <v-list-item @click="() => setOrder('relevance')">Top comments</v-list-item>
        <v-list-item @click="() => setOrder('time')">Newest first</v-list-item>
      </v-list>
  </v-menu>
</template>