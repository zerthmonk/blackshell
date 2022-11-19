<template>
  <span :class="{ 'countdown--blinking': blinking }">
    {{ timer }}
  </span>
</template>

<script setup lang="ts">
import { defineProps, computed, reactive } from "vue";
import { useCountdown } from "@/composables/useCountdown.ts";
import { getTimestampValues } from "@/util/helpers.ts";

interface timerProps {
  seconds: number;
  notifyOn?: number;
  onEnd?: Function;
}

const props = defineProps<timerProps>();
const countdown = reactive(useCountdown(props.seconds));
const timer = computed(() => {
  const now = new Date().getTime();
  return getTimestampValues(now + countdown.count * 1000 - now).join(":");
});
const blinking = computed(() => countdown.count <= props.notifyOn);
</script>

<style lang="scss">
.countdown--blinking {
  animation: blinking 1s ease-in-out infinite;
}

@keyframes blinking {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
