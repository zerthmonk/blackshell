<template>
  <div class="layout" :class="rootAlign">
    <slot name="header"></slot>
    <slot name="main"></slot>
    <slot name="footer"></slot>
  </div>
  <slot name="background"></slot>
</template>

<script setup lang="ts">
import {computed, useSlots} from "vue";

const slots = useSlots();
const rootAlign = computed(() => {
  const direction = slots?.header ? 'start' : 'end';
  return `layout_aligned-${direction}`;
})

</script>

<style scoped lang="scss">
.layout {
  position: relative;
  display: grid;
  grid: 1fr 4fr 1fr / 1fr;
  height: fit-content;
  z-index: 1;
  padding: 1.5rem;
  gap: .5rem;
  box-sizing: border-box;
}

.layout_aligned-end {
  align-content: end;
}

.layout_align-start {
  align-content: end;
}

@media only screen and (max-width: 768px) {
  .layout {
    padding: 1.25rem .75rem;
  }
}
</style>