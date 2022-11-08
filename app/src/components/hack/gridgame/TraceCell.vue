<template>
  <Cell class="trace-cell"
        :hexValue="props.hexValue"
        @mouseover="() => handleHover(true)"
        @mouseout="() => handleHover(false)"
  />
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { useStore } from '@/stores/gridgame';
import Cell from './Cell.vue';

interface TraceCellProps {
  hexValue: string | number;
}

const props = defineProps<TraceCellProps>();
const store = useStore();

function handleHover(value: boolean) {
  store.setHighlighted(props.hexValue, value);
}

</script>

<style scoped lang="scss">
.trace-cell {
  padding: 1rem;

  &:hover {
    border: 1px solid white;
  }
}

.disabled {
  pointer-events: none;
  filter: brightness(50%);
}
</style>