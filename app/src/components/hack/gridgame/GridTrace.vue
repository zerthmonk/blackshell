<template>
  <div class="trace">
    <component
      v-for="(value, index) in content"
      :is="component"
      :key="index"
      :hexValue="value"
      :isHighlighted="true"
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps, withDefaults, computed } from "vue";
import TraceCell from "./GridTraceCell.vue";
import Cell from "./GridCell.vue";

export interface TraceProps {
  content: string[];
  interactive?: boolean;
}

const props = withDefaults(defineProps<TraceProps>(), {
  interactive: true,
});

const component = computed(() => (props.interactive ? TraceCell : Cell));
</script>

<style scoped lang="scss">
.trace {
  display: flex;
  gap: 0.5em;
  max-width: inherit;
  max-height: inherit;
}
</style>
