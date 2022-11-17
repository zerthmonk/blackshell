<template>
  <span class="root">
    {{ countdown.count }}
    {{ timer }}
  </span>
</template>

<script setup lang="ts">
import { defineProps, computed, ref, reactive } from 'vue';
import { useCountdown } from '@/composables/useCountdown.ts';
import { getTimestampValues } from '@/util/helpers.ts';

interface timerProps {
  seconds: number;
  blinkOn?: number;
  onEnd?: () => void;
}

const props = defineProps<timerProps>();
const countdown = reactive(useCountdown(props.seconds));
const timer = computed(() => {
  const now = new Date().getTime();
  return getTimestampValues((now + countdown.count * 1000) - now).join(':');
})
// const blinking = computed(() => countdown.count <= props.blinkOn);
// 
</script>

<style lang="scss">
.root {
  color: red;
}
</style>