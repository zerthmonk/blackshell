<template>
  <Cell
    class="trace-cell"
    :hexValue="props.hexValue"
    @mouseover="() => handleHover(true)"
    @mouseout="() => handleHover(false)"
  />
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { useStore } from "@/stores/gridgame";
import Cell from "./GridCell.vue";

export interface TraceCellProps {
  hexValue: string;
}

const props = defineProps<TraceCellProps>();
const store = useStore();

function handleHover(value: boolean) {
  store.setHighlighted(props.hexValue, value);
}
</script>

<style scoped lang="scss">
.trace-cell {
  cursor: pointer;
  &:hover {
    border: 1px solid white;
  }
}

.disabled {
  cursor: auto;
  pointer-events: none;
  filter: brightness(50%);
}
</style>
