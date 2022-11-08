<template>
  <div class="root">
    <span>{{props.label}}</span>
    <div class="content">
      <component :is="component" v-for="value in content"
        class="cell"
        :hexValue="value"
        :isHighlighted="true"
        />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, withDefaults, computed } from "vue";
import Cell from "./Cell.vue";
import TraceCell from "./TraceCell.vue";

interface traceProps {
  label: string;
  content: string[];
  interactive?: boolean;
}

const props = withDefaults(defineProps<traceProps>(), {
  interactive: true,
});

const component = computed(() => props.interactive ? TraceCell : Cell);

</script>

<style scoped lang="scss">
.root {
  display: flex;
  flex-direction: column;
  gap: .75rem;
  
  span {
    font-size: .75rem;
    letter-spacing: 1px;
  }
}
.content {
  display: flex;
  gap: .5rem;

  .cell {
    padding: .5rem;
  }
}
</style>