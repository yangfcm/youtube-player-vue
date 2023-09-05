<script setup lang="ts">
import type { ResultItemMetaSnippet } from '@/stores/types'

defineProps<{
  item: ResultItemMetaSnippet
}>()
</script>

<template>
  <div>
    {{ item.snippet.title }}
  </div>
</template>