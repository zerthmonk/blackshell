<template>
  <div :class="$style.stdout">
    <span class="timestamp">{{ timestamp }}</span>
    <span class="prompt">{{ prompt }}</span>
    <span :class="{ response: props?.isResponse }">{{ content }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'

interface StdoutProps {
  // userid: string;
  content: string;
  timestamp: number;
  isResponse?: boolean;
}

const props = defineProps<StdoutProps>();
const prompt = computed(() => props?.isResponse ? "<<" : ">>");

</script>
<style module lang="scss">
.stdout {
  display: flex;
  font-size: 1.5rem;
  letter-spacing: 1px;
  gap: .25rem;
  .response {
    color: darken(rgba($color-main, .8), 10%)
  }
}
</style>