<template>
  <div class="root">
    <Trace
      v-for="(trace, index) in traces"
      :key="index"
      :label="getLabel(index)"
      :content="getHexes(trace)"
      :interactive="hintMode"
    />
  </div>
</template>

<script setup lang="ts">
import type { CellData } from "@/typings/modules/gridgame";

import { storeToRefs } from "pinia";
import { useStore } from "@/stores/gridgame";
import Trace from "./GridTrace.vue";

const store = useStore();
const { traces, hintMode } = storeToRefs(store);

function getLabel(idx: number) {
  return `attack vector ${idx + 1}`;
}

function getHexes(cells: CellData[]) {
  return cells.map((c) => c.hex);
}
</script>

<style scoped lang="scss">
.root {
  display: flex;
  flex-direction: column;
  display: inherit;
  flex-direction: inherit;
  gap: 1em;
  width: 100%;
  max-width: inherit;
  height: 100%;
  max-height: inherit;
}
</style>
