<template>
  <div class="trace">
    <component :is="component" v-for="value in content"
               class="cell"
               :hexValue="value"
               :isHighlighted="true"/>
  </div>
</template>

<script setup lang="ts">
import { defineProps, withDefaults, computed } from "vue";
import TraceCell from "./TraceCell.vue";
import Cell from "./Cell.vue";

interface traceProps {
  content: string[];
  interactive?: boolean;
}

const props = withDefaults(defineProps<traceProps>(), {
  interactive: true,
});

const component = computed(() => props.interactive ? TraceCell : Cell);

</script>

<style scoped lang="scss">
.trace {
  display: flex;
  gap: .5em;
  max-width: inherit;
  max-height: inherit;
}

</style>