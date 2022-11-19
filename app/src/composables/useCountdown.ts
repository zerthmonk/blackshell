import { ref, onUnmounted } from "vue";

export const useCountdown = (seconds: number, controls?: boolean) => {
  const count = ref(seconds);
  let _interval: ReturnType<typeof setInterval>;

  function start() {
    _interval = setInterval(() => {
      count.value = count.value - 1;
      if (count.value <= 0) {
        clearInterval(_interval);
      }
    }, 1000);
  }

  function stop() {
    clearInterval(_interval);
  }

  start();
  onUnmounted(() => stop());

  if (controls) {
    return { count, start, stop };
  } else {
    return { count };
  }
};
