<template>
  <span :class="{ 'countdown--blinking': blinking }">
    {{ timer }}
  </span>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed, reactive, watch } from "vue";
import { useCountdown } from "@/composables/useCountdown";
import { getTimestampValues } from "@/util/helpers";

export interface TimerProps {
  seconds: number;
  notifyOn?: number;
}

const emit = defineEmits(["end"]);

const props = defineProps<TimerProps>();
const countdown = reactive(useCountdown(props.seconds));
const timer = computed(() => {
  const now = new Date().getTime();
  return getTimestampValues(now + countdown.count * 1000 - now).join(":");
});
const blinking = computed(() => props?.notifyOn ? countdown.count <= props.notifyOn : false);
watch(
  () => countdown.count === 0,
  () => emit("end")
);
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
