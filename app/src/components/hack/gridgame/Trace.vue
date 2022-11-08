<template>
  <div class="root">
    <span>{{props.label}}</span>
    <div class="content">
      <TraceCell v-for="value in content"
        class="cell"
        :hexValue="value"
        :isHighlighted="true"
        />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import TraceCell from "./TraceCell.vue";

interface traceProps {
  label: string;
  content: string[]
}

const props = defineProps<traceProps>();

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